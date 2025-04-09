import {useAtprotoAccountStore} from "~owd-atproto/stores/storeAtprotoAccount";

export function atprotoSignIn() {
    const {$atproto} = useNuxtApp()
    const atprotoAccountStore = useAtprotoAccountStore()

    $atproto.client.signInRedirect(
        atprotoAccountStore.handleResolver,
        {
            state: '',
            prompt: 'login',
            ui_locales: 'en-EN en en',
            signal: new AbortController().signal,
        }
    )
}

export function atprotoSignOut() {
    const atprotoAccountStore = useAtprotoAccountStore()

    atprotoAccountStore.setAccount(undefined)
}