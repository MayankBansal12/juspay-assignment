import { ArrowUpDown, Calendar, Check, Loader2, MoreHorizontal } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge, BadgeDot } from '@/components/ui/badge'

const parseDate = (dateStr) => {
  if (!dateStr) return 0

  const now = Date.now()
  if (dateStr === 'Just now') return now
  if (dateStr === 'A minute ago') return now - 60000
  if (dateStr.includes('hour ago')) {
    const hours = parseInt(dateStr.match(/\d+/)?.[0] || '0')
    return now - hours * 3600000
  }
  if (dateStr === 'Today') return now
  if (dateStr === 'Yesterday') return now - 86400000

  const parsed = Date.parse(dateStr)
  if (!isNaN(parsed)) return parsed

  return 0
}

const getStatusColor = (status) => {
  const statusMap = {
    'In Progress': 'blue',
    Complete: 'green',
    Pending: 'yellow',
    Approved: 'purple',
    Rejected: 'red',
  }
  return statusMap[status] || 'gray'
}

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3"
        >
          Order ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('id')}</div>
    },
  },
  {
    accessorKey: 'user',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3"
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const nameA = rowA.original.user.name.toLowerCase()
      const nameB = rowB.original.user.name.toLowerCase()
      return nameA.localeCompare(nameB)
    },
  },
  {
    accessorKey: 'project',
    header: 'Project',
    cell: ({ row }) => {
      return <div>{row.getValue('project')}</div>
    },
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      return <div className="text-muted-foreground">{row.getValue('address')}</div>
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{row.getValue('date')}</span>
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const dateA = parseDate(rowA.original.date)
      const dateB = parseDate(rowB.original.date)
      return dateA - dateB
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('status')
      const color = getStatusColor(status)
      return (
        <Badge color={color}>
          <BadgeDot color={color} />
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      if (!value || value.length === 0) return true
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const copyStatus =
        table.options.meta?.copyStates?.[row.original.id] ?? "idle"

      const handleCopy = () => {
        table.options.meta?.onCopyOrder?.(row.original.id)
      }

      const renderIcon = () => {
        if (copyStatus === 'loading') return <Loader2 className="h-4 w-4 animate-spin" />
        if (copyStatus === 'success') return <Check className="h-4 w-4 text-green-500" />
        return <MoreHorizontal className="h-4 w-4" />
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copyStatus}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex items-center justify-center"
                >
                  {renderIcon()}
                </motion.span>
              </AnimatePresence>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleCopy}>
              Copy order ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
