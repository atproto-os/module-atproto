import type { AppBskyActorDefs } from '@atproto/api'

declare module '@owdproject/core/kit/authoring' {
  interface DesktopConfig {
    atprotoDesktop?: AtprotoDesktopOptions
  }
}

export interface AtprotoDesktopOptions {
  owner: {
    domain?: string
    did: string
    profile?: AppBskyActorDefs.ProfileView
  }
  name: {
    title: string
    affix: string
  }
}
