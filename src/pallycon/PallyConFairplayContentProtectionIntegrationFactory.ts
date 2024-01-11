import type { ContentProtectionIntegration, ContentProtectionIntegrationFactory } from 'react-native-theoplayer';
import type { PallyConDrmConfiguration } from './PallyConConfiguration';
import { PallyConFairplayContentProtectionIntegration } from './PallyConFairplayContentProtectionIntegration';

export class PallyConFairplayContentProtectionIntegrationFactory implements ContentProtectionIntegrationFactory {
  build(configuration: PallyConDrmConfiguration): ContentProtectionIntegration {
    return new PallyConFairplayContentProtectionIntegration(configuration);
  }
}
