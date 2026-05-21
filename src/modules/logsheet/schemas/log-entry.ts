export const ENTRY_TYPES = [
  'working',
  'full-leave',
  'partial-leave',
  'weekend',
  'holiday',
] as const

export type EntryType = (typeof ENTRY_TYPES)[number]

export type LogEntry = {
  date: string
  type: EntryType
  hours: number
  description: string
  createdAt: number
  updatedAt: number
}

export const ENTRY_TYPE_LABELS: Record<EntryType, string> = {
  working: 'Working',
  'full-leave': 'Full leave',
  'partial-leave': 'Partial leave',
  weekend: 'Weekend',
  holiday: 'Holiday',
}

export const ENTRY_TYPE_COLORS: Record<EntryType, string> = {
  working: 'blue',
  'full-leave': 'red',
  'partial-leave': 'orange',
  weekend: 'gray',
  holiday: 'grape',
}

export function requiresHours(type: EntryType): boolean {
  return type === 'working' || type === 'partial-leave'
}

export function requiresDescription(type: EntryType): boolean {
  return type === 'working' || type === 'partial-leave'
}
