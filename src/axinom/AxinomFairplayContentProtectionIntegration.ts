import type { CertificateRequest, ContentProtectionIntegration, LicenseRequest, MaybeAsync } from 'react-native-theoplayer';
import type { AxinomDrmConfiguration } from './AxinomConfiguration';

export class AxinomFairplayContentProtectionIntegration implements ContentProtectionIntegration {
  static readonly DEFAULT_CERTIFICATE_URL = 'insert default certificate url here';
  static readonly DEFAULT_LICENSE_URL = 'insert default license url here';

  private readonly contentProtectionConfiguration: AxinomDrmConfiguration;
  private contentId: string | undefined = undefined;

  constructor(configuration: AxinomDrmConfiguration) {
    this.contentProtectionConfiguration = configuration;
  }

  onCertificateRequest(request: CertificateRequest): MaybeAsync<Partial<CertificateRequest> | BufferSource> {
    const token: string = this.contentProtectionConfiguration.integrationParameters?.token ?? '';
    request.url = this.contentProtectionConfiguration.fairplay?.certificateURL ?? AxinomFairplayContentProtectionIntegration.DEFAULT_CERTIFICATE_URL;
    request.headers = {
      ...request.headers,
      'X-AxDRM-Message': token,
    };
    return request;
  }

  onLicenseRequest(request: LicenseRequest): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    const token: string = this.contentProtectionConfiguration.integrationParameters?.token ?? '';
    request.url =
      this.contentProtectionConfiguration.fairplay?.licenseAcquisitionURL ?? AxinomFairplayContentProtectionIntegration.DEFAULT_LICENSE_URL;
    request.headers = {
      ...request.headers,
      'X-AxDRM-Message': token,
    };
    return request;
  }

  extractFairplayContentId(skdUrl: string): string {
    // drop the 'skd://' part
    this.contentId = skdUrl.substring(6, skdUrl.length);
    return this.contentId;
  }
}
