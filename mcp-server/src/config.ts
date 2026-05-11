import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const config = {
  port: Number(process.env.PORT ?? 8080),
  nodeEnv: process.env.NODE_ENV ?? "development",
  apiKey: process.env.API_KEY ?? "change-me",
  documentEngineUrl: process.env.DOCUMENT_ENGINE_URL ?? "http://localhost:8000",
  aiProcessorUrl: process.env.AI_PROCESSOR_URL ?? "http://localhost:8000",
  databaseUrl:
    process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/docworkflow",
  redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
};
