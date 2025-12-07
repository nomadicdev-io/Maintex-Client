import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ChecklistItem {
  id: string
  label: string
  checked: boolean
}

interface ChecklistCardProps {
  items: ChecklistItem[]
  onToggle: (itemId: string) => void
  onDelete: (itemId: string) => void
  onAdd: (label: string) => void
}

export function ChecklistCard({
  items,
  onToggle,
  onDelete,
  onAdd,
}: ChecklistCardProps) {
  const [newItemLabel, setNewItemLabel] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleAddItem = () => {
    if (newItemLabel.trim()) {
      onAdd(newItemLabel.trim())
      setNewItemLabel("")
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem()
    }
  }

  const checkedCount = items.filter((item) => item.checked).length
  const totalCount = items.length

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Checklist</CardTitle>
        {totalCount > 0 && (
          <p className="text-sm text-text/60 mt-1">
            {checkedCount} of {totalCount} completed
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-0">
        <div className="flex gap-2 mb-4">
          <Input
            ref={inputRef}
            placeholder="Add checklist item..."
            value={newItemLabel}
            onChange={(e) => setNewItemLabel(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            onClick={handleAddItem}
            disabled={!newItemLabel.trim()}
            size="icon"
          >
            <Plus className="size-4" />
            <span className="sr-only">Add item</span>
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-8">
            <p className="text-sm text-text/50 text-center">
              No checklist items yet.
              <br />
              Add one above to get started.
            </p>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="space-y-1 pr-4">
              {items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="flex items-center gap-3 group py-2">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => onToggle(item.id)}
                      id={`checklist-item-${item.id}`}
                    />
                    <label
                      htmlFor={`checklist-item-${item.id}`}
                      className={cn(
                        "flex-1 text-sm cursor-pointer select-none",
                        item.checked && "line-through text-text/50"
                      )}
                    >
                      {item.label}
                    </label>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash2 className="size-3.5 text-destructive" />
                      <span className="sr-only">Delete item</span>
                    </Button>
                  </div>
                  {index < items.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

