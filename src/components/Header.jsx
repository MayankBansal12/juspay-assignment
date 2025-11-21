import { SearchBar } from '@/components/SearchBar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useStore } from '@/store/useStore'
import { Bell, History, Moon, PanelLeft, PanelRight, Star, Sun } from 'lucide-react'
import React from 'react'
import { useLocation } from 'react-router-dom'

const breadcrumbMap = {
  dashboard: 'Dashboards',
  default: 'Default',
  'order-list': 'Order List',
}

const Header = () => {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const {
    theme,
    setTheme,
    toggleLeftSidebar,
    toggleActivitybar,
    isLeftSidebarOpen,
    isActivitySidebarOpen,
  } = useStore()

  return (
    <nav className="h-[68px] sticky bg-background border-b py-5 px-2 lg:px-7 flex items-center justify-between gap-2 transition-all duration-500">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-[1px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLeftSidebar}
              className={isLeftSidebarOpen ? '' : 'text-muted-foreground'}
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isLeftSidebarOpen ? 'Hide Sidebar' : 'Open Sidebar'}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Star className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Favorites</p>
          </TooltipContent>
        </Tooltip>
        </div>

        <Breadcrumb>
          <BreadcrumbList>
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1
              const name = breadcrumbMap[segment] || segment

              return (
                <React.Fragment key={segment}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                        {name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator> <p>/</p> </BreadcrumbSeparator>}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-[1px]">
        <SearchBar />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Theme</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <History className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>History</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleActivitybar}
              className={isActivitySidebarOpen ? '' : 'text-muted-foreground'}
            >
              <PanelRight className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isActivitySidebarOpen ? 'Hide Sidebar' : 'Open Sidebar'}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  )
}

export { Header }
