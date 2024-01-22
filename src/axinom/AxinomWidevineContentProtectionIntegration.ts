import type { ContentProtectionIntegration, LicenseRequest, MaybeAsync } from 'react-native-theoplayer';
import type { AxinomDrmConfiguration } from './AxinomConfiguration';

export class AxinomWidevineContentProtectionIntegration implements ContentProtectionIntegration {
  static readonly DEFAULT_CERTIFICATE_URL = 'insert default certificate url here';
  static readonly DEFAULT_LICENSE_URL = 'insert default license url here';

  private readonly contentProtectionConfiguration: AxinomDrmConfiguration;

  constructor(configuration: AxinomDrmConfiguration) {
    this.contentProtectionConfiguration = configuration;
  }

  onLicenseRequest(request: LicenseRequest): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    const token: string = this.contentProtectionConfiguration.integrationParameters?.token ?? '';
    request.url =
      this.contentProtectionConfiguration.widevine?.licenseAcquisitionURL ?? AxinomWidevineContentProtectionIntegration.DEFAULT_LICENSE_URL;
    request.headers = {
      ...request.headers,
      'X-AxDRM-Message': token,
    };
    return request;
  }
}
