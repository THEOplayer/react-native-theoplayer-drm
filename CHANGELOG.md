# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.8.1] - 2024-12-13

### Fixed

- Prevent warning on named export for version API

## [1.8.0] - 2024-12-13

### Added

- Add sdkVersions to connector API

## [1.7.1] - 2024-09-11

### Fixed

- Fixed an issue where the npm package would not contain the proper build files.

## [1.7.0] - 2024-09-11

### Added

- Added support for THEOplayer 8.0.

## [1.6.0] - 2024-05-23

### Changed

- Changed the BuyDRM KeyOS connector to work without the `x-keyos-authorization` header.

## [1.5.0] - 2024-04-12

### Added

- Added BuyDRM KeyOS connector for fairplay, widevine and playready.
- Added support for `react-native-theoplayer` v7.0.0.

## [1.4.0] - 2024-01-23

### Added

- Added Axinom connector for fairplay and widevine.

## [1.3.1] - 2024-01-11

### Fixed

- Fixed an issue where the PallyCon connector was not included in the module exports.

## [1.3.0] - 2024-01-11

### Added

- Added CastLabs connector.
- Added PallyCon connector.

### Changed

- Optimized `readStreamAsArrayBuffer` method.

## [1.2.0] - 2023-09-15

### Fixed

- Fixed an issue in the Anvato DRM connector where the license request response body was not correctly processed.

## [1.1.0] - 2023-09-15

### Changed

- Added license request error result for Anvato connector.

## [1.0.0] - 2023-05-04

Initial release
