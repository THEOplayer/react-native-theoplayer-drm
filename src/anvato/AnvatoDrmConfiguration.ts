import type { DRMConfiguration } from 'react-native-theoplayer';

export type AnvatoIntegrationID = 'anvato';

export interface AnvatoDrmConfiguration extends DRMConfiguration {
  /**
   * The identifier of the DRM integration.
   */
  integration: AnvatoIntegrationID;
}
