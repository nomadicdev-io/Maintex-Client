import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Pin, Edit, Trash2, Archive, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Note {
  id: string
  title: string
  body: string
  date: string
  pinned?: boolean
  labels?: string[]
}

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (noteId: string) => void
  onPin: (noteId: string) => void
  onArchive?: (noteId: string) => void
  onEditLabels?: (note: Note) => void
}

export function NoteCard({ 
  note, 
  onEdit, 
  onDelete, 
  onPin,
  onArchive,
  onEditLabels,
}: NoteCardProps) {
  const bodyPreview = note.body.length > 120 
    ? note.body.substring(0, 120) + "..." 
    : note.body

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    })
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
    <Card
      className={cn(
        "group relative transition-all hover:shadow-md cursor-pointer justify-start border-border-600/70 bg-card p-0",
        note.pinned && "border-border-600/90 bg-bg-300/50"
      )}
    >
      <CardHeader className="p-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 px-4 py-3">
            {
              note.title ?
            <h3 className="text-base font-semibold text-text line-clamp-2">
              {note.title}
            </h3>
            : null
            }
            
            {note.pinned && (
              <div className="flex items-center gap-1 mb-2">
                <Pin className="size-3.5 text-text/70" />
                <span className="text-xs text-text/60">Pinned</span>
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onPin(note.id)}>
                <Pin className="size-4 mr-2" />
                {note.pinned ? "Unpin" : "Pin"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(note)}>
                <Edit className="size-4 mr-2" />
                Edit
              </DropdownMenuItem>
              {onEditLabels && (
                <DropdownMenuItem onClick={() => onEditLabels(note)}>
                  <Tag className="size-4 mr-2" />
                  Edit Labels
                </DropdownMenuItem>
              )}
              {onArchive && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onArchive(note.id)}>
                    <Archive className="size-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(note.id)}
              >
                <Trash2 className="size-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm text-text/70 line-clamp-3 leading-relaxed">
          {bodyPreview}
        </p>
        {note.labels && note.labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {note.labels.map((label) => (
              <Badge
                key={label}
                variant={labelColors[label] || "outline"}
                className="text-xs"
              >
                {label}
              </Badge>
            ))}
          </div>
        )}
        <p className="text-xs text-text/50">
          {formatDate(note.date)}
        </p>
      </CardContent>
    </Card>
  )
}
