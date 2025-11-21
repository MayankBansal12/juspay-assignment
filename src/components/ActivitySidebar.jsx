import React from 'react'
import { useStore } from '../store/useStore'
import { cn } from '@/lib/utils'
import { Bug } from 'lucide-react'

const ActivitySidebar = () => {
    const { isActivitySidebarOpen } = useStore()

    if (!isActivitySidebarOpen) return null

    return (
        <aside
            className={cn(
                "flex flex-col h-full border-l bg-background transition-all duration-300",
                "w-[280px]"
            )}
        >
            <div className="p-4">
                <h3 className="font-semibold mb-4">Notifications</h3>

                <div className="flex gap-3 items-start p-3 rounded-lg bg-secondary/50">
                    <div className="mt-1">
                        <Bug className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">You have a bug that needs...</p>
                        <p className="text-xs text-muted-foreground mt-1">Just now</p>
                    </div>
                </div>

                {/* todo: add notifications and activities */}
            </div>
        </aside>
    )
}

export { ActivitySidebar }
