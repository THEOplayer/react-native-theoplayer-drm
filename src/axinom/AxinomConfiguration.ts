import type { DRMConfiguration } from 'react-native-theoplayer';
import type { AxinomIntegrationParameters } from './AxinomIntegrationParameters';

/**
 * The identifier of the Axinom integration.
 */
export type AxinomIntegrationID = 'axinomDRM';

/**
 * Describes the configuration of the Axinom DRM integration.
 *
 * ```
 * const drmConfiguration = {
 *      integration : 'axinomDRM',
 *      fairplay: {
 *          certificateURL: 'yourAxinomCertificateUrl',
 *          licenseAcquisitionURL: 'yourAxinomLicenseAcquisitionURL'
 *      },
 *      integrationParameters: {
 *        token: 'yourAxinomToken'
 *      }
 *
 * }
 * ```
 */
export interface AxinomDrmConfiguration extends DRMConfiguration {
  /**
   * The identifier of the DRM integration.
   */
  integration: AxinomIntegrationID;

  /**
   * The expected integration parameters.
   */
  integrationParameters: AxinomIntegrationParameters;
}
