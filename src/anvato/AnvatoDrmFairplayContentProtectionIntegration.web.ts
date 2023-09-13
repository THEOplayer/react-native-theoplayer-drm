import type { CertificateRequest, ContentProtectionIntegration, LicenseRequest, MaybeAsync } from 'react-native-theoplayer';
import {
  fromBase64StringToUint8Array,
  fromObjectToUint8Array,
  fromUint8ArrayToBase64String,
  fromUint8ArrayToObject,
  LicenseResponse,
} from 'react-native-theoplayer';
import type { AnvatoDrmConfiguration } from './AnvatoDrmConfiguration';

export class AnvatoDrmFairplayContentProtectionIntegration implements ContentProtectionIntegration {
  static readonly DEFAULT_CERTIFICATE_URL = 'insert default certificate url here';
  static readonly DEFAULT_LICENSE_URL = 'insert default license url here';

  private readonly contentProtectionConfiguration: AnvatoDrmConfiguration;
  private contentId: string | undefined = undefined;

  constructor(configuration: AnvatoDrmConfiguration) {
    this.contentProtectionConfiguration = configuration;
  }

  onCertificateRequest(request: CertificateRequest): MaybeAsync<Partial<CertificateRequest> | BufferSource> {
    request.url =
      this.contentProtectionConfiguration.fairplay?.certificateURL ?? AnvatoDrmFairplayContentProtectionIntegration.DEFAULT_CERTIFICATE_URL;
    request.headers = {
      ...request.headers,
      'content-type': 'application/octet-stream',
    };
    return request;
  }

  async onLicenseRequest(request: LicenseRequest): Promise<BufferSource> {
    const url = (request.url =
      this.contentProtectionConfiguration.fairplay?.licenseAcquisitionURL ?? AnvatoDrmFairplayContentProtectionIntegration.DEFAULT_LICENSE_URL);
    const spcMessage = fromUint8ArrayToBase64String(request.body!);
    const bodyObject = {
      spc: spcMessage,
      assetid: this.contentId,
    };

    // Do license request
    const response = await fetch(url, {
      method: request.method,
      headers: {
        ...request.headers,
        'Content-Type': 'application/octet-stream',
      },
      body: fromObjectToUint8Array(bodyObject),
    });

    // Something went wrong, try to get detailed info by parsing the response body.
    if (response.status >= 400) {
      let result = response;
      try {
        result = await response.json();
      } catch (e) {
        // It's not a JSON
      }
      return Promise.reject({
        message: `Error during license server request`,
        cause: {
          url,
          result,
        },
      });
    }
    return response.arrayBuffer();
  }

  onLicenseResponse?(response: LicenseResponse): MaybeAsync<BufferSource> {
    const responseObject = fromUint8ArrayToObject(response.body);
    return fromBase64StringToUint8Array(responseObject.ckc);
  }

  extractFairplayContentId(skdUrl: string): string {
    // drop the 'skd://' part
    this.contentId = skdUrl.substring(6, skdUrl.length);
    return this.contentId;
  }
}
