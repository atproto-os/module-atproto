import {BrowserOAuthClient, OAuthSession} from '@atproto/oauth-client-browser'
import {Agent, AtpAgent} from "@atproto/api";
import {useAtprotoAccountStore} from "../stores/storeAtprotoAccount";
import {useAppConfig, defineNuxtPlugin} from "nuxt/app"

export default defineNuxtPlugin({
    name: 'owd-plugin-atproto',
    parallel: true,
    async setup(nuxtApp) {
        const appConfig = useAppConfig()
        const atprotoAccountStore = useAtprotoAccountStore()

        // define ATProto agents

        const agent: { public: AtpAgent, account: undefined | Agent } = {
            public: new AtpAgent({
                service: appConfig.atproto.service.public,
            }),
            account: undefined // this will be set later
        }

        // define ATProto client

        const client = new BrowserOAuthClient({
            handleResolver: appConfig.atproto.service.resolver,
            // @ts-ignore to do fix Readonly type
            clientMetadata: import.meta.env.MODE === 'development' ? undefined : appConfig.atproto.oauth.clientMetadata
        })

        client.addEventListener(
            'deleted',
            (
                event: CustomEvent<{
                    sub: string
                    cause: unknown
                }>,
            ) => {
                const {sub, cause} = event.detail
                atprotoAccountStore.setAccount(undefined)
            },
        )

        // handle oauth callback + session restore

        await client.init().then(async (result: undefined | { session: OAuthSession; state?: string | null }) => {
            if (result) {
                const {session, state} = result

                if (state != null) {
                    console.log(`${session.sub} was successfully authenticated (state: ${state})`)
                } else {
                    console.log(`${session.sub} was restored (last active session)`)
                }

                // set account agent

                agent.account = new Agent(session)

                // fetch logged user

                atprotoAccountStore.setAccountState('fetching', true)

                await agent.public
                    .getProfile({
                        actor: agent.account.assertDid
                    })
                    .then((profile) => {
                        atprotoAccountStore.setAccount(profile.data)
                    })

                // fetch application states

            }
        })

        return {
            provide: {
                atproto: {
                    client,
                    agent,
                },
            }
        }
    }
})
