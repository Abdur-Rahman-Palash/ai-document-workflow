export type ToolResult = {
  fileName?: string;
  contentBase64?: string;
  mimeType?: string;
  [key: string]: unknown;
};

export type ToolArguments = Record<string, unknown>;
