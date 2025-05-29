import { create } from 'zustand'

type RecordStore = {
  id?: number
  setId: (id: number) => void
}

export const useRecordStore = create<RecordStore>()((set) => ({
  setId: (id: number) => set(() => ({ id }))
}))
