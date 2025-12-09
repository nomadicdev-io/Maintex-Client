import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import DashboardBanner from '@/components/sections/DashboardBanner'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Pin,
  Send,
  Image as ImageIcon,
  Calendar,
  Megaphone,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const Route = createLazyFileRoute('/app/_app/announcements')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Announcements | Maintex Pro "
      } 
    ]
  })
})

// Mock data - replace with actual API calls
const mockAnnouncements = [
  {
    id: '1',
    type: 'announcement',
    author: {
      name: 'Sayem Sumon',
      role: 'Onboarding Manager',
      avatar: null,
    },
    title: 'Can I see your Gatherup Landing Page? Feedback Required',
    content: "I'm all in using Gatherup fully not only for communities but as the main website, landing pages, and more. The flexibility is incredible and the design system makes everything look professional.",
    pinned: true,
    likes: 12,
    comments: 5,
    shares: 2,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'post',
    author: {
      name: 'Salman Hira',
      role: 'Product Designer',
      avatar: null,
    },
    title: 'Offer option to turn-off open image overlay for cover images and link to the post instead',
    content: 'Currently, when you click on a cover image, it opens an overlay. This can be frustrating for users who want to quickly navigate to the full post. I suggest adding an option to disable this behavior and link directly to the post instead.',
    pinned: false,
    likes: 12,
    comments: 8,
    shares: 3,
    timestamp: '20 hours ago',
  },
  {
    id: '3',
    type: 'event',
    author: {
      name: 'Imran Khan',
      role: 'Event Coordinator',
      avatar: null,
    },
    title: 'Winter Music Show',
    content: 'Join us for an amazing winter music show featuring local artists. The event will take place on December 15th at the main auditorium. Tickets are available now!',
    pinned: false,
    likes: 24,
    comments: 12,
    shares: 6,
    timestamp: '20 hours ago',
  },
  {
    id: '4',
    type: 'announcement',
    author: {
      name: 'Sarah Johnson',
      role: 'HR Director',
      avatar: null,
    },
    title: 'New Company Policy Updates',
    content: 'We have updated several company policies effective next month. Please review the new employee handbook which includes updates to our remote work policy, vacation time, and benefits package.',
    pinned: false,
    likes: 8,
    comments: 3,
    shares: 1,
    timestamp: '1 day ago',
  },
]

