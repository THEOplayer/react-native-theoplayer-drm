import type { ContentProtectionIntegration, LicenseRequest, LicenseResponse, MaybeAsync } from 'react-native-theoplayer';
import type { PallyConDrmConfiguration } from './PallyConConfiguration';
import { fromBase64StringToUint8Array, fromStringToUint8Array, fromUint8ArrayToBase64String, fromUint8ArrayToString } from 'react-native-theoplayer';

export class PallyConFairplayContentProtectionIntegration implements ContentProtectionIntegration {
  static readonly DEFAULT_LICENSE_URL = 'https://license-global.pallycon.com/ri/licenseManager.do';

  private readonly contentProtectionConfiguration: PallyConDrmConfiguration;
  private contentId: string | undefined = undefined;

  constructor(configuration: PallyConDrmConfiguration) {
    this.contentProtectionConfiguration = configuration;
  }

  onLicenseRequest(request: LicenseRequest): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    if (!this.contentProtectionConfiguration.fairplay?.licenseAcquisitionURL) {
      throw new Error('The FairPlay PallyCon license url has not been correctly configured.');
    }
    request.url = this.contentProtectionConfiguration.fairplay?.licenseAcquisitionURL;
    request.headers = {
      ...request.headers,
      ...this.contentProtectionConfiguration.fairplay?.headers,
    };
    if (!this.contentId) {
      throw new Error('The FairPlay PallyCon content ID has not been correctly configured.');
    }
    const licenseParameters = `spc=${encodeURIComponent(fromUint8ArrayToBase64String(request.body!))}&assetId=${encodeURIComponent(this.contentId)}`;
    request.body = fromStringToUint8Array(licenseParameters);
    return request;
  }

  onLicenseResponse?(response: LicenseResponse): MaybeAsync<BufferSource> {
    return fromBase64StringToUint8Array(fromUint8ArrayToString(response.body));
  }

  extractFairplayContentId(skdUrl: string): string {
    // drop the 'skd://' part
    this.contentId = skdUrl.substring(6, skdUrl.length);
    return this.contentId;
  }
}
