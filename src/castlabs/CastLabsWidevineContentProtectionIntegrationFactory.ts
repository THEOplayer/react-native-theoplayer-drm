import type { ContentProtectionIntegration, ContentProtectionIntegrationFactory } from 'react-native-theoplayer';
import type { CastLabsDrmConfiguration } from './CastLabsDrmConfiguration';
import { CastLabsWidevineContentProtectionIntegration } from './CastLabsWidevineContentProtectionIntegration';

export class CastLabsWidevineContentProtectionIntegrationFactory implements ContentProtectionIntegrationFactory {
  build(configuration: CastLabsDrmConfiguration): ContentProtectionIntegration {
    return new CastLabsWidevineContentProtectionIntegration(configuration);
  }
}
