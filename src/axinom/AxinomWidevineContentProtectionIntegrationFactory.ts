import type { ContentProtectionIntegration, ContentProtectionIntegrationFactory } from 'react-native-theoplayer';
import type { AxinomDrmConfiguration } from './AxinomConfiguration';
import { AxinomWidevineContentProtectionIntegration } from './AxinomWidevineContentProtectionIntegration';

export class AxinomWidevineContentProtectionIntegrationFactory implements ContentProtectionIntegrationFactory {
  build(configuration: AxinomDrmConfiguration): ContentProtectionIntegration {
    return new AxinomWidevineContentProtectionIntegration(configuration);
  }
}
