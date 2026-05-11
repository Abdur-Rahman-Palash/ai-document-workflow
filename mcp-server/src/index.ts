import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config";
import { logger } from "./logger";
import { healthRouter } from "./routes/health";
import { mcpRouter } from "./routes/mcp";
import { authenticateRequest } from "./middleware/auth";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));

// Root endpoint (before auth)
app.get("/", (_req, res) => {
  res.json({
    name: "AI Document Workflow MCP Server",
    version: "0.1.0",
    endpoints: {
      health: "/health",
      mcp: "/mcp"
    },
    environment: config.nodeEnv,
    description: "MCP gateway for AI-powered document workflow automation"
  });
});

app.use(authenticateRequest);
app.use(healthRouter);
app.use(mcpRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  logger.error("Unhandled server error", { error: err });
  res.status(500).json({ error: "Internal server error" });
});

app.listen(config.port, () => {
  logger.info(`MCP server listening on http://0.0.0.0:${config.port}`);
  logger.info(`Document engine: ${config.documentEngineUrl}`);
});
