export function routeAtprotoOS(path?: string) {
  return 'https://github.com/atproto-os' + path
}

export function routeBluesky(path?: string) {
  return 'https://bsky.app' + path
}

export function routeBlueskyProfile(handle: string) {
  return routeBluesky(`/profile/${handle}`)
}
