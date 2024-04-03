import { KeyOSDrmConfiguration } from './KeyOSDrmConfiguration';

export function isKeyOSDrmDRMConfiguration(configuration: KeyOSDrmConfiguration): boolean {
  return configuration.integrationParameters['x-keyos-authorization'] !== undefined;
}

export function extractContentId(skdUrl: string): string {
  if (skdUrl.indexOf('skd') > 0 || skdUrl.indexOf('http') > 0) {
    skdUrl = skdUrl.substring(1);
  }
  const link = document.createElement('a');
  link.href = skdUrl;
  return link.hostname;
}
