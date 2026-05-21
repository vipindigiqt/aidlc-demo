import Dexie, { type Table } from 'dexie'
import type { LogEntry } from '../schemas/log-entry'

class LogsheetDB extends Dexie {
  entries!: Table<LogEntry, string>

  constructor() {
    super('logsheet')
    this.version(1).stores({
      entries: 'date, type',
    })
  }
}

export const db = new LogsheetDB()

export async function upsertEntry(entry: Omit<LogEntry, 'createdAt' | 'updatedAt'>): Promise<void> {
  const now = Date.now()
  const existing = await db.entries.get(entry.date)
  await db.entries.put({
    ...entry,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  })
}

export async function deleteEntry(date: string): Promise<void> {
  await db.entries.delete(date)
}
