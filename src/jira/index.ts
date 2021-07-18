export type axiosOptions = any
export type axiosClient = any

export const basicAuth = (username: string, password: string) => (client: axiosClient) => (options: axiosOptions) => {
    return client({
        auth: {
            username,
            password
        },
        ...options
    })
}

