import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      isLeftSidebarOpen: true,
      isActivitySidebarOpen: true,
      theme: 'light',
      toggleLeftSidebar: () => set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
      toggleActivitybar: () =>
        set((state) => ({ isActivitySidebarOpen: !state.isActivitySidebarOpen })),
      setLeftSidebarOpen: (open) => set({ isLeftSidebarOpen: open }),
      setActivitySidebarOpen: (open) => set({ isActivitySidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-storage',
    }
  )
)
