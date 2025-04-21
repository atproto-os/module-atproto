import {defineStore} from "pinia"
import {ref, reactive, computed} from "@vue/reactivity"
import {useAppConfig} from "nuxt/app"

export const useAtprotoAccountStore = defineStore('owd/atproto/account', () => {
    const appConfig = useAppConfig()

    const session = ref<any>(undefined)
    const account = ref<any>(undefined)
    const handleResolver = ref<string>(appConfig.atproto.service.resolver)

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

    function setAccount(value: any) {
        account.value = value
        state.fetching = false
    }

    function setAccountState(
        key: 'fetching',
        value: boolean
    ) {
        state[key] = value
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
    }
}, {
    persistedState: {
        persist: true,
        includePaths: ['handleResolver']
    }
})