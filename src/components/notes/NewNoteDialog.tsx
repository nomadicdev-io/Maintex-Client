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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Note } from "./NoteCard"

const availableLabels = [
  "Family",
  "Tasks",
  "Personal",
  "Meetings",
  "Shopping",
  "Planning",
  "Travel",
]

interface NewNoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (note: Omit<Note, "id" | "date">) => void
  note?: Note | null
}

export function NewNoteDialog({
  open,
  onOpenChange,
  onSave,
  note,
}: NewNoteDialogProps) {
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [selectedLabels, setSelectedLabels] = React.useState<string[]>([])

  React.useEffect(() => {
    if (note) {
      setTitle(note.title)
      setBody(note.body)
      setSelectedLabels(note.labels || [])
    } else {
      setTitle("")
      setBody("")
      setSelectedLabels([])
    }
  }, [note, open])

  const handleSave = () => {
    if (!title.trim()) return

    onSave({
      title: title.trim(),
      body: body.trim(),
      pinned: note?.pinned || false,
      labels: selectedLabels,
    })

    setTitle("")
    setBody("")
    setSelectedLabels([])
    onOpenChange(false)
  }

  const handleCancel = () => {
    setTitle("")
    setBody("")
    setSelectedLabels([])
    onOpenChange(false)
  }

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    )
  }

  const labelColors = {
    Family: "teal",
    Tasks: "sky",
    Personal: "amber",
    Meetings: "red",
    Shopping: "gray",
    Planning: "teal",
    Travel: "sky",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{note ? "Edit Note" : "New Note"}</DialogTitle>
          <DialogDescription>
            {note
              ? "Update your note below."
              : "Create a new note by adding a title and content."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="note-title">Title</Label>
            <Input
              id="note-title"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note-body">Content</Label>
            <Textarea
              id="note-body"
              placeholder="Enter note content..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <div className="space-y-2">
            <Label>Labels</Label>
            <div className="flex flex-wrap gap-2">
              {availableLabels.map((label) => {
                const isSelected = selectedLabels.includes(label)
                return (
                  <Badge
                    key={label}
                    variant={isSelected ? (labelColors[label] || "default") : "outline"}
                    className={cn(
                      "cursor-pointer transition-all",
                      isSelected && "ring-2 ring-offset-1"
                    )}
                    onClick={() => toggleLabel(label)}
                  >
                    {label}
                    {isSelected && (
                      <X className="size-3 ml-1" />
                    )}
                  </Badge>
                )
              })}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {note ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
