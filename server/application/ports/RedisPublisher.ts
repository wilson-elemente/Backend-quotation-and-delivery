export interface RedisPublisher {
  /**
   * Publish a message to a Redis channel.
   * @param channel 
   * @param message
   * @returns 
   */
  publish(channel: string, message: string): Promise<number>;
}