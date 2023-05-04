# react-native-theoplayer-drm

The `react-native-theoplayer-drm` package provides a set of connectors for [react-native-theoplayer](https://github.com/THEOplayer/react-native-theoplayer),
allowing playback of DRM-protected content.

## Installation

```sh
npm install @theoplayer/react-native-drm
```

## Usage

The connector needs to be registered to the `ContentProtectionRegistry`, providing both
`integrationId` and `keySystemId`:

```typescript
import { ContentProtectionRegistry } from 'react-native-theoplayer';
import { EzdrmFairplayContentProtectionIntegrationFactory } from 'react-native-theoplayer-drm';

ContentProtectionRegistry.registerContentProtectionIntegration(
  'ezdrm',   // integrationId
  'fairplay', // keySystemId
  new EzdrmFairplayContentProtectionIntegrationFactory()
);
```

The combination of both `integrationId` and `keySystemId` points the player towards the connector
for a specific source, in this case the `ezdrm` connector for `fairplay`:

```typescript
const source = {
  "sources": {
    "src": "<source_url>",
    "contentProtection": {
      "integration": "ezdrm",
      "fairplay": {
        "certificate": "<base64encoded_certificate>",
        "licenseAcquisitionURL": "<license_url>"
      },
    }
  }
};
```
