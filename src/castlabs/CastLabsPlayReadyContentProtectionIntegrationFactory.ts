import type { ContentProtectionIntegration, ContentProtectionIntegrationFactory } from 'react-native-theoplayer';
import type { CastLabsDrmConfiguration } from './CastLabsDrmConfiguration';
import { CastLabsPlayReadyContentProtectionIntegration } from './CastLabsPlayReadyContentProtectionIntegration';

export class CastLabsPlayReadyContentProtectionIntegrationFactory implements ContentProtectionIntegrationFactory {
  build(configuration: CastLabsDrmConfiguration): ContentProtectionIntegration {
    return new CastLabsPlayReadyContentProtectionIntegration(configuration);
  }
}