function RouteComponent() {
  const [newPost, setNewPost] = useState('')
  const [announcements, setAnnouncements] = useState(mockAnnouncements)

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    const newAnnouncement = {
      id: String(announcements.length + 1),
      type: 'post',
      author: {
        name: 'You',
        role: 'Member',
        avatar: null,
      },
      title: '',
      content: newPost,
      pinned: false,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'Just now',
    }

    setAnnouncements([newAnnouncement, ...announcements])
    setNewPost('')
  }

  const handleLike = (id, currentLiked) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id 
        ? { ...ann, likes: ann.likes + (currentLiked ? -1 : 1), liked: !currentLiked }
        : ann
    ))
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'event':
        return <Calendar className="size-4" />
      case 'announcement':
        return <Megaphone className="size-4" />
      default:
        return null
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'event':
        return 'sky'
      case 'announcement':
        return 'amber'
      default:
        return 'gray'
    }
  }

  const pinnedPosts = announcements.filter(ann => ann.pinned)
  const regularPosts = announcements.filter(ann => !ann.pinned)

  return (
    <div className="relative w-full h-full flex-1 flex flex-col bg-bg">
      <DashboardBanner
        title="Announcements"
        description="Share updates, events, and important information with your team"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-5 py-6 space-y-6">
          {/* Create Post Section */}
          <Card className="border-border-600/70 bg-card">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage src={null} />
                  <AvatarFallback className="bg-secondary/20 text-secondary">
                    {getInitials('You')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="What's on your mind? Share an update, announcement, or event..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px] resize-none border-border-600/70"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="iconSm"
                        className="text-text/60 hover:text-text"
                      >
                        <ImageIcon className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="iconSm"
                        className="text-text/60 hover:text-text"
                      >
                        <Calendar className="size-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={handlePostSubmit}
                      disabled={!newPost.trim()}
                      className="bg-secondary hover:bg-secondary/90"
                    >
                      <Send className="size-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pinned Posts */}
          {pinnedPosts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <Pin className="size-4 text-danger" />
                <h2 className="text-lg font-semibold text-text">Pinned Posts</h2>
              </div>
              {pinnedPosts.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  onLike={handleLike}
                  getInitials={getInitials}
                  getTypeIcon={getTypeIcon}
                  getTypeColor={getTypeColor}
                />
              ))}
            </div>
          )}

          {/* Feed Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-semibold text-text">Your Feed</h2>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-text/70 hover:text-text"
                >
                  Latest
                </Button>
                <span className="text-text/30">•</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-text/50 hover:text-text"
                >
                  Recent activity
                </Button>
              </div>
            </div>

            {regularPosts.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onLike={handleLike}
                getInitials={getInitials}
                getTypeIcon={getTypeIcon}
                getTypeColor={getTypeColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AnnouncementCard({ announcement, onLike, getInitials, getTypeIcon, getTypeColor }) {
  const [isLiked, setIsLiked] = useState(announcement.liked || false)
  const [localLikes, setLocalLikes] = useState(announcement.likes)

  const handleLikeClick = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    setLocalLikes(prev => prev + (newLikedState ? 1 : -1))
    onLike(announcement.id, isLiked)
  }

  return (
    <Card className={cn(
      "group relative transition-all hover:shadow-md border-border-600/70 bg-card",
      announcement.pinned && "border-border-600/90 bg-bg-300/50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar className="size-10 shrink-0">
              <AvatarImage src={announcement.author.avatar} />
              <AvatarFallback className="bg-secondary/20 text-secondary">
                {getInitials(announcement.author.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-text">{announcement.author.name}</h3>
                {announcement.type !== 'post' && (
                  <Badge variant={getTypeColor(announcement.type)} className="text-xs">
                    {getTypeIcon(announcement.type)}
                    <span className="ml-1 capitalize">{announcement.type}</span>
                  </Badge>
                )}
                {announcement.pinned && (
                  <Badge variant="red" className="text-xs">
                    <Pin className="size-3" />
                    <span className="ml-1">Pinned</span>
                  </Badge>
                )}
              </div>
              <p className="text-sm text-text/60 mt-0.5">{announcement.author.role}</p>
              <p className="text-xs text-text/50 mt-1">{announcement.timestamp}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="iconSm"
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <Pin className="size-4 mr-2" />
                {announcement.pinned ? 'Unpin' : 'Pin'}
              </DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {announcement.title && (
          <h4 className="text-base font-semibold text-text leading-tight">
            {announcement.title}
          </h4>
        )}
        <p className="text-sm text-text/70 leading-relaxed whitespace-pre-wrap">
          {announcement.content}
        </p>
        
        <div className="flex items-center gap-6 pt-2 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLikeClick}
            className={cn(
              "text-text/70 hover:text-text",
              isLiked && "text-danger hover:text-danger"
            )}
          >
            <Heart className={cn("size-4 mr-2", isLiked && "fill-current")} />
            <span>{localLikes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-text/70 hover:text-text"
          >
            <MessageCircle className="size-4 mr-2" />
            <span>{announcement.comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-text/70 hover:text-text"
          >
            <Share2 className="size-4 mr-2" />
            <span>Share</span>
          </Button>
        </div>

        {/* Comment Input */}
        <div className="flex gap-2 pt-2">
          <Avatar className="size-8 shrink-0">
            <AvatarImage src={null} />
            <AvatarFallback className="bg-secondary/20 text-secondary text-xs">
              {getInitials('You')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="What are your thoughts?"
              className="flex-1 h-9 text-sm border-border-600/70"
            />
            <Button size="sm" variant="ghost" className="shrink-0">
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
