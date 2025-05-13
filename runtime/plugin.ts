import {useAtprotoAccountStore} from "./stores/storeAtprotoAccount";
import {useRuntimeConfig,defineNuxtPlugin} from "nuxt/app"

export default defineNuxtPlugin({
    name: 'owd-plugin-atproto',
    parallel: true,
    async setup(nuxtApp) {
        const runtimeConfig = useRuntimeConfig()
        const atprotoAccountStore = useAtprotoAccountStore()
        // handle oauth callback + session restore

        nuxtApp.hook('app:mounted', async () => {
            const atproto = useAtproto()

            if (atproto.agent.account) {
                atprotoAccountStore.setAccountState('fetching', true)

                await atproto.agent.public
                    .getProfile({
                        actor: atproto.agent.account.assertDid
                    })
                    .then((profile) => {
                        atprotoAccountStore.setAccount(profile.data)
                    })
            }
        })
    }
})
