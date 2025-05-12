import {defineNuxtModule, addPlugin, createResolver, addImportsDir, installModule} from '@nuxt/kit'
import {useRuntimeConfig} from "nuxt/app"
import {getAtprotoDesktopOwner} from "./runtime/utils/utilAtprotoDesktop";
import {AtpAgent} from "@atproto/api";

const {resolve} = createResolver(import.meta.url)

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
            affix: 'OS'
        },
},
    async setup(options: AtprotoDesktopOptions, _nuxt) {
        await installModule('nuxt-atproto')

        // configure aliases

        _nuxt.options.alias ||= {}

        _nuxt.options.alias['@owdproject/module-atproto'] = resolve(__dirname, '.')

        // set runtime config
        _nuxt.options.runtimeConfig.public.atprotoDesktop = options

        // retrieve owd owner profile from atproto

        _nuxt.options.runtimeConfig.public.atprotoDesktop.owner.profile = await getAtprotoDesktopOwner(
            new AtpAgent({
                service: _nuxt.options.atproto.serviceEndpoint.public,
            }),
            _nuxt.options.runtimeConfig.public.atprotoDesktop.owner.did
        )

        {

            // import data
            addImportsDir(resolve('./runtime/composables'))
            addImportsDir(resolve('./runtime/stores'))
            addPlugin(resolve('./runtime/plugins/pluginAtproto'))

        }
    }
})
