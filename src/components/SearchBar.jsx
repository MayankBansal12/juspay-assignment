import { Search } from "lucide-react"
import { Kbd } from "./ui/kbd"

export function SearchBar() {
  return (
    <div className="bg-input px-2 mr-2 text-muted-foreground rounded-md text-sm gap-2 hidden md:flex justify-center items-center h-[32px]">
      <Search className="h-4 w-4" />
      <input
        type="text"
        placeholder="Search"
        className="w-[100px] border-none outline-none bg-transparent"
      />
      <Kbd>⌘/</Kbd>
    </div>
  )
}
