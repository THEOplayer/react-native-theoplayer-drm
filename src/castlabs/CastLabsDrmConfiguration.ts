import type { DRMConfiguration } from 'react-native-theoplayer';
import type { CastLabsIntegrationParameters } from './CastLabsIntegrationParameters';

/**
 * The identifier of the CastLabs integration.
 */
export type CastLabsDrmIntegrationID = 'castlabs';

/**
 * Describes the configuration of the CastLabs DRM integration.
 *
 * ```
 * const drmConfiguration = {
 *      integration : 'castlabs',
 *      fairplay: {
 *          certificateURL: 'yourCertificateUrl',
 *          licenseAcquisitionURL: 'yourLicenseAcquisitionURL'
 *      }
 * }
 * ```
 */
export interface CastLabsDrmConfiguration extends DRMConfiguration {
  /**
   * The identifier of the DRM integration.
   */
  integration: CastLabsDrmIntegrationID;

  integrationParameters: CastLabsIntegrationParameters;
}

