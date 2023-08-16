import type { CertificateRequest, ContentProtectionIntegration, LicenseRequest, LicenseResponse, MaybeAsync } from 'react-native-theoplayer';
import type { CastLabsDrmConfiguration } from './CastLabsDrmConfiguration';
import { fromObjectToBase64String, fromUint8ArrayToBase64String, fromStringToUint8Array, fromUint8ArrayToString, fromBase64StringToUint8Array } from 'react-native-theoplayer';

export class CastLabsFairplayContentProtectionIntegration implements ContentProtectionIntegration {
  static readonly DEFAULT_CERTIFICATE_URL = 'insert default certificate url here';
  static readonly DEFAULT_LICENSE_URL = 'insert default license url here';

  private readonly contentProtectionConfiguration: CastLabsDrmConfiguration;
  private contentId: string | undefined = undefined;
  private customData: string;

  constructor(configuration: CastLabsDrmConfiguration) {
    this.contentProtectionConfiguration = configuration;
    const customDataObject = {
      userId: this.contentProtectionConfiguration.integrationParameters.userId,
      sessionId: this.contentProtectionConfiguration.integrationParameters.sessionId,
      merchant: this.contentProtectionConfiguration.integrationParameters.merchant
    };
    this.customData = fromObjectToBase64String(customDataObject);
  }

  onCertificateRequest(request: CertificateRequest): MaybeAsync<Partial<CertificateRequest> | BufferSource> {
    request.url = this.contentProtectionConfiguration.fairplay?.certificateURL ?? CastLabsFairplayContentProtectionIntegration.DEFAULT_CERTIFICATE_URL;
    request.headers = {
      ...request.headers,
    };
    return request;
  }

  onLicenseRequest(request: LicenseRequest): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    request.url =
      this.contentProtectionConfiguration.fairplay?.licenseAcquisitionURL ?? CastLabsFairplayContentProtectionIntegration.DEFAULT_LICENSE_URL;
    request.headers = {
      ...request.headers,
      'x-dt-custom-data': this.customData!,
      'x-dt-auth-token': this.contentProtectionConfiguration.integrationParameters.token ?? '',
      'content-type': 'application/x-www-form-urlencoded',
    };
    const body = `spc=${encodeURIComponent(fromUint8ArrayToBase64String(request.body!))}&${encodeURIComponent(this.contentId!)}`;
    request.body = fromStringToUint8Array(body);

    return request;
  }

  onLicenseResponse?(response: LicenseResponse): MaybeAsync<BufferSource> {
    let license = fromUint8ArrayToString(response.body);
    if ('<ckc>' === license.substr(0, 5) && '</ckc>' === license.substr(-6)) {
      license = license.slice(5, -6);
    }
    console.log(license);
    return fromBase64StringToUint8Array(license);
  }

  extractFairplayContentId(skdUrl: string): string {
    this.contentId = skdUrl
    return this.contentId;
  }
}
