import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const availableLabels = [
  "Family",
  "Tasks",
  "Personal",
  "Meetings",
  "Shopping",
  "Planning",
  "Travel",
]

interface LabelsSidebarProps {
  selectedLabels: string[]
  onLabelSelect: (label: string) => void
  noteCounts?: Record<string, number>
}

export function LabelsSidebar({
  selectedLabels,
  onLabelSelect,
  noteCounts = {},
}: LabelsSidebarProps) {
  return (
    <div className="w-64 border-r border-border-600/70 bg-bg-300/30 flex flex-col">

      <ScrollArea className="flex-1">
        <div className="pace-y-1">
          <div className="w-full p-3">
            <Button
                variant="ghost"
                className={cn(
                "w-full justify-start text-sm",
                selectedLabels.length === 0 && "bg-bg-100/50 text-text"
                )}
                onClick={() => {
                // Clear all selections - handled by parent
                if (selectedLabels.length > 0) {
                    selectedLabels.forEach((label) => onLabelSelect(label))
                }
                }}
            >
            All Notes
          </Button>
          </div>

          <Separator className="mb-2" />
          {availableLabels.map((label) => {
            const isSelected = selectedLabels.includes(label)
            const count = noteCounts[label] || 0
            
            return (
              <Button
                key={label}
                variant="ghost"
                className={cn(
                  "w-full justify-between text-sm",
                  isSelected && "bg-bg-100/50 text-text"
                )}
                onClick={() => onLabelSelect(label)}
              >
                <span>{label}</span>
                {count > 0 && (
                 <div className="w-8 h-8 relative text-sm inline-flex items-center justify-center bg-bg-100/50 border  border-border-600 text-text rounded-lg">
                    {count}
                 </div>
                )}
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

