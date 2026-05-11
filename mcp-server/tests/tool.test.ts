import { describe, expect, it } from "vitest";
import { toolRegistry } from "../src/tools/toolRegistry.js";

describe("toolRegistry", () => {
  it("registers all required document tools", () => {
    expect(toolRegistry).toHaveProperty("analyze_document_style");
    expect(toolRegistry).toHaveProperty("recreate_document");
    expect(toolRegistry).toHaveProperty("update_document_content");
    expect(toolRegistry).toHaveProperty("generate_document_from_template");
    expect(toolRegistry).toHaveProperty("export_document");
  });
});
