import { getDbClient } from "@/lib/db/client"

// Database schema for this generated site. Apply with `applySchema()` on
// first boot or via the health check. Idempotent thanks to IF NOT EXISTS.

export const schemaStatements: string[] = [
  "CREATE TABLE IF NOT EXISTS entries (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  title TEXT NOT NULL,\n  body TEXT,\n  created_at TEXT NOT NULL DEFAULT (datetime('now'))\n);"
]

export async function applySchema(): Promise<void> {
  const db = getDbClient()
  for (const statement of schemaStatements) {
    await db.execute(statement)
  }
}
