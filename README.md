<p align="center">
  <img width="160" height="160" src="https://avatars.githubusercontent.com/u/201536780?s=160&v=4" />
</p>
<h1 align="center">ATProto Module</h1>
<h3 align="center">
  AT Protocol Module for Open Web Desktop.
</h3>

## Overview

This module for Open Web Desktop enables AT Protocol integration.

Refer to the [nuxt-atproto](https://www.npmjs.com/package/nuxt-atproto))) documentation for more details and options.

## Features
- Provides ATProto agent and OAuth client integration
- Generates `client-metadata.json` on the fly in `/public`
- Fetches the Open Web Desktop client account host
- Handles the AT Protocol OAuth client login

## Installation

```bash
owd install-module @owdproject/module-atproto
```

## Configuration

You could set this configuration in `/desktop/owd.config.ts`:

```json
atproto: {
  serviceEndpoint: {
    private: 'https://bsky.social',
    public: 'https://public.api.bsky.app'
  },
  oauth: {
    clientMetadata: {
      // url of your remote client_metadata.json, leave the field empty
      // to let `nuxt-atproto` generate a local /public/client_metadata.json
      remote: '',
      // configuration for the local client_metadata.json
      local: {
        client_id: 'https://nuxt-atproto.pages.dev/client-metadata.json',
        client_name: 'nuxt-atproto',
        client_uri: 'https://nuxt-atproto.pages.dev',
        logo_uri: 'https://nuxt-atproto.pages.dev/logo.png',
        tos_uri: 'https://nuxt-atproto.pages.dev',
        policy_uri: 'https://nuxt-atproto.pages.dev',
        redirect_uris: ['https://nuxt-atproto.pages.dev'],
        scope: "atproto transition:generic",
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
        token_endpoint_auth_method: 'none',
        application_type: 'web',
        dpop_bound_access_tokens: true
      }
    },
    signInOptions: {
      state: '',
      prompt: 'login',
      scope: 'atproto',
      ui_locales: 'en',
    },
  },
  debug: true,
},
atprotoDesktop: {
  owner: {
    did: 'did:plc:iaf5ejdchj6nydfxmcrq5rm6',
  },
  name: {
    title: 'atproto',
    affix: 'OS'
  },
}
```

## Requirements

- [@owdproject/module-atproto](https://github.com/atproto-os/module-atproto)

## License

This module is released under the [MIT License](LICENSE).

