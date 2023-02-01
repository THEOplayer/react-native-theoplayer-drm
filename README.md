# react-native-theoplayer-drm

DRM connectors for [react-native-theoplayer](https://github.com/THEOplayer/react-native-theoplayer).

## Installation

```sh
npm install react-native-theoplayer-drm
```

## Usage

```typescript
import { AnvatoDrmFairplayContentProtectionIntegrationFactory } from 'react-native-theoplayer-drm';

ContentProtectionRegistry.registerContentProtectionIntegration(
  'anvato',
  'fairplay',
  new AnvatoDrmFairplayContentProtectionIntegrationFactory()
);
```
