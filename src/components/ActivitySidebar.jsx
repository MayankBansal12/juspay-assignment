import { motion } from 'motion/react'
import { Bug, User, Bell } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'

const ActivitySidebar = () => {
    return (
        <Sidebar side="right" collapsible="offcanvas" className="bg-background flex flex-col h-full border-l transition-all duration-300 overflow-y-auto">
            <SidebarHeader className="p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span className="group-data-[collapsible=icon]:hidden">Notifications</span>
                </h3>
            </SidebarHeader>
            <SidebarContent>
                <div className="p-4 space-y-4">
                    <motion.div
                        whileHover={{ scale: 1.02, backgroundColor: 'hsla(var(--secondary))' }}
                        className="flex gap-3 items-start p-3 rounded-lg bg-secondary/50 cursor-pointer transition-colors"
                    >
                        <div className="mt-1 bg-background p-1.5 rounded-full shadow-sm">
                            <Bug className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 group-data-[collapsible=icon]:hidden">
                            <p className="text-sm font-medium">You have a bug that needs attention</p>
                            <p className="text-xs text-muted-foreground mt-1">Just now</p>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02, backgroundColor: 'hsla(var(--secondary))' }}
                        className="flex gap-3 items-start p-3 rounded-lg bg-secondary/50 cursor-pointer transition-colors"
                    >
                        <div className="mt-1 bg-background p-1.5 rounded-full shadow-sm">
                            <User className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="flex-1 group-data-[collapsible=icon]:hidden">
                            <p className="text-sm font-medium">New user registered</p>
                            <p className="text-xs text-muted-foreground mt-1">5 mins ago</p>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02, backgroundColor: 'hsla(var(--secondary))' }}
                        className="flex gap-3 items-start p-3 rounded-lg bg-secondary/50 cursor-pointer transition-colors"
                    >
                        <div className="mt-1 bg-background p-1.5 rounded-full shadow-sm">
                            <Bell className="h-4 w-4 text-yellow-500" />
                        </div>
                        <div className="flex-1 group-data-[collapsible=icon]:hidden">
                            <p className="text-sm font-medium">System update scheduled</p>
                            <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                        </div>
                    </motion.div>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}

export { ActivitySidebar }
