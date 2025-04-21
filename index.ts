import {defineNuxtModule, addPlugin, createResolver, addImportsDir} from '@nuxt/kit'
import {writeFileSync, mkdirSync} from 'fs'
import {getAtprotoDesktopOwner} from "./runtime/utils/utilsAtprotoDesktop";
import {AtpAgent} from "@atproto/api";

const {resolve} = createResolver(import.meta.url)

export default defineNuxtModule({
    meta: {
        name: 'owd-module-atproto',
        configKey: 'atproto',
    },
    defaults: {
        owd: {
            owner: {
                did: '',
            },
            desktop: {
                name: 'atproto',
                os: 'OS',
            }
        },
        service: {
            resolver: 'https://bsky.social',
            public: 'https://public.api.bsky.app'
        },
        oauth: {
            clientMetadata: {
                client_id: '',
                client_name: '',
                client_uri: '',
                logo_uri: '',
                tos_uri: '',
                policy_uri: '',
                redirect_uris: [],
                scope: 'atproto',
                grant_types: [],
                response_types: [],
                token_endpoint_auth_method: 'none',
                application_type: 'web',
                dpop_bound_access_tokens: true
            }
        }
    },
    async setup(options: AtprotoOptions, nuxt) {
        const publicDir = resolve(nuxt.options.rootDir, 'public');

        // configure aliases

        nuxt.options.alias ||= {}
        nuxt.options.alias['@atproto/api'] = require.resolve('@atproto/api')
        nuxt.options.alias['@atproto/oauth-client-browser'] = require.resolve('@atproto/oauth-client-browser')

        nuxt.options.alias['@owdproject/module-atproto'] = resolve(__dirname, '.')

        // set runtime config
        nuxt.options.appConfig.atproto = options

        // retrieve owd owner profile from atproto

        options.owd.owner.profile = await getAtprotoDesktopOwner(
            new AtpAgent({
                service: options.service.public,
            }),
            options.owd.owner.did
        )

        {

            // generate /public/client-metadata.json

            try {
                mkdirSync(publicDir, {recursive: true});
            } catch (error: any) {
                console.error('OWD failed creating /public/client-metadata.json', error);
                return
            }

            writeFileSync(
                publicDir + '/client-metadata.json',
                JSON.stringify(options.oauth.clientMetadata, null, 2)
            );

        }

        {

            // import data
            addImportsDir(resolve('./runtime/composables'))
            addImportsDir(resolve('./runtime/stores'))
            addPlugin(resolve('./runtime/plugins/plugin-atproto'))

        }
    }
})
