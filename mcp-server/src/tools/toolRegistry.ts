import {
  analyzeDocumentStyle,
  recreateDocument,
  updateDocumentContent,
  generateDocumentFromTemplate,
  exportDocument,
} from "./documentTools";

export type ToolHandler = (input: unknown) => Promise<unknown>;

export const toolRegistry: Record<string, ToolHandler> = {
  analyze_document_style: async (input) =>
    analyzeDocumentStyle(input as {
      fileUrl?: string;
      contentBase64?: string;
      filename: string;
    }),
  recreate_document: async (input) =>
    recreateDocument(input as {
      templateSchema: Record<string, unknown>;
      newStructuredData: Record<string, unknown>;
      outputFormat?: "docx" | "pdf";
    }),
  update_document_content: async (input) =>
    updateDocumentContent(input as {
      fileUrl?: string;
      contentBase64?: string;
      filename: string;
      instructions: string;
      outputFormat?: "docx" | "pdf";
    }),
  generate_document_from_template: async (input) =>
    generateDocumentFromTemplate(input as {
      templateId?: string;
      templateSchema?: Record<string, unknown>;
      structuredData: Record<string, unknown>;
      outputFormat?: "docx" | "pdf";
    }),
  export_document: async (input) =>
    exportDocument(input as {
      documentBase64: string;
      outputFormat: "docx" | "pdf";
    }),
};
