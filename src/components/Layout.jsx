import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { LeftSidebar } from './LeftSidebar'
import { ActivitySidebar } from './ActivitySidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useStore } from '@/store/useStore'
import { useIsMobile, MOBILE_BREAKPOINT } from '@/hooks/use-mobile'
import { useEffect, useRef } from 'react'

const Layout = () => {
  const { isLeftSidebarOpen, isActivitySidebarOpen, setLeftSidebarOpen, setActivitySidebarOpen } = useStore()
  const isMobile = useIsMobile()
  const hasInitialized = useRef(false)

  useEffect(() => {
    const checkMobile = window.innerWidth < MOBILE_BREAKPOINT
    if (checkMobile && !hasInitialized.current) {
      if (isLeftSidebarOpen) {
        setLeftSidebarOpen(false)
      }
      if (isActivitySidebarOpen) {
        setActivitySidebarOpen(false)
      }
      hasInitialized.current = true
    }
  }, [isMobile, isLeftSidebarOpen, isActivitySidebarOpen, setLeftSidebarOpen, setActivitySidebarOpen])

  return (
    <div 
      className="flex min-h-svh w-full"
      style={{
        '--sidebar-width-icon': '3rem',
      }}
    >
      <SidebarProvider
        open={isLeftSidebarOpen}
        onOpenChange={setLeftSidebarOpen}
        keyboardShortcut="b"
        keyboardModifiers={{ ctrl: true, meta: true, alt: false, shift: false }}
        noWrapper={true}
        width="212px"
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
        width="280px"
      >
        <ActivitySidebar />
      </SidebarProvider>
    </div>
  )
}

export default Layout
