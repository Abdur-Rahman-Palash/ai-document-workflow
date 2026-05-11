import { Request, Response, NextFunction } from "express";
import { config } from "../config";

export function authenticateRequest(req: Request, res: Response, next: NextFunction) {
  if (req.path === "/health" || req.path === "/") {
    return next();
  }

  // Allow unauthenticated access to MCP endpoint in development
  if (req.path === "/mcp" && config.nodeEnv === "development") {
    return next();
  }

  const authHeader = req.header("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "")?.trim();

  if (!token || token !== config.apiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
}
