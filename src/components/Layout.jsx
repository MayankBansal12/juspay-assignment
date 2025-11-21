import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { LeftSidebar } from './LeftSidebar'
import { ActivitySidebar } from './ActivitySidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useStore } from '@/store/useStore'

const Layout = () => {
  const { isLeftSidebarOpen, isActivitySidebarOpen, setLeftSidebarOpen, setActivitySidebarOpen } = useStore()

  return (
    <div 
      className="flex min-h-svh w-full"
      style={{
        '--sidebar-width': '212px',
        '--sidebar-width-icon': '3rem',
      }}
    >
      <SidebarProvider
        open={isLeftSidebarOpen}
        onOpenChange={setLeftSidebarOpen}
        keyboardShortcut="b"
        keyboardModifiers={{ ctrl: true, meta: true, alt: false, shift: false }}
        noWrapper={true}
      >
        <LeftSidebar />
      </SidebarProvider>
      <SidebarInset>
        <Header />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </SidebarInset>
      <SidebarProvider
        open={isActivitySidebarOpen}
        onOpenChange={setActivitySidebarOpen}
        keyboardShortcut="b"
        keyboardModifiers={{ ctrl: true, meta: true, alt: true, shift: false }}
        noWrapper={true}
      >
        <ActivitySidebar />
      </SidebarProvider>
    </div>
  )
}

export default Layout
