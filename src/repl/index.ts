import * as bunyan from 'bunyan'
import * as faker from 'faker'
import * as highland from 'highland'
import { JSONString } from '../json/types';
import { transformStdOut } from './transformStdOut';

const script_run_slug = faker.lorem.slug() + '_' + (new Date()).toISOString();
const log_dir = './_log';

import * as fs from 'fs'
import { serveStatic } from './webOutputStream';
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

    /**
     * Do whatever experiments
     */
    logger.info('feels good')
    logger.info('experiments 567')
    
    serveStatic(logger.child({mod: 'serveStatic'}))

    logger.info('script run: finished!')

    process.on('exit', (code) => {
        logger.info(`process exist with ${code}`)
    })
}

main()
