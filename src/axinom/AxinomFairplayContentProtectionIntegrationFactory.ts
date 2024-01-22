import type { ContentProtectionIntegration, ContentProtectionIntegrationFactory } from 'react-native-theoplayer';
import type { AxinomDrmConfiguration } from './AxinomConfiguration';
import { AxinomFairplayContentProtectionIntegration } from './AxinomFairplayContentProtectionIntegration';

export class AxinomFairplayContentProtectionIntegrationFactory implements ContentProtectionIntegrationFactory {
  build(configuration: AxinomDrmConfiguration): ContentProtectionIntegration {
    return new AxinomFairplayContentProtectionIntegration(configuration);
  }
}
