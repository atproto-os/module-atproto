<p align="center">
  <img width="160" height="160" src="https://avatars.githubusercontent.com/u/201536780?s=160&v=4" />
</p>
<h1 align="center">ATProto Module</h1>
<h3 align="center">
  ATProto Module for your Open Web Desktop client.
</h3>

## Overview

This module for Open Web Desktop enables AT Protocol integration.

## Installation

To install the module, run:

```sh
npm install @owdproject/module-atproto
```

## Usage

Then, define it in your desktop configuration:

```ts
// desktop/owd.config.ts
export default defineNuxtConfig({
  modules: ['@owd-client/module-atproto']
});
```

## Features
- Provides ATProto agent and OAuth client integration
- Generates `client-metadata.json` on the fly in `/public`
- Fetches the Open Web Desktop client account host
- Handles the AT Protocol OAuth client login

## License

This module is released under the [MIT License](LICENSE).

