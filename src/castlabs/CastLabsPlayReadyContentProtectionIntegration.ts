import type { ContentProtectionIntegration, LicenseRequest, MaybeAsync } from 'react-native-theoplayer';
import type { CastLabsDrmConfiguration } from './CastLabsDrmConfiguration';
import { fromObjectToBase64String } from 'react-native-theoplayer';

export class CastLabsPlayReadyContentProtectionIntegration implements ContentProtectionIntegration {
  static readonly DEFAULT_LICENSE_URL = 'https://lic.drmtoday.com/license-proxy-headerauth/drmtoday/RightsManager.asmx';

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
    request.url = this.contentProtectionConfiguration.playready?.licenseAcquisitionURL ??
      CastLabsPlayReadyContentProtectionIntegration.DEFAULT_LICENSE_URL;
    request.headers = {
      ...request.headers,
      'x-dt-custom-data': this.customData!,
      'x-dt-auth-token': this.contentProtectionConfiguration.integrationParameters.token ?? '',
    };
    return request;
  }
}
