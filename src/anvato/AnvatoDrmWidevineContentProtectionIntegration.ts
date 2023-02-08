import type {
  ContentProtectionIntegration,
  LicenseRequest,
  MaybeAsync,
} from 'react-native-theoplayer';
import {
  fromBase64StringToUint8Array,
  fromObjectToUint8Array,
  fromUint8ArrayToBase64String,
  fromUint8ArrayToObject,
  LicenseResponse,
} from 'react-native-theoplayer';
import type { AnvatoDrmConfiguration } from './AnvatoDrmConfiguration';

export class AnvatoDrmWidevineContentProtectionIntegration implements ContentProtectionIntegration {
  static readonly DEFAULT_CERTIFICATE_URL = 'insert default certificate url here';
  static readonly DEFAULT_LICENSE_URL = 'insert default license url here';

  private readonly contentProtectionConfiguration: AnvatoDrmConfiguration;
  private contentId: string | undefined = undefined;

  constructor(configuration: AnvatoDrmConfiguration) {
    this.contentProtectionConfiguration = configuration;
  }

  onLicenseRequest(request: LicenseRequest): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    request.url =
      this.contentProtectionConfiguration.fairplay?.licenseAcquisitionURL ?? AnvatoDrmWidevineContentProtectionIntegration.DEFAULT_LICENSE_URL;
    request.headers = {
      ...request.headers,
      'content-type': 'application/json',
    };
    const bodyObject = {
      spc: fromUint8ArrayToBase64String(request.body!),
      assetid: this.contentId,
    };
    request.body = fromObjectToUint8Array(bodyObject);
    return request;
  }

  onLicenseResponse?(response: LicenseResponse): MaybeAsync<BufferSource> {
    const responseObject = fromUint8ArrayToObject(response.body);
    return fromBase64StringToUint8Array(responseObject.ckc);
  }
}
