import { Router } from "express";
import { z } from "zod";
import { toolRegistry } from "../tools/toolRegistry";
import { logger } from "../logger";

const mcpRequestSchema = z.object({
  jsonrpc: z.string().optional(),
  id: z.union([z.string(), z.number()]).optional(),
  method: z.string(),
  params: z.object({
    name: z.string(),
    arguments: z.record(z.any()).optional(),
  }),
});

export const mcpRouter = Router();

mcpRouter.get("/mcp", (req, res) => {
  const tools = Object.keys(toolRegistry).map(name => ({
    name,
    description: `Tool: ${name}`,
    inputSchema: {
      type: "object",
      properties: {
        arguments: {
          type: "object",
          description: "Tool arguments"
        }
      }
    }
  }));

  res.json({
    tools,
    serverInfo: {
      name: "AI Document Workflow MCP Server",
      version: "0.1.0"
    }
  });
});

mcpRouter.post("/mcp", async (req, res) => {
  const parseResult = mcpRequestSchema.safeParse(req.body);
  if (!parseResult.success) {
    logger.warn("Invalid MCP request", { error: parseResult.error.format() });
    return res.status(400).json({ error: "Invalid MCP request payload" });
  }

  const { id, method, params } = parseResult.data;
  if (method !== "tools/call") {
    return res.status(400).json({
      error: "Unsupported method",
      supportedMethods: ["tools/call"],
    });
  }

  const tool = toolRegistry[params.name];
  if (!tool) {
    return res.status(404).json({ error: `Tool not found: ${params.name}` });
  }

  try {
    const result = await tool(params.arguments ?? {});
    return res.json({ jsonrpc: "2.0", id, result });
  } catch (error) {
    logger.error("Tool execution failed", { tool: params.name, error });
    return res.status(500).json({
      jsonrpc: "2.0",
      id,
      error: { code: -32000, message: "Tool execution failed", data: String(error) },
    });
  }
});
