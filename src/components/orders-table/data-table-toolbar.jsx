import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ListFilter, Plus, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const statuses = ['In Progress', 'Complete', 'Pending', 'Approved', 'Rejected']

export function DataTableToolbar({ table }) {
  const columnFilters = table.getState().columnFilters
  const globalFilter = table.getState().globalFilter || ''
  const statusFilter = columnFilters.find((filter) => filter.id === 'status')?.value || []
  const [selectedStatuses, setSelectedStatuses] = useState(statusFilter)

  useEffect(() => {
    const currentFilter = columnFilters.find((filter) => filter.id === 'status')?.value || []
    setSelectedStatuses(Array.isArray(currentFilter) ? currentFilter : [])
  }, [columnFilters])

  const isFiltered = columnFilters.length > 0 || globalFilter.length > 0

  const handleStatusToggle = (status) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status]

    setSelectedStatuses(newStatuses)

    if (newStatuses.length > 0) {
      table.getColumn('status').setFilterValue(newStatuses)
    } else {
      table.getColumn('status').setFilterValue(undefined)
    }
  }

  const clearFilters = () => {
    setSelectedStatuses([])
    table.resetColumnFilters()
    table.setGlobalFilter('')
  }

  return (
    <div className="bg-secondary rounded-md flex items-center justify-between gap-1 p-2">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add new orders</TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ListFilter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>

            <TooltipContent>Filter by status</TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => handleStatusToggle(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <Button variant="ghost" size="icon" className="h-7 w-7">
          <ArrowUpDown className="h-4 w-4" />
          <span className="sr-only">Sort</span>
        </Button> */}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="flex gap-2 items-center h-7 text-sm px-2 lg:px-3"
          >
            Reset
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="rounded-md relative flex-1 max-w-[180px] px-2">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="pl-8 h-8 bg-input"
        />
      </div>
    </div>
  )
}
