import * as bunyan from 'bunyan'
import * as faker from 'faker'
import * as highland from 'highland'
import { JSONString } from '../json/types';
import { transformStdOut } from './transformStdOut';
import { Server as SocketIoServer } from 'socket.io';
import * as  Koa from 'koa';
import * as KoaStatic from 'koa-static';
import * as KoaMount from 'koa-mount';
import * as http from 'http';

const script_run_slug = faker.lorem.slug() + '_' + (new Date()).toISOString();
const log_dir = './_log';

import * as fs from 'fs'
function stream2File(s: Highland.Stream<JSONString>): void {
    (!fs.existsSync(log_dir)) && fs.mkdirSync(log_dir);
    s.pipe(
        fs.createWriteStream(`./_log/${script_run_slug}.log`)
    )
}

function stream2Terminal(s: Highland.Stream<JSONString>): void {
    transformStdOut(s).pipe(process.stdout)
}

async function main() {
    const logger_stream: Highland.Stream<JSONString> = highland();
    /**
     *  Add more stream2Something to this array
     */
    [
        stream2File,
        stream2Terminal
    ].map(stream2 => stream2(logger_stream.fork()))

    /**
     * Start logging to the logger stream.
     */
    const logger = bunyan.createLogger({name: script_run_slug, stream: (logger_stream as unknown as NodeJS.WritableStream)})
    process.on('unhandledRejection', error => {
        logger.error(error)
      });

    process.on('exit', (code) => {
        logger.info(`process exist with ${code}`)
    })

    /**
     * Do whatever experiments
     */
    logger.info('feels good')
    logger.info('experiments 567')
    
    const rootApp = new Koa();

    const staticFileServer = new Koa()
    staticFileServer.use(KoaStatic('src/repl/webOutputStream/staticAssets'));
    rootApp.use(KoaMount('/app', staticFileServer))

    const server = http.createServer(rootApp.callback())
    const port = 3003
    server.on('listening', () => {
        logger.info(`listened on port ${port}`)
    })
    server.listen(port);

    const io = new SocketIoServer(server);
    io.on('connection', (socket) => {
        logger.info(`a user connected: ${socket.id}`);
    });

    logger.info('script run: finished!')

}

main()
