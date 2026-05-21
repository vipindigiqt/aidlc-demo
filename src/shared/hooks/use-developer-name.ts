import { useCallback, useEffect, useState } from 'react'
import {
  DEVELOPER_NAME_KEY,
  getDeveloperName,
  setDeveloperName,
} from '../utils/developer-name'

export function useDeveloperName(): {
  name: string | null
  save: (next: string) => void
} {
  const [name, setName] = useState<string | null>(() => getDeveloperName())

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== DEVELOPER_NAME_KEY) return
      setName(getDeveloperName())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const save = useCallback((next: string) => {
    setDeveloperName(next)
    setName(getDeveloperName())
  }, [])

  return { name, save }
}
