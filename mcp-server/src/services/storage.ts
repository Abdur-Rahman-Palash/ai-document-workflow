import { Pool } from "pg";
import { config } from "../config";

const pool = new Pool({ connectionString: config.databaseUrl });

export async function saveTemplate(templateId: string, schema: Record<string, unknown>) {
  await pool.query(
    "INSERT INTO templates (id, schema, created_at) VALUES ($1, $2, NOW()) ON CONFLICT (id) DO UPDATE SET schema = $2, updated_at = NOW()",
    [templateId, schema]
  );
}

export async function saveDocumentVersion(documentId: string, data: Record<string, unknown>) {
  await pool.query(
    "INSERT INTO document_versions (document_id, payload, created_at) VALUES ($1, $2, NOW())",
    [documentId, data]
  );
}

export async function getTemplate(templateId: string) {
  const result = await pool.query("SELECT schema FROM templates WHERE id = $1", [templateId]);
  return result.rows[0]?.schema ?? null;
}

export async function initializeStorage() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS templates (
      id TEXT PRIMARY KEY,
      schema JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE
    );

    CREATE TABLE IF NOT EXISTS document_versions (
      id SERIAL PRIMARY KEY,
      document_id TEXT NOT NULL,
      payload JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL
    );
  `);
}
