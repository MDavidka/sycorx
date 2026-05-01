import { getDbClient } from "@/lib/db/client"

export interface EntryRecord {
  id: number
  title: string
  body: string | null
  createdAt: string
}

export async function listEntries(limit = 50): Promise<EntryRecord[]> {
  const db = getDbClient()
  const result = await db.execute({
    sql: `SELECT id, title, body, created_at as createdAt
          FROM entries ORDER BY created_at DESC LIMIT ?`,
    args: [limit],
  })
  return result.rows as unknown as EntryRecord[]
}

export async function createEntry(input: { title: string; body?: string }): Promise<number> {
  const db = getDbClient()
  const result = await db.execute({
    sql: "INSERT INTO entries (title, body) VALUES (?, ?)",
    args: [input.title, input.body ?? null],
  })
  return Number(result.lastInsertRowid ?? 0)
}
