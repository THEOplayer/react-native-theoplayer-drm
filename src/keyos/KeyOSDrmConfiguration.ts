import { DRMConfiguration } from 'react-native-theoplayer';

/**
 * The identifier of the KeyOS BuyDRM integration.
 */
export type KeyOSIntegrationId = 'keyos_buydrm';

/**
 * Describes the configuration of the KeyOS BuyDRM DRM integration.
 */
export interface KeyOSDrmConfiguration extends DRMConfiguration {
  /**
   * The identifier of the DRM integration.
   */
  integration: KeyOSIntegrationId;

  /**
   * An object of key/value pairs which can be used to pass in specific parameters related to a source into a
   * ContentProtectionIntegration.
   */
  integrationParameters?: {
    /**
     * The KeyOS BuyDRM Authorization Token.
     *
     * <br/> - Token that will be added to the headers of the license request.
     */
    'x-keyos-authorization': string;
  };
}
