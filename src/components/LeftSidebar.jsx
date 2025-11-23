import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  BookOpen,
  ChevronRight,
  FileText,
  Folder,
  MessageSquare,
  PieChart,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
  User2,
  Users,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const dashboards = [
  { name: 'Default', icon: PieChart, path: '/dashboard/default' },
  { name: 'Order List', icon: ShoppingCart, path: '/dashboard/order-list' },
  { name: 'eCommerce', icon: ShoppingBag, path: '/dashboard/ecommerce' },
  { name: 'Projects', icon: Folder, path: '/dashboard/projects' },
  { name: 'Online Course', icon: BookOpen, path: '/dashboard/courses' },
]

const pages = [
  {
    name: 'User Profile',
    icon: User,
    children: ['Overview', 'Projects', 'Campaigns', 'Documents', 'Followers'],
  },
  {
    name: 'Account',
    icon: Settings,
    children: ['Details', 'Billing'],
  },
  {
    name: 'Corporate',
    icon: Users,
    children: ['Overview', 'Teams'],
  },
  {
    name: 'Blog',
    icon: FileText,
    children: ['Posts', 'Comments', 'Categories'],
  },
  {
    name: 'Social',
    icon: MessageSquare,
    children: ['Campaigns', 'Inbox'],
  },
]

const LeftSidebar = () => {
  const [favorites] = useState(['Overview', 'Projects'])
  const [recently, setRecently] = useState(['Campaigns', 'Documents'])
  const [activeTab, setActiveTab] = useState('favorites')

  const handleDashboardClick = (itemName) => {
    if (!recently.includes(itemName)) {
      setRecently((prev) => [itemName, ...prev.slice(0, 1)])
    }
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-background flex flex-col h-full border-r border-border transition-all duration-300 overflow-y-auto"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback>
              <User2 className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <span className="font-medium text-sm truncate">ByeWind</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex gap-4 text-xs mb-2 px-2">
            <button
              onClick={() => setActiveTab('favorites')}
              className={cn(
                'transition-colors text-muted-foreground',
                activeTab === 'favorites' ? 'text-foreground font-medium' : ''
              )}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('recently')}
              className={cn(
                'transition-colors text-muted-foreground',
                activeTab === 'recently' ? 'text-foreground font-medium' : ''
              )}
            >
              Recently
            </button>
          </div>
          <SidebarMenu>
            {(activeTab === 'favorites' ? favorites : recently).map((item) => (
              <SidebarMenuItem key={item}>
                <SidebarMenuButton size="sm" className="flex items-center gap-2 px-2">
                  <div className="w-[6px] h-[6px] rounded-full bg-black/20 dark:bg-white/20"></div>
                  <span className="text-sm">{item}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
          <SidebarMenu>
            {dashboards.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.name}
                  className="p-0 hover:bg-transparent"
                  onClick={() => handleDashboardClick(item.name)}
                >
                  <NavLink to={item.path}>
                    {({ isActive }) => (
                      <div className="w-full">
                        <motion.div
                          style={{
                            transformOrigin: "center",
                            willChange: "transform",
                            overflow: "visible"
                          }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.05 }}
                          className={cn(
                            'relative w-full flex items-center gap-[8px] px-[8px] py-[6px] rounded-md text-sm transition-colors',
                            isActive
                              ? 'bg-input/70 text-foreground font-medium'
                              : 'text-muted-foreground hover:bg-secondary/10 dark:hover:bg-secondary/60 hover:text-foreground'
                          )}
                        >
                          {isActive && (
                            <div className="w-[4px] h-[20px] bg-foreground rounded-full absolute left-0" />
                          )}
                          <div className="px-[16px] flex items-center justify-center gap-[8px]">
                            <item.icon className="h-[16px] w-[16px]" />
                            <span>{item.name}</span>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarMenu>
            {pages.map((item) => (
              <Collapsible key={item.name} asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.name}>
                      <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      <item.icon />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children
                        ? item.children.map((child) => (
                          <Tooltip key={child}>
                            <TooltipTrigger>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                  <motion.span
                                    whileHover={{ x: 2, transition: { duration: 0.2 } }}
                                    className="cursor-pointer"
                                  >
                                    {child}
                                  </motion.span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </TooltipTrigger>
                            <TooltipContent>Coming Soon</TooltipContent>
                          </Tooltip>
                        ))
                        : null}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export { LeftSidebar }
