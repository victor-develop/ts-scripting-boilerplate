import { Queue } from 'bullmq';
import { Worker } from 'bullmq'



export async function main(args: any) {
  const logger = args.logger.child({log_name: 'hello.bull-mq'})

  const paintCar = (color: string) => {
      logger.info({color, painted: true})
  }

  logger.info('bull-mq');

  const connection =  {
    host: "redis",
    port: 6379
  }

  const queue = new Queue('Paint', { connection});
  queue.add('cars', { color: 'blue' });
  const worker = new Worker('Paint', async job => {
    if (job.name === 'cars') {
      await paintCar(job.data.color);
    }
  }, {connection});
  return {worker, queue}
}
