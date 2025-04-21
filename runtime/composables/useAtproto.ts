import {useNuxtApp} from "nuxt/app"

export const useAtproto = () => {
    const { $atprotoConfig }: any = useNuxtApp()

    const loginUrl = computed(() => {
        return `${$atprotoConfig.client_uri}/auth?client_id=${$atprotoConfig.client_id}&redirect_uri=${$atprotoConfig.redirect_uris[0]}&scope=${$atprotoConfig.scope}&response_type=code`
    })

    const login = () => {
        window.location.href = loginUrl.value
    }

    return {
        loginUrl,
        login
    }
}