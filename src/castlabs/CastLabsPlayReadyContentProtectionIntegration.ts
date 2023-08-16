import type { ContentProtectionIntegration, LicenseRequest, MaybeAsync } from 'react-native-theoplayer';
import type { CastLabsDrmConfiguration } from './CastLabsDrmConfiguration';
import { fromObjectToBase64String } from 'react-native-theoplayer';

export class CastLabsPlayReadyContentProtectionIntegration implements ContentProtectionIntegration {
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
    request.headers = {
      ...request.headers,
      'x-dt-custom-data': this.customData!,
      'x-dt-auth-token': this.contentProtectionConfiguration.integrationParameters.token ?? '',
    };
    return request;
  }
}
