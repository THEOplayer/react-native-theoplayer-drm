import type { ContentProtectionIntegration, ContentProtectionIntegrationFactory } from 'react-native-theoplayer';
import type { AnvatoDrmConfiguration } from './AnvatoDrmConfiguration';
import { AnvatoDrmFairplayContentProtectionIntegration } from './AnvatoDrmFairplayContentProtectionIntegration';

export class AnvatoDrmFairplayContentProtectionIntegrationFactory implements ContentProtectionIntegrationFactory {
  build(configuration: AnvatoDrmConfiguration): ContentProtectionIntegration {
    return new AnvatoDrmFairplayContentProtectionIntegration(configuration);
  }
}
