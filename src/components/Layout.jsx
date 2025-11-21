import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { LeftSidebar } from './LeftSidebar'
import { ActivitySidebar } from './ActivitySidebar'

const Layout = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <Header />
          <Outlet />
        </main>
        <ActivitySidebar />
      </div>
    </div>
  )
}

export default Layout
