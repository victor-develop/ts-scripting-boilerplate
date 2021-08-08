import { Http, HttpPipeline } from 'farrow-http'

export const serveStatic = (logger): HttpPipeline  => {
    const http = Http()
    const port = 3003
    http.serve('/', 'src/repl/webOutputStream/staticAssets')
    http.listen(port, () => {
        logger.info(`open browser at port 3003!`)
    })
    return http
}

