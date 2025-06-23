import { defineStore } from 'pinia'
import { ref, reactive, computed } from '@vue/reactivity'
import { useRuntimeConfig } from 'nuxt/app'

export const useAtprotoAccountStore = defineStore(
  'owd/atproto/account',
  () => {
    const runtimeConfig = useRuntimeConfig()

    const session = ref<any | undefined>()
    const account = ref<any | undefined>()
    const handleResolver = ref<string>(
      runtimeConfig.public.desktop.atproto.serviceEndpoint.private,
    )

    const state = reactive<{
      fetching: boolean
    }>({
      fetching: false,
    })

    const isAccountLogged = computed(() => {
      return !!account.value
    })

    const handleResolverHostname = computed(() => {
      return new URL(handleResolver.value).hostname
    })

    function setAccount(value: any | undefined) {
      account.value = value
      state.fetching = false
    }

    function setAccountState(key: 'fetching', value: boolean) {
      state[key] = value
    }

    function reset() {
      session.value = undefined
      account.value = undefined
    }

    return {
      session,
      account,
      handleResolver,
      handleResolverHostname,
      state,
      isAccountLogged,
      setAccount,
      setAccountState,
      reset,
    }
  },
  {
    persistedState: {
      persist: true,
      includePaths: ['handleResolver'],
    },
  },
)
