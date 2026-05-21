import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../utils/db'
import type { LogEntry } from '../schemas/log-entry'

export function useLogEntries(from: string, to: string): LogEntry[] | undefined {
  return useLiveQuery(
    () => db.entries.where('date').between(from, to, true, true).sortBy('date'),
    [from, to],
  )
}
