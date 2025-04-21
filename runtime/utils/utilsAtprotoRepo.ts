export async function getATProtoRecord(agent: any, repo: string, collection: string, key: string) {
    const response = await agent
        .com.atproto.repo.getRecord({
            repo,
            collection: collection,
            rkey: key,
        })

    return response
}

export async function putATProtoRecord(agent: any, repo: string, collection: string, key: string, value: any) {
    const response = await agent
        .com.atproto.repo.putRecord({
            repo,
            collection,
            rkey: key,
            record: value,
        })

    return response
}

export async function deleteATProtoRecord(agent: any, repo: string, collection: string, key: string) {
    const response = await agent
        .com.atproto.repo.deleteRecord({
            repo,
            collection,
            rkey: key,
        })

    return response
}