type ClientOptions = any
type HttpClient = any
export const addHeaders = (header: string) => (value: string) => (client: HttpClient) => (options: ClientOptions) => {
    return client({
        ...options,
        headers: {
            [header]: value,
            ...options.headers
        },
    })
}

