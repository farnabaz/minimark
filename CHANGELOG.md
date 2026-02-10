# Changelog

## [1.0.0](https://github.com/farnabaz/minimark/compare/v0.2.0...v1.0.0) (2026-02-10)

### Features

* attribute support, html format, yaml props ([a2d7063](https://github.com/farnabaz/minimark/commit/a2d7063dedd134ddbc0022ef9c6d3e39a55c7c52))
* markdown table generation ([1484201](https://github.com/farnabaz/minimark/commit/1484201bfa681c307972dbb96859cb6c5d4b95d5))
* **pre:** filename, highlight & meta on markdown generation ([d7de9cd](https://github.com/farnabaz/minimark/commit/d7de9cd0fbd9b9ff819da0ef09f1e270840ec3b1))

### Bug Fixes

* **component:** better inline detection ([cf069ef](https://github.com/farnabaz/minimark/commit/cf069ef9a362af51d02f9bb3d3322495787419f0))
* **component:** if component has a text sibling, it is inline ([d8470e6](https://github.com/farnabaz/minimark/commit/d8470e6ed6976746f94147daef44e1b2ed9ba5b0))
* **component:** if there is no text between components they are inline ([24c408f](https://github.com/farnabaz/minimark/commit/24c408f5ce3dc5f48e2d42694c375995c5b7e97f))
* **component:** preserve prefix whitespaces in component content ([139cba4](https://github.com/farnabaz/minimark/commit/139cba4c09caf72d8e50c917f3961c803f96e971))
* do not indent inline components ([b2f64a8](https://github.com/farnabaz/minimark/commit/b2f64a8d4ef3c51d54d7d509f0643064e3aadb14))
* escape HTML entities ([7ace288](https://github.com/farnabaz/minimark/commit/7ace28815100db148f7f1e120beae89a9299f2d2))
* **line-break:** stringify markdown style ([c68ddf8](https://github.com/farnabaz/minimark/commit/c68ddf82be4baf7b611a68b6fb21a2f067ba5495))
* nested component indent ([dabf03c](https://github.com/farnabaz/minimark/commit/dabf03cc45d930acfe8a04955a99961d5a9f025d))
* **pre:** decode html entities in code blocks ([9df41a4](https://github.com/farnabaz/minimark/commit/9df41a4909e6ba95fb2c8a0740cfbceb2cabaa2e))
* task list detection ([76668bf](https://github.com/farnabaz/minimark/commit/76668bfc3485eb3c9d446a6f862c41d3450d9185))
* type import ([46231d4](https://github.com/farnabaz/minimark/commit/46231d40906743e108be3ba15ef7190796b07df9))
* typecheck ([07a01f1](https://github.com/farnabaz/minimark/commit/07a01f1d99764863fcf50fc9a6d19e3d3a8c7889))
* types check ([6f80492](https://github.com/farnabaz/minimark/commit/6f804923d6bab47fe6013d151ae9befdaa42c7c0))

## [0.2.0](https://github.com/farnabaz/minimark/compare/v0.1.1...v0.2.0) (2025-06-02)

### Bug Fixes

* update utils ([b26d8bc](https://github.com/farnabaz/minimark/commit/b26d8bc0f95259c723264078d6e541505d924682))

## [0.1.1](https://github.com/farnabaz/minimark/compare/v0.1.0...v0.1.1) (2025-06-02)

### Bug Fixes

* block elements inside li ([b52567a](https://github.com/farnabaz/minimark/commit/b52567aa6a8113658650cdce3397ec7118c17e6b))

## 0.1.0 (2025-05-28)

### Features

* hast utils & tree visit utility ([2d9222f](https://github.com/farnabaz/minimark/commit/2d9222f12dfe497b57c9a1dd9c519023416e6cee))

### Bug Fixes

* **heading:** support non-text children ([cef6c6d](https://github.com/farnabaz/minimark/commit/cef6c6d9b8bcbf9b5f3371376763255768571d43))
* html allow markdown inside html ([be8c444](https://github.com/farnabaz/minimark/commit/be8c4443e4b043da961821baf820aad5b319dc68))
