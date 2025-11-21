import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "text-foreground",
        secondary: "text-secondary-foreground",
        destructive: "text-destructive",
        outline: "text-foreground",
      },
      color: {
        blue: "text-blue-500",
        green: "text-green-500",
        yellow: "text-yellow-500",
        purple: "text-purple-500",
        red: "text-red-500",
        gray: "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Badge = React.forwardRef(({ className, variant, color, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    >
      {children}
    </div>
  )
})
Badge.displayName = "Badge"

const BadgeDot = React.forwardRef(({ className, color, ...props }, ref) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
    gray: "bg-muted-foreground",
  }
  
  return (
    <span
      ref={ref}
      className={cn("h-2 w-2 rounded-full", colorClasses[color] || colorClasses.gray, className)}
      {...props}
    />
  )
})
BadgeDot.displayName = "BadgeDot"

export { Badge, BadgeDot, badgeVariants }
