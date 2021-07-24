import * as bunyan from 'bunyan'
import * as faker from 'faker'
import * as fs from 'fs'
import * as highland from 'highland'
import { doPrivateThings } from '../private';
import { transformStdOut } from './transformStdOut';

/**
 * Script level variables
 */
const script_run_slug = faker.lorem.slug() + '_' + (new Date()).toISOString();

(function setupOutputDir(){
    const log_dir = './_log'
    if (!fs.existsSync(log_dir)){
        fs.mkdirSync(log_dir);
    }    
})();

/**
 *  Prepare output streams
 *  fork more streams to do your stuff
 */
const duplex_output_stream = highland()
const pre_std_out_stream = duplex_output_stream.fork()
const file_out_stream = duplex_output_stream.fork()


const script_out_file = fs.createWriteStream(`./_log/${script_run_slug}.log`)
transformStdOut(pre_std_out_stream).pipe(process.stdout)
file_out_stream.pipe(script_out_file)
// @ts-ignore
const logger = bunyan.createLogger({name: script_run_slug, stream: duplex_output_stream})

doPrivateThings(logger.child({private: 'true'}))

logger.info('script run: finished!')
process.on('exit', (code) => {
    logger.info(`process exist with ${code}`)
})
