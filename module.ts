import {
  addPlugin,
  addImportsDir,
  createResolver,
  installModule,
} from '@nuxt/kit'
import { defineDesktopModule } from '@owdproject/core/kit/authoring'
import { getAtprotoDesktopOwner } from './runtime/utils/utilAtprotoDesktop'
import { AtpAgent } from '@atproto/api'

const { resolve } = createResolver(import.meta.url)

export default defineDesktopModule({
  meta: {
    name: 'desktop-module-atproto',
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

    // configure transpile
    _nuxt.options.build.transpile.push('@atproto/api')

    // retrieve the desktop owner profile via ATProto public API
    options.owner.profile = await getAtprotoDesktopOwner(
      new AtpAgent({
        service: _nuxt.options.runtimeConfig.public.atproto?.serviceEndpoint?.public
          ?? 'https://public.api.bsky.app',
      }),
      options.owner.did,
    )

    // import stores and composables
    addImportsDir(resolve('./runtime/composables'))
    addImportsDir(resolve('./runtime/stores'))

    addPlugin({
      src: resolve('./runtime/plugin'),
      mode: 'client',
    })
  },
})
