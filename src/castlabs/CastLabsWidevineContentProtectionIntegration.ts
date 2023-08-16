import type { ContentProtectionIntegration, LicenseRequest, MaybeAsync } from 'react-native-theoplayer';
import type { CastLabsDrmConfiguration } from './CastLabsDrmConfiguration';
import { fromObjectToBase64String } from 'react-native-theoplayer';

export class CastLabsWidevineContentProtectionIntegration implements ContentProtectionIntegration {
  static readonly DEFAULT_LICENSE_URL = 'https://lic.drmtoday.com/license-proxy-widevine/cenc/';

  private readonly contentProtectionConfiguration: CastLabsDrmConfiguration;
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

  onLicenseRequest(request: LicenseRequest): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    // DRMToday has the option to return licences as binary data by using ?specConform=true, however we expect JSON so remove url params from licenseUrl
    let licenseUrl = new URL(this.contentProtectionConfiguration.widevine?.licenseAcquisitionURL ?? CastLabsWidevineContentProtectionIntegration.DEFAULT_LICENSE_URL);
    request.url = licenseUrl.protocol + "//" + licenseUrl.host + licenseUrl.pathname;

    request.headers = {
      ...request.headers,
      'x-dt-custom-data': this.customData!,
      'x-dt-auth-token': this.contentProtectionConfiguration.integrationParameters.token ?? '',
    };
    return request;
  }
}
