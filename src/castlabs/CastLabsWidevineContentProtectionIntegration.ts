import type { ContentProtectionIntegration, LicenseRequest, LicenseResponse, MaybeAsync } from 'react-native-theoplayer';
import type { CastLabsDrmConfiguration } from './CastLabsDrmConfiguration';
import { fromObjectToBase64String, fromUint8ArrayToString, fromBase64StringToUint8Array } from 'react-native-theoplayer';

export class CastLabsWidevineContentProtectionIntegration implements ContentProtectionIntegration {
  static readonly DEFAULT_LICENSE_URL = 'https://lic.drmtoday.com/license-proxy-widevine/cenc/';

  private readonly contentProtectionConfiguration: CastLabsDrmConfiguration;
  private customData: string;

  constructor(configuration: CastLabsDrmConfiguration) {
    this.contentProtectionConfiguration = configuration;
    const customDataObject = {
      userId: this.contentProtectionConfiguration.integrationParameters.userId,
      sessionId: this.contentProtectionConfiguration.integrationParameters.sessionId,
      merchant: this.contentProtectionConfiguration.integrationParameters.merchant,
    };
    this.customData = fromObjectToBase64String(customDataObject);
  }

  onLicenseRequest(request: LicenseRequest): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    request.url = (
      this.contentProtectionConfiguration.widevine?.licenseAcquisitionURL ?? CastLabsWidevineContentProtectionIntegration.DEFAULT_LICENSE_URL
    ).replace('?specConform=true', '');
    request.headers = {
      ...request.headers,
      'x-dt-custom-data': this.customData!,
      'x-dt-auth-token': this.contentProtectionConfiguration.integrationParameters.token ?? '',
    };

    return request;
  }

  onLicenseResponse?(response: LicenseResponse): MaybeAsync<BufferSource> {
    const responseAsText = fromUint8ArrayToString(response.body);
    const responseObject = JSON.parse(responseAsText);

    return fromBase64StringToUint8Array(responseObject.license);
  }
}
