import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImportsDir,
  installModule,
} from '@nuxt/kit'
import { getAtprotoDesktopOwner } from './runtime/utils/utilAtprotoDesktop'
import { AtpAgent } from '@atproto/api'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule({
  meta: {
    name: 'owd-module-atproto',
    configKey: 'atprotoDesktop',
  },
  defaults: {
    owner: {
      did: 'did:plc:iaf5ejdchj6nydfxmcrq5rm6',
    },
    name: {
      title: 'atproto',
      affix: 'OS',
    },
  },
  async setup(options: AtprotoDesktopOptions, _nuxt) {
    await installModule('nuxt-atproto')

    // configure aliases
    _nuxt.options.build.transpile.push('@atproto/api')

    // retrieve owd owner profile from atproto

    if (!_nuxt.options.atproto) {
      _nuxt.options.atproto = {
        serviceEndpoint: {
          private: 'https://bsky.social',
          public: 'https://public.api.bsky.app'
        },
        oauth: {
          clientMetadata: {
            remote: '',
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
      }
    }

    options.owner.profile = await getAtprotoDesktopOwner(
      new AtpAgent({
        service: _nuxt.options.atproto.serviceEndpoint.public,
      }),
      options.owner.did,
    )

    // set runtime config
    _nuxt.options.runtimeConfig.public.desktop.atprotoDesktop = options

    {
      // import data
      addImportsDir(resolve('./runtime/composables'))
      addImportsDir(resolve('./runtime/stores'))
      addPlugin({
        src: resolve('./runtime/plugin'),
        mode: 'client',
      })
    }
  },
})
