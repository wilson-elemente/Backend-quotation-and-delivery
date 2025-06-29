import { createClient, RedisClientType } from 'redis';
import { RedisPublisher } from '../../application/ports/RedisPublisher';
import { injectable } from 'tsyringe';

@injectable()
export class RedisPublisherImpl implements RedisPublisher {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    });
    this.client.connect().catch(err => {
      console.error('Redis connection error:', err);
    });
  }

  async publish(channel: string, message: string): Promise<number> {
    return this.client.publish(channel, message);
  }
}