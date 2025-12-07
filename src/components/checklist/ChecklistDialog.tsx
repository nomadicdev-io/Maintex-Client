import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ChecklistItem {
  id: string
  label: string
  checked: boolean
}

interface ChecklistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (items: ChecklistItem[]) => void
  items?: ChecklistItem[]
}

export function ChecklistDialog({
  open,
  onOpenChange,
  onSave,
  items: initialItems = [],
}: ChecklistDialogProps) {
  const [items, setItems] = React.useState<ChecklistItem[]>([])
  const [newItemLabel, setNewItemLabel] = React.useState("")

  React.useEffect(() => {
    if (open) {
      setItems(initialItems.length > 0 ? initialItems : [])
      setNewItemLabel("")
    }
  }, [open, initialItems])

  const handleAddItem = () => {
    if (newItemLabel.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        label: newItemLabel.trim(),
        checked: false,
      }
      setItems((prev) => [...prev, newItem])
      setNewItemLabel("")
    }
  }

  const handleToggleItem = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const handleDeleteItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const handleSave = () => {
    onSave(items)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setItems(initialItems)
    setNewItemLabel("")
    onOpenChange(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem()
    }
  }

  const checkedCount = items.filter((item) => item.checked).length
  const totalCount = items.length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Checklist</DialogTitle>
          <DialogDescription>
            Create and manage your checklist items.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex gap-2">
            <Input
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

          {totalCount > 0 && (
            <div className="text-sm text-text/60">
              {checkedCount} of {totalCount} completed
            </div>
          )}

          {items.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-text/50">
                No checklist items yet.
                <br />
                Add one above to get started.
              </p>
            </div>
          ) : (
            <ScrollArea className="max-h-[300px]">
              <div className="space-y-1 pr-4">
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div className="flex items-center gap-3 group py-2">
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => handleToggleItem(item.id)}
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
                        onClick={() => handleDeleteItem(item.id)}
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Checklist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

