import type { ContentProtectionIntegration, ContentProtectionIntegrationFactory } from 'react-native-theoplayer';
import type { AnvatoDrmConfiguration } from './AnvatoDrmConfiguration';
import { AnvatoDrmWidevineContentProtectionIntegration } from './AnvatoDrmWidevineContentProtectionIntegration';

export class AnvatoDrmWidevineContentProtectionIntegrationFactory implements ContentProtectionIntegrationFactory {
  build(configuration: AnvatoDrmConfiguration): ContentProtectionIntegration {
    return new AnvatoDrmWidevineContentProtectionIntegration(configuration);
  }
}
