import type { DRMConfiguration } from 'react-native-theoplayer';

/**
 * The identifier of the PallyCon integration.
 */
export type PallyConIntegrationID = 'pallycon';

/**
 * Describes the configuration of the PallyCon DRM integration.
 *
 * ```
 * const drmConfiguration = {
 *      integration : 'pallycon',
 *      fairplay: {
 *          certificateURL: 'yourPallyConCertificateUrl',
 *          licenseAcquisitionURL: 'yourPallyConLicenseAcquisitionURL'
 *      }
 * }
 * ```
 */
export interface PallyConDrmConfiguration extends DRMConfiguration {
  /**
   * The identifier of the DRM integration.
   */
  integration: PallyConIntegrationID;
}
