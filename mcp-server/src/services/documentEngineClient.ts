import axios from "axios";
import { config } from "../config";

const client = axios.create({
  baseURL: config.documentEngineUrl,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

export class DocumentEngineClient {
  async analyzeDocumentStyle(input: {
    fileUrl?: string;
    contentBase64?: string;
    filename: string;
  }) {
    const response = await client.post("/analyze-document-style", input);
    return response.data;
  }

  async recreateDocument(input: {
    templateSchema: Record<string, unknown>;
    structuredData: Record<string, unknown>;
    outputFormat: "docx" | "pdf";
  }) {
    const response = await client.post("/recreate-document", input, { responseType: "arraybuffer" });
    return {
      fileName: `recreated-document.${input.outputFormat}`,
      contentBase64: Buffer.from(response.data).toString("base64"),
      mimeType: input.outputFormat === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
  }

  async updateDocumentContent(input: {
    contentBase64?: string;
    filename: string;
    instructions: string;
    outputFormat: "docx" | "pdf";
    updateSchema?: Record<string, unknown>;
  }) {
    const response = await client.post("/update-document-content", input, { responseType: "arraybuffer" });
    return {
      fileName: `updated-${input.filename}`,
      contentBase64: Buffer.from(response.data).toString("base64"),
      mimeType: input.outputFormat === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
  }

  async generateDocumentFromTemplate(input: {
    templateSchema?: Record<string, unknown>;
    structuredData: Record<string, unknown>;
    outputFormat: "docx" | "pdf";
  }) {
    const response = await client.post("/generate-document-from-template", input, { responseType: "arraybuffer" });
    return {
      fileName: `generated-document.${input.outputFormat}`,
      contentBase64: Buffer.from(response.data).toString("base64"),
      mimeType: input.outputFormat === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
  }

  async exportDocument(input: { documentBase64: string; outputFormat: "docx" | "pdf" }) {
    const response = await client.post("/export-document", input, { responseType: "arraybuffer" });
    return {
      fileName: `exported-document.${input.outputFormat}`,
      contentBase64: Buffer.from(response.data).toString("base64"),
      mimeType: input.outputFormat === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
  }
}
