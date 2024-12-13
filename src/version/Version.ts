import type { SdkVersions } from 'react-native-theoplayer';
import manifest from '../manifest.json';

export const sdkVersions = async (): Promise<SdkVersions> => {
  const rnVersionString = manifest.version ?? '';
  return {
    rn: rnVersionString,
  };
};
