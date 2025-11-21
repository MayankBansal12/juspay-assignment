import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { LeftSidebar } from './LeftSidebar'
import { ActivitySidebar } from './ActivitySidebar'
import { SidebarInset } from '@/components/ui/sidebar'

const Layout = () => {
  return (
    <>
      <LeftSidebar />
      <SidebarInset>
        <Header />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </SidebarInset>
      <ActivitySidebar />
    </>
  )
}

export default Layout
