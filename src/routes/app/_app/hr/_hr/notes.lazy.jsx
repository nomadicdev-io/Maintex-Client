import { useState, useMemo } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '@/components/sections/DashboardBanner'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { NoteCard } from '@/components/notes/NoteCard'
import { NewNoteDialog } from '@/components/notes/NewNoteDialog'
import { ChecklistDialog } from '@/components/checklist/ChecklistDialog'
import { LabelsSidebar } from '@/components/notes/LabelsSidebar'
import { CirclePlus, Plus, ListCheck, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export const Route = createLazyFileRoute('/app/_app/hr/_hr/notes')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Notes & Checklists | Maintex Pro "
      } 
    ]
  })
})

function RouteComponent() {
  const getInitialNotes = () => {
    const now = Date.now()
    return [
      {
        id: '1',
        title: 'Mountain Sunset Photography',
        body: 'Captured this beautiful sunset during our hiking trip. The colors were absolutely stunning!',
        date: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
        pinned: false,
        labels: ['Family', 'Personal'],
      },
      {
        id: '2',
        title: 'Weekly Grocery List',
        body: '• Organic vegetables\n• Whole grain bread\n• Greek yogurt\n• Fresh fruits\n• Chicken breast\n• Quinoa\n• Almond milk',
        date: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
        pinned: false,
        labels: ['Personal', 'Shopping'],
      },
      {
        id: '3',
        title: 'Project Milestones',
        body: 'Q1 Goals:\n- Launch beta version\n- Gather user feedback\n- Implement core features\n- Performance optimization\n- Security audit\n- Documentation update',
        date: new Date(now).toISOString(),
        pinned: true,
        labels: ['Tasks'],
      },
      {
        id: '4',
        title: 'Desert Road Trip Ideas',
        body: 'Potential routes for our upcoming desert adventure. Need to plan stops and accommodation.',
        date: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
        pinned: false,
        labels: ['Personal'],
      },
      {
        id: '5',
        title: 'Home Renovation Tasks',
        body: '• Paint living room\n• Replace kitchen faucet\n• Fix bathroom tiles\n• Install new light fixtures',
        date: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
        pinned: false,
        labels: ['Tasks'],
      },
    ]
  }

  const [notes, setNotes] = useState(getInitialNotes)
  const [noteDialogOpen, setNoteDialogOpen] = useState(false)
  const [checklistDialogOpen, setChecklistDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [selectedLabels, setSelectedLabels] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate label counts
  const labelCounts = useMemo(() => {
    const counts = {}
    notes.forEach((note) => {
      if (note.labels) {
        note.labels.forEach((label) => {
          counts[label] = (counts[label] || 0) + 1
        })
      }
    })
    return counts
  }, [notes])

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    let filtered = [...notes]

    // Filter by selected labels
    if (selectedLabels.length > 0) {
      filtered = filtered.filter((note) =>
        selectedLabels.some((label) => note.labels?.includes(label))
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.body.toLowerCase().includes(query)
      )
    }

    // Sort: pinned first, then by date (newest first)
    return filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [notes, selectedLabels, searchQuery])

  const handleCreateNote = () => {
    setEditingNote(null)
    setNoteDialogOpen(true)
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setNoteDialogOpen(true)
  }

  const handleSaveNote = (noteData) => {
    if (editingNote) {
      // Update existing note
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNote.id
            ? { ...note, ...noteData, date: note.date }
            : note
        )
      )
    } else {
      // Create new note
      const newNote = {
        id: Date.now().toString(),
        ...noteData,
        date: new Date().toISOString(),
      }
      setNotes((prev) => [newNote, ...prev])
    }
    setEditingNote(null)
  }

  const handleDeleteNote = (noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
  }

  const handlePinNote = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note
      )
    )
  }

  const handleLabelSelect = (label) => {
    setSelectedLabels((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    )
  }

  const handleEditLabels = (note) => {
    setEditingNote(note)
    setNoteDialogOpen(true)
  }

  const handleCreateChecklist = () => {
    setChecklistDialogOpen(true)
  }

  const handleSaveChecklist = (items) => {
    // Checklist saved - can be extended to show saved checklists
    console.log('Checklist saved:', items)
  }

  return (
    <ScrollArea className="relative h-full">
      <div className="relative flex min-h-full flex-col pb-12">
        <DashboardBanner
          title="Notes & Checklists"
          description="Manage your notes and checklists. Create, edit, and organize your thoughts and tasks."
        >
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text/50" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={handleCreateChecklist} variant="outline" className="gap-2">
              <ListCheck />
              Checklist
            </Button>
            <Button onClick={handleCreateNote} variant="default" className="gap-2">
              <CirclePlus />
              Add New Note
            </Button>
          </div>
        </DashboardBanner>

        <main className="relative flex w-full flex-1">
          <LabelsSidebar
            selectedLabels={selectedLabels}
            onLabelSelect={handleLabelSelect}
            noteCounts={labelCounts}
          />
          
          <div className="flex-1 p-5">
            {filteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-lg font-medium text-text mb-2">
                  {searchQuery ? 'No notes found' : 'No notes yet'}
                </p>
                <p className="text-sm text-text/60 mb-4">
                  {searchQuery
                    ? 'Try adjusting your search or filters'
                    : 'Create your first note to get started'}
                </p>
                {!searchQuery && (
                  <Button onClick={handleCreateNote} className="gap-2">
                    <Plus className="size-4" />
                    Create Note
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    onPin={handlePinNote}
                    onEditLabels={handleEditLabels}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        <NewNoteDialog
          open={noteDialogOpen}
          onOpenChange={setNoteDialogOpen}
          onSave={handleSaveNote}
          note={editingNote}
        />

        <ChecklistDialog
          open={checklistDialogOpen}
          onOpenChange={setChecklistDialogOpen}
          onSave={handleSaveChecklist}
        />
      </div>
    </ScrollArea>
  )
}
