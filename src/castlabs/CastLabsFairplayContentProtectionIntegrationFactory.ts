import type { ContentProtectionIntegration, ContentProtectionIntegrationFactory } from 'react-native-theoplayer';
import type { CastLabsDrmConfiguration } from './CastLabsDrmConfiguration';
import { CastLabsFairplayContentProtectionIntegration } from './CastLabsFairplayContentProtectionIntegration';

export class CastLabsFairplayContentProtectionIntegrationFactory implements ContentProtectionIntegrationFactory {
  build(configuration: CastLabsDrmConfiguration): ContentProtectionIntegration {
    return new CastLabsFairplayContentProtectionIntegration(configuration);
  }
}
