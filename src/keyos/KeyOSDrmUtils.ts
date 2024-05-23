import { KeyOSDrmConfiguration } from './KeyOSDrmConfiguration';

export function isKeyOSDrmDRMConfiguration(configuration: KeyOSDrmConfiguration): boolean {
  return configuration.integrationParameters === undefined || configuration.integrationParameters['x-keyos-authorization'] !== undefined;
}
