import { useAtprotoAccountStore } from './stores/storeAtprotoAccount'
import { defineNuxtPlugin } from 'nuxt/app'
import { useAtproto, useAgent } from '#imports'

export default defineNuxtPlugin({
  name: 'owd-plugin-atproto',
  parallel: true,
  async setup(nuxtApp) {
    const atprotoAccountStore = useAtprotoAccountStore()
    // handle oauth callback + session restore

    nuxtApp.hook('app:mounted', async () => {
      const {$atproto} = useNuxtApp()
      const atproto = useAtproto()

      if (atproto.isLogged()) {
        const agent = useAgent('public')

        atprotoAccountStore.setAccountState('fetching', true)

        await agent
          .getProfile({
            actor: $atproto.session.value.sub,
          })
          .then((profile) => {
            atprotoAccountStore.setAccount(profile.data)
          })
      }
    })
  },
})
