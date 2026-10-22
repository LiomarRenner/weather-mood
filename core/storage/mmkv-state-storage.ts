import { createMMKV } from 'react-native-mmkv'
import { type StateStorage } from 'zustand/middleware'

const STORAGE_ID = 'weather-mood'

const storage = createMMKV({ id: STORAGE_ID })

// Synchronous zustand storage adapter: MMKV reads are sync, so persisted stores hydrate
// before the first render (no flash of the default theme).
export const mmkvStateStorage: StateStorage = {
  getItem(name) {
    return storage.getString(name) ?? null
  },
  setItem(name, value) {
    storage.set(name, value)
  },
  removeItem(name) {
    storage.remove(name)
  },
}
