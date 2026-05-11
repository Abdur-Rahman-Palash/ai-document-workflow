import axios from "axios";
import { config } from "../config";

const client = axios.create({
  baseURL: config.aiProcessorUrl,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

export class AIProcessorClient {
  async buildRecreationPlan(input: {
    template: Record<string, unknown>;
    data: Record<string, unknown>;
  }) {
    const response = await client.post("/ai/recreate-plan", input).catch(() => ({ data: input }));
    return response.data;
  }

  async reviewDocumentUpdate(input: {
    instructions: string;
    filename: string;
    contentBase64?: string;
  }) {
    const response = await client.post("/ai/review-update", input).catch(() => ({ data: { instructions: input.instructions } }));
    return response.data;
  }
}
