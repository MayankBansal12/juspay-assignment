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
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useStore } from '@/store/useStore'
import { PanelRightOpen } from 'lucide-react'
import { Bell, History, Moon, PanelLeft, PanelLeftOpen, PanelRight, Star, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
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
    <nav className="h-[68px] sticky top-0 z-50 bg-background border-b border-border py-5 px-2 lg:px-7 flex items-center justify-between gap-2 transition-all duration-500">
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
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isLeftSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    {isLeftSidebarOpen ? (
                      <PanelLeft className="h-5 w-5" />
                    ) : (
                      <PanelLeftOpen className="h-5 w-5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isLeftSidebarOpen ? 'Hide Sidebar' : 'Open Sidebar'}</p>
              <Kbd className="bg-primary">Ctrl + b</Kbd>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
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
                  {!isLast && (
                    <BreadcrumbSeparator>
                      {' '}
                      <p>/</p>{' '}
                    </BreadcrumbSeparator>
                  )}
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -15, scale: 0.85, y: -4 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
                  exit={{ opacity: 0, rotate: 15, scale: 0.85, y: 4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex items-center justify-center"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Theme</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <History className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>History</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isActivitySidebarOpen ? 'sidebar-open' : 'sidebar-closed'}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  {isActivitySidebarOpen ? (
                    <PanelRight className="h-5 w-5" />
                  ) : (
                    <PanelRightOpen className="h-5 w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isActivitySidebarOpen ? 'Hide Activity Bar' : 'Open Activity Bar'}</p>
            <Kbd className="bg-primary">Ctrl + Alt + b</Kbd>
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  )
}

export { Header }
