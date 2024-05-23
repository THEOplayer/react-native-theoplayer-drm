import { KeyOSDrmConfiguration } from './KeyOSDrmConfiguration';

export function isKeyOSDrmDRMConfiguration(configuration: KeyOSDrmConfiguration): boolean {
  return configuration.integration === 'keyos_buydrm';
}
