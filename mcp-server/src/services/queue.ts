import Redis from "ioredis";
import { config } from "../config";

const redis = new Redis(config.redisUrl);

export async function enqueueTask(queueName: string, payload: Record<string, unknown>) {
  await redis.lpush(queueName, JSON.stringify(payload));
}

export async function dequeueTask(queueName: string) {
  const item = await redis.rpop(queueName);
  return item ? JSON.parse(item) : null;
}

export async function getQueueLength(queueName: string) {
  return redis.llen(queueName);
}
