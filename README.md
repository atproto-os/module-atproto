<p align="center">
  <img width="160" height="160" src="https://avatars.githubusercontent.com/u/201536780?s=160&v=4" />
</p>
<h1 align="center">ATProto Module</h1>
<h3 align="center">
  AT Protocol Module for Open Web Desktop.
</h3>

## Overview

This module for Open Web Desktop enables AT Protocol integration, including OAuth
session management, account state, and desktop owner profile fetching.

It wraps [`nuxt-atproto`](https://nuxt-atproto.pages.dev/) and exposes the
AT Protocol composables throughout the desktop runtime.

## Features

- OAuth session management via `nuxt-atproto`
- Generates `client-metadata.json` in `/public` for OAuth
- Fetches the desktop owner's ATProto profile at build time
- Provides `useAtprotoAccountStore` for reactive account state
- Handles OAuth login / logout from the Account app

## Requirements

- `@owdproject/core` ≥ 3.4.0
- `nuxt-atproto` ≥ 0.1.0 (installed automatically as a dependency)

## Installation

```bash
pnpm desktop add module-atproto
```

## Configuration

### 1. Configure `nuxt-atproto` in `nuxt.config.ts`

The AT Protocol OAuth client is configured via the `atproto` key in your Nuxt
config. This is separate from the desktop config and is required for OAuth to work:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  atproto: {
    serviceEndpoint: {
      private: 'https://bsky.social',
      public: 'https://public.api.bsky.app',
    },
    oauth: {
      // Set `writeClientMetadata: true` to generate /public/client-metadata.json
      writeClientMetadata: true,
      clientMetadata: {
        // Leave `remote` empty to use the generated local client-metadata.json.
        // Set it to a URL if you host the metadata file yourself.
        remote: '',
        local: {
          client_id: 'https://your-desktop.example.com/client-metadata.json',
          client_name: 'My Desktop',
          client_uri: 'https://your-desktop.example.com',
          logo_uri: 'https://your-desktop.example.com/favicon.ico',
          tos_uri: 'https://your-desktop.example.com',
          policy_uri: 'https://your-desktop.example.com',
          redirect_uris: ['https://your-desktop.example.com'],
          scope: 'atproto transition:generic',
          grant_types: ['authorization_code', 'refresh_token'],
          response_types: ['code'],
          token_endpoint_auth_method: 'none',
          application_type: 'web',
          dpop_bound_access_tokens: true,
        },
      },
      signInOptions: {
        state: '',
        prompt: 'login',
        scope: 'atproto',
        ui_locales: 'en',
      },
    },
    debug: false,
  },
})
```

### 2. Configure the desktop owner in `desktop.config.ts`

```ts
// desktop/desktop.config.ts
export default defineDesktopConfig({
  // ...
  atprotoDesktop: {
    owner: {
      did: 'did:plc:your-did-here',
    },
    name: {
      title: 'my',
      affix: 'Desktop',
    },
  },
})
```

The `owner.profile` field is populated automatically at build time by fetching
the profile from the ATProto public API.

## Composables

The following composables are auto-imported from `nuxt-atproto`:

| Composable | Description |
|---|---|
| `useAtprotoSession()` | Reactive OAuth session (`session`, `isLogged`, `status`) |
| `useAtprotoAuth()` | `signIn()`, `signInWithHandle()`, `signOut()`, `restore()` |
| `useAtprotoAgent(scope)` | Cached AT Protocol agent (`'authenticated'`, `'public'`, or a PDS URL) |

> **Legacy API** (`useAtproto()`, `useAgent()`) still works but is deprecated
> in `nuxt-atproto` ≥ 0.1.0. Prefer the composables above.

## Stores

| Store | Pinia id | Description |
|---|---|---|
| `useAtprotoAccountStore` | `desktop/atproto/account` | Account profile, session state, handle resolver |

The store persists `handleResolver` via `module-persistence` (if installed).

## License

This module is released under the [MIT License](LICENSE).
