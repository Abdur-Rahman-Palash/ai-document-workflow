import { Router } from "express";
import { config } from "../config";

export const healthRouter = Router();

healthRouter.get("/health", (_, res) => {
  res.json({
    status: "healthy",
    service: "ai-document-workflow-mcp",
    environment: config.nodeEnv,
    version: "0.1.0",
  });
});
