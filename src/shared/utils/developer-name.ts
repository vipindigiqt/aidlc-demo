export const DEVELOPER_NAME_KEY = 'aidlc:developerName'

export function getDeveloperName(): string | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(DEVELOPER_NAME_KEY)
  const trimmed = raw?.trim()
  return trimmed ? trimmed : null
}

export function setDeveloperName(name: string): void {
  const trimmed = name.trim()
  if (!trimmed) {
    window.localStorage.removeItem(DEVELOPER_NAME_KEY)
    return
  }
  window.localStorage.setItem(DEVELOPER_NAME_KEY, trimmed)
}

export function slugifyDeveloperName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
