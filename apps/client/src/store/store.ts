import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
  user: {
    id: string
    name: string
    avatar: string
    token: string
  } | null
  messages: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: number
  }>
  login: (user: Store['user']) => void
  logout: () => void
  addMessage: (message: Omit<Store['messages'][0], 'id' | 'timestamp'>) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      messages: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null, messages: [] }),
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
          ],
        })),
    }),
    {
      name: 'chat-store',
    }
  )
)