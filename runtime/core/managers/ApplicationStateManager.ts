import {getATProtoRecord, putATProtoRecord} from "../../utils/utilsAtprotoRepo";

export class ApplicationATProtoStateManager {
    private agent
    private repo
    private stateTemp = {
        windows: {}
    }

    constructor() {}

    public setup(agent, repo) {
        this.agent = agent
        this.repo = repo
    }

    public setState() {

    }

    public async readRemoteState() {
        const result = await getATProtoRecord(this.agent, this.repo, 'org.owdproject.desktop', 'windows')

        if (result) {
            this.stateTemp.windows = result.list
        }
    }

    public async writeRemoteState(list) {
        return putATProtoRecord(this.agent, this.repo, 'org.owdproject.applications', 'windows', {
            list
        })
    }
}