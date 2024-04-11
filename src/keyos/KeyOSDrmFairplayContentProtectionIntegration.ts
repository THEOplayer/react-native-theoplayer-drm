import {
  ContentProtectionIntegration,
  LicenseRequest,
  MaybeAsync,
  BufferSource,
  CertificateRequest,
  LicenseResponse,
  fromUint8ArrayToString,
  fromUint8ArrayToBase64String,
  fromStringToUint8Array,
  fromBase64StringToUint8Array,
} from 'react-native-theoplayer';
import { KeyOSDrmConfiguration } from './KeyOSDrmConfiguration';
import { isKeyOSDrmDRMConfiguration } from './KeyOSDrmUtils';

export class KeyOSDrmFairplayContentProtectionIntegration implements ContentProtectionIntegration {
  private readonly contentProtectionConfiguration: KeyOSDrmConfiguration;
  private contentId: string | undefined = undefined;

  constructor(configuration: KeyOSDrmConfiguration) {
    if (!isKeyOSDrmDRMConfiguration(configuration)) {
      throw new Error('The KeyOS customdata value has not been correctly configured.');
    }
    this.contentProtectionConfiguration = configuration;
  }

  onCertificateRequest(request: CertificateRequest): MaybeAsync<Partial<CertificateRequest> | BufferSource> {
    if (!this.contentProtectionConfiguration.fairplay?.certificateURL) {
      throw new Error('The KeyOS certificate url has not been correctly configured.');
    }
    request.url = this.contentProtectionConfiguration.fairplay?.certificateURL;
    request.headers = {
      ...request.headers,
      'x-keyos-authorization': this.contentProtectionConfiguration.integrationParameters['x-keyos-authorization'],
    };
    return request;
  }

  onLicenseRequest(request: LicenseRequest): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    if (!this.contentProtectionConfiguration.fairplay?.licenseAcquisitionURL) {
      throw new Error('The KeyOS Fairplay license url has not been correctly configured.');
    }

    request.url = this.contentProtectionConfiguration.fairplay?.licenseAcquisitionURL;
    request.headers = {
      ...request.headers,
      'x-keyos-authorization': this.contentProtectionConfiguration.integrationParameters['x-keyos-authorization'],
    };
    const licenseParameters = `spc=${fromUint8ArrayToBase64String(request.body!)}&assetId=${this.contentId}`;
    request.body = fromStringToUint8Array(licenseParameters);
    return request;
  }

  onLicenseResponse(response: LicenseResponse): MaybeAsync<BufferSource> {
    let license = fromUint8ArrayToString(response.body);
    if ('<ckc>' === license.substr(0, 5) && '</ckc>' === license.substr(-6)) {
      license = license.slice(5, -6);
    }
    return fromBase64StringToUint8Array(license);
  }

  extractFairplayContentId(skdUrl: string): string {
    // drop the 'skd://' part
    this.contentId = skdUrl.substring(6, skdUrl.length);
    return this.contentId;
  }
}
