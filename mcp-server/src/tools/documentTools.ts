import { DocumentEngineClient } from "../services/documentEngineClient";
import { AIProcessorClient } from "../services/aiProcessorClient";

const documentEngine = new DocumentEngineClient();
const aiProcessor = new AIProcessorClient();

export async function analyzeDocumentStyle(input: {
  fileUrl?: string;
  contentBase64?: string;
  filename: string;
}): Promise<unknown> {
  return documentEngine.analyzeDocumentStyle(input);
}

export async function recreateDocument(input: {
  templateSchema: Record<string, unknown>;
  newStructuredData: Record<string, unknown>;
  outputFormat?: "docx" | "pdf";
}): Promise<unknown> {
  const semanticPlan = await aiProcessor.buildRecreationPlan({
    template: input.templateSchema,
    data: input.newStructuredData,
  });

  return documentEngine.recreateDocument({
    templateSchema: semanticPlan.templateSchema,
    structuredData: semanticPlan.structuredData,
    outputFormat: input.outputFormat ?? "docx",
  });
}

export async function updateDocumentContent(input: {
  fileUrl?: string;
  contentBase64?: string;
  filename: string;
  instructions: string;
  outputFormat?: "docx" | "pdf";
}): Promise<unknown> {
  const editedSchema = await aiProcessor.reviewDocumentUpdate({
    instructions: input.instructions,
    filename: input.filename,
    contentBase64: input.contentBase64,
  });

  return documentEngine.updateDocumentContent({
    contentBase64: input.contentBase64,
    filename: input.filename,
    instructions: input.instructions,
    outputFormat: input.outputFormat ?? "docx",
    updateSchema: editedSchema,
  });
}

export async function generateDocumentFromTemplate(input: {
  templateId?: string;
  templateSchema?: Record<string, unknown>;
  structuredData: Record<string, unknown>;
  outputFormat?: "docx" | "pdf";
}): Promise<unknown> {
  return documentEngine.generateDocumentFromTemplate({
    templateSchema: input.templateSchema,
    structuredData: input.structuredData,
    outputFormat: input.outputFormat ?? "docx",
  });
}

export async function exportDocument(input: {
  documentBase64: string;
  outputFormat: "docx" | "pdf";
}): Promise<unknown> {
  return documentEngine.exportDocument({
    documentBase64: input.documentBase64,
    outputFormat: input.outputFormat,
  });
}
