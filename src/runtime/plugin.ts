import { useAtprotoAccountStore } from './stores/storeAtprotoAccount'
import { defineNuxtPlugin } from 'nuxt/app'
import { useAtprotoSession, useAtprotoAgent } from '#imports'

export default defineNuxtPlugin({
  name: 'desktop-plugin-atproto',
  parallel: true,
  async setup(nuxtApp) {
    const atprotoAccountStore = useAtprotoAccountStore()

    // handle oauth callback + session restore
    nuxtApp.hook('app:mounted', async () => {
      const { isLogged, session } = useAtprotoSession()

      if (isLogged.value && session.value) {
        const agent = useAtprotoAgent('public')

        atprotoAccountStore.setAccountState('fetching', true)

        await agent
          .getProfile({
            actor: session.value.sub,
          })
          .then((profile) => {
            atprotoAccountStore.setAccount(profile.data)
          })
      }
    })
  },
})
