import {AppBskyActorDefs} from "@atproto/api";

export async function getAtprotoDesktopOwner(agent: any, did: string) {
    return agent
        .getProfile({ actor: did })
        .then((result: {data:AppBskyActorDefs.ProfileView}) => result.data)
}