interface AtprotoOptions {
    owd: {
        owner:{
            domain?: string
            did: string
            profile?: any
        },
        desktop: {
            name: string
            os: string
        }
    }
    service: {
        resolver: string
        public: string
    }
    oauth: {
        clientMetadata: any
    }
}