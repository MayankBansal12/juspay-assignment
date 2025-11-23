import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { activities, contacts, notifications } from '@/lib/mocks/activity'
import { Bell, Bug, Rss, User } from 'lucide-react'
import { motion } from 'motion/react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

const getNotificationIcon = (type) => {
  switch (type) {
    case 'bug':
      return Bug
    case 'user':
      return User
    case 'subscription':
      return Rss
    default:
      return Bell
  }
}

const ActivitySidebar = () => {
  return (
    <Sidebar
      side="right"
      collapsible="offcanvas"
      className="bg-background flex flex-col h-full border-l border-border transition-all duration-300 overflow-y-auto"
    >
      <SidebarContent className="py-7 px-4 space-y-3">
        <div>
          <h3 className="font-semibold text-sm mb-2 px-1 group-data-[collapsible=icon]:hidden">
            Notifications
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1"
          >
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              return (
                <motion.div
                  key={notification.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: 'hsl(var(--secondary))' }}
                  className="flex gap-2 items-start p-2 rounded-md cursor-pointer transition-colors"
                >
                  <div className="h-6 w-6 bg-card text-[var(--black-100)] rounded-md shadow-sm flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm text-foreground truncate">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-2 px-1 group-data-[collapsible=icon]:hidden">
            Activities
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1 group-data-[collapsible=icon]:hidden"
          >
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                whileHover={{ backgroundColor: 'hsl(var(--secondary))' }}
                className="flex gap-2 items-start p-2 rounded-md cursor-pointer transition-colors"
              >
                <div className="h-6 w-6 rounded-full overflow-hidden bg-background border-2 border-background flex-shrink-0">
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-2 px-1 group-data-[collapsible=icon]:hidden">
            Contacts
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1"
          >
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                variants={itemVariants}
                whileHover={{ backgroundColor: 'hsl(var(--secondary))' }}
                className="flex gap-2 items-center p-2 rounded-md cursor-pointer transition-colors"
              >
                <div className="h-6 w-6 rounded-full overflow-hidden bg-background border-2 border-background flex-shrink-0">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-medium text-foreground truncate">{contact.name}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

export { ActivitySidebar }
