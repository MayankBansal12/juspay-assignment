import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from '@/lib/utils'
import {
    BookOpen,
    ChevronDown,
    ChevronRight,
    Dot,
    FileText,
    Folder,
    MessageSquare,
    PieChart,
    Settings,
    ShoppingBag,
    User,
    User2,
    Users
} from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { ShoppingCart } from "lucide-react"

const dashboards = [
    { name: 'Default', icon: PieChart, path: '/dashboard/default' },
    { name: 'Order List', icon: ShoppingCart, path: '/dashboard/order-list' },
    { name: 'eCommerce', icon: ShoppingBag, path: '/dashboard/ecommerce', comingSoon: true },
    { name: 'Projects', icon: Folder, path: '/dashboard/projects', comingSoon: true },
    { name: 'Online Courses', icon: BookOpen, path: '/dashboard/courses', comingSoon: true },
]

const pages = [
    {
        name: 'User Profile',
        icon: User,
        children: ['Overview', 'Projects', 'Campaigns', 'Documents', 'Followers']
    },
    { name: 'Account', icon: Settings, comingSoon: true },
    { name: 'Corporate', icon: Users, comingSoon: true },
    { name: 'Blog', icon: FileText, comingSoon: true },
    { name: 'Social', icon: MessageSquare, comingSoon: true },
]

const LeftSidebar = () => {
    const { isLeftSidebarOpen } = useStore()
    const [favorites, setFavorites] = useState(['Overview', 'Projects'])
    const [recently, setRecently] = useState(['Campaigns', 'Documents'])

    if (!isLeftSidebarOpen) return null

    return (
        <aside
            className={cn(
                "flex flex-col h-full border-r bg-background transition-all duration-300 overflow-y-auto",
                "w-[212px]"
            )}
        >
            <div className="p-4 flex items-center gap-3 mb-4">
                <Avatar className="h-8 w-8">
                    <AvatarFallback><User2 className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">ByeWind</span>
            </div>

            <div className="px-4 mb-6">
                <div className="flex gap-4 text-xs text-muted-foreground mb-2">
                    <span className="cursor-pointer hover:text-foreground transition-colors">Favorites</span>
                    <span className="cursor-pointer hover:text-foreground transition-colors opacity-50">Recently</span>
                </div>
                <ul className="space-y-1">
                    {favorites.map((item) => (
                        <li key={item} className="flex items-center text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1">
                            <Dot className="h-4 w-4 mr-1" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="px-2 mb-6">
                <h3 className="px-2 text-xs font-medium text-muted-foreground mb-2">Dashboards</h3>
                <ul className="space-y-1">
                    {dashboards.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => cn(
                                    "relative flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors",
                                    isActive
                                        ? "bg-secondary text-foreground font-medium"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                                )}
                                onClick={(e) => {
                                    if (!recently.includes(item.name)) {
                                        setRecently(prev => [item.name, ...prev.slice(0, 1)])
                                    }
                                }}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <div className="w-1 h-4 bg-foreground rounded-full absolute left-0" />}

                                        <div className="px-4 flex items-center justify-center gap-1">
                                            <item.icon className="h-4 w-4" />
                                            <span className="text-sm">{item.name}</span>
                                        </div>

                                        <div></div>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="px-2">
                <h3 className="px-2 text-xs font-medium text-muted-foreground mb-2">Pages</h3>
                <ul className="space-y-1">
                    {pages.map((item) => (
                        <li key={item.name}>
                            {item.children ? (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-foreground font-medium cursor-pointer">
                                        <ChevronDown className="h-3 w-3" />
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.name}</span>
                                    </div>
                                    <ul className="pl-9 space-y-1">
                                        {item.children.map((child) => (
                                            <li
                                                key={child}
                                                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1"
                                            >
                                                {child}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className={cn(
                                    "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground",
                                )}>
                                    <ChevronRight className="h-3 w-3" />
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.name}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export { LeftSidebar }

