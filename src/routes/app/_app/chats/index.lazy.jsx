import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Users,
  MessageCircle,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Circle
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Add custom styles for animations
const customStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = customStyles
  document.head.appendChild(styleSheet)
}

export const Route = createLazyFileRoute('/app/_app/chats/')({
  component: RouteComponent,
  head: ()=> ({
    meta: [
      {
        title: "Chats | Maintex Pro "
      } 
    ]
  })
})

// Static data for users/groups
const conversations = [
  {
    id: 1,
    name: 'Jacquenetta Slowgrave',
    email: 'jacquenetta@example.com',
    avatar: '',
    initials: 'JS',
    lastMessage: "Great! Looking forward to it. See you later!",
    timestamp: '10 minutes',
    unread: 8,
    isGroup: false,
    isOnline: true,
  },
  {
    id: 2,
    name: 'Nickola Peever',
    email: 'nickola@example.com',
    avatar: '',
    initials: 'NP',
    lastMessage: "Sounds perfect! I've been wanting to try that place. See you there!",
    timestamp: '40 minutes',
    unread: 2,
    isGroup: false,
    isOnline: false,
  },
  {
    id: 3,
    name: 'Farand Hume',
    email: 'farand@example.com',
    avatar: '',
    initials: 'FH',
    lastMessage: "How about 7 PM at the new Italian place downtown?",
    timestamp: 'Yesterday',
    unread: 0,
    isGroup: false,
    isOnline: true,
  },
  {
    id: 4,
    name: 'Ossie Peasey',
    email: 'ossie@example.com',
    avatar: '',
    initials: 'OP',
    lastMessage: "Hey Bonnie, yes, definitely! What time should we meet?",
    timestamp: '13 days',
    unread: 0,
    isGroup: false,
    isOnline: false,
  },
  {
    id: 5,
    name: 'Hall Negri',
    email: 'hall@example.com',
    avatar: '',
    initials: 'HN',
    lastMessage: "No worries at all! I'll grab a table and wait for you. Drive safe!",
    timestamp: '2 days',
    unread: 0,
    isGroup: false,
    isOnline: true,
  },
  {
    id: 6,
    name: 'Design Team',
    email: '',
    avatar: '',
    initials: 'DT',
    lastMessage: "Elyssa: She just told me today.",
    timestamp: 'Yesterday',
    unread: 0,
    isGroup: true,
    isOnline: false,
  },
  {
    id: 7,
    name: 'Gil Wilfing',
    email: 'gil@example.com',
    avatar: '',
    initials: 'GW',
    lastMessage: "See you in 5 minutes!",
    timestamp: '1 day',
    unread: 0,
    isGroup: false,
    isOnline: false,
  },
  {
    id: 8,
    name: 'Bab Cleaton',
    email: 'bab@example.com',
    avatar: '',
    initials: 'BC',
    lastMessage: "If it takes long you can mail",
    timestamp: '3 hours',
    unread: 0,
    isGroup: false,
    isOnline: true,
  },
]

// Static messages for selected conversation
const messages = [
  {
    id: 1,
    sender: 'Jacquenetta Slowgrave',
    senderId: 1,
    content: "Great! Looking forward to it. See you later!",
    timestamp: '10:30 AM',
    isOwn: false,
    read: true,
  },
  {
    id: 2,
    sender: 'You',
    senderId: 'me',
    content: "Perfect! I'll be there at 7 PM sharp.",
    timestamp: '10:25 AM',
    isOwn: true,
    read: true,
  },
  {
    id: 3,
    sender: 'Jacquenetta Slowgrave',
    senderId: 1,
    content: "Sounds good! Can't wait to catch up.",
    timestamp: '10:20 AM',
    isOwn: false,
    read: true,
  },
  {
    id: 4,
    sender: 'You',
    senderId: 'me',
    content: "How about we meet at the new café downtown?",
    timestamp: '10:15 AM',
    isOwn: true,
    read: true,
  },
  {
    id: 5,
    sender: 'Jacquenetta Slowgrave',
    senderId: 1,
    content: "That sounds perfect! I've been wanting to try that place.",
    timestamp: '10:10 AM',
    isOwn: false,
    read: true,
  },
]

function RouteComponent() {
  const [selectedChat, setSelectedChat] = useState(conversations[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(new Set([1, 3, 5, 8]))

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message
      setMessageInput('')
    }
  }

  const handleTyping = (value) => {
    setMessageInput(value)
    if (value.trim()) {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 3000)
    }
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Left Sidebar - Conversations List */}
      <div className="bg-bg-100/50 w-full md:w-80 lg:w-96 border-r border-border/50 bg-card/80 backdrop-blur-sm flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-border/50 bg-gradient-to-r from-transparent via-muted/10 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Chats</h2>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-all duration-200">
              <MessageCircle className="size-5 text-primary" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 bg-muted/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 mb-1 group relative overflow-hidden",
                  selectedChat.id === conversation.id
                    ? "bg-gradient-to-r from-primary/20 to-primary/10 shadow-lg scale-[1.02] border border-primary/20"
                    : "hover:bg-muted/50 hover:scale-[1.01] border border-transparent"
                )}
              >
                {/* Subtle gradient overlay */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  selectedChat.id === conversation.id && "opacity-100"
                )} />
                
                <div className="relative">
                  <Avatar className={cn(
                    "size-12 transition-all duration-200 ring-2 ring-transparent group-hover:ring-primary/20",
                    selectedChat.id === conversation.id && "ring-primary/30 shadow-md"
                  )}>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback className={cn(
                      "bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold",
                      selectedChat.id === conversation.id && "from-primary/30 to-primary/20"
                    )}>
                      {conversation.initials}
                    </AvatarFallback>
                  </Avatar>
                  {!conversation.isGroup && onlineUsers.has(conversation.id) && (
                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-card rounded-full shadow-sm animate-pulse" />
                  )}
                  {conversation.isGroup && (
                    <div className="absolute -top-1 -right-1 size-5 bg-gradient-to-br from-primary/30 to-primary/20 border-2 border-card rounded-full flex items-center justify-center shadow-sm">
                      <Users className="size-3 text-primary" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={cn(
                      "font-semibold text-sm truncate transition-colors",
                      selectedChat.id === conversation.id ? "text-primary" : "text-foreground"
                    )}>
                      {conversation.name}
                    </h3>
                    <span className={cn(
                      "text-xs shrink-0 ml-2 transition-colors",
                      selectedChat.id === conversation.id ? "text-primary/70" : "text-muted-foreground"
                    )}>
                      {conversation.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-muted-foreground truncate group-hover:text-foreground/80 transition-colors">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <Badge 
                        variant="default" 
                        className={cn(
                          "shrink-0 min-w-[20px] h-5 px-1.5 text-xs font-semibold transition-all duration-200",
                          selectedChat.id === conversation.id 
                            ? "bg-primary text-primary-foreground shadow-md" 
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                      >
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col bg-card/60 backdrop-blur-sm">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border/50 bg-gradient-to-r from-transparent via-muted/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="size-11 ring-2 ring-primary/20 shadow-md">
                    <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                      {selectedChat.initials}
                    </AvatarFallback>
                  </Avatar>
                  {!selectedChat.isGroup && onlineUsers.has(selectedChat.id) && (
                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-card rounded-full shadow-sm animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gradient bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {selectedChat.name}
                  </h3>
                  {!selectedChat.isGroup && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {onlineUsers.has(selectedChat.id) && (
                        <Circle className="size-1.5 fill-green-500 text-green-500" />
                      )}
                      {selectedChat.email}
                    </p>
                  )}
                  {selectedChat.isGroup && (
                    <p className="text-xs text-muted-foreground">Group • 12 members</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-200">
                  <Phone className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-200">
                  <Video className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-200">
                  <MoreVertical className="size-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 animate-fadeIn",
                      message.isOwn ? "justify-end" : "justify-start"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {!message.isOwn && (
                      <Avatar className="size-9 shrink-0 ring-2 ring-primary/10 shadow-sm">
                        <AvatarImage src="" alt={message.sender} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-semibold">
                          {message.sender.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className="group relative">
                      <div
                        className={cn(
                          "max-w-[70%] md:max-w-[60%] rounded-2xl px-4 py-2.5 shadow-sm transition-all duration-200 hover:shadow-md",
                          message.isOwn
                            ? "bg-gradient-to-br from-bg to-bg-300 text-primary-foreground rounded-tr-sm ring-1 ring-primary/20"
                            : "bg-gradient-to-br from-bg to-bg-300 text-foreground rounded-tl-sm border border-border/50"
                        )}
                      >
                        {!message.isOwn && (
                          <p className="text-xs font-semibold mb-1.5 text-primary/80">
                            {message.sender}
                          </p>
                        )}
                        <p className="text-sm leading-relaxed break-words">{message.content}</p>
                        <div className={cn(
                          "flex items-center justify-between gap-2 mt-2",
                          message.isOwn ? "justify-end" : "justify-start"
                        )}>
                          <p
                            className={cn(
                              "text-xs",
                              message.isOwn ? "text-primary-foreground/60" : "text-muted-foreground"
                            )}
                          >
                            {message.timestamp}
                          </p>
                          {message.isOwn && (
                            <div className="flex items-center gap-1">
                              {message.read ? (
                                <CheckCheck className="size-3 text-primary-foreground/70" />
                              ) : (
                                <Check className="size-3 text-primary-foreground/50" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Hover effect */}
                      <div className={cn(
                        "absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                        message.isOwn && "from-primary/20 to-primary/10"
                      )} />
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 justify-start animate-fadeIn">
                    <Avatar className="size-9 shrink-0 ring-2 ring-primary/10 shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-semibold">
                        JS
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gradient-to-br from-muted to-muted/80 text-foreground rounded-tl-sm rounded-2xl px-4 py-3 border border-border/50 shadow-sm">
                      <div className="flex items-center gap-1">
                        <div className="size-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="size-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="size-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border/50 bg-gradient-to-r from-transparent via-muted/10 to-transparent">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" className="shrink-0 hover:bg-primary/10 hover:text-primary transition-all duration-200">
                  <Paperclip className="size-5" />
                </Button>
                
                <div className="flex-1 relative group">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => handleTyping(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="pr-10 min-h-[44px] bg-muted/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200 rounded-xl shadow-sm"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    <Smile className="size-5" />
                  </Button>
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className={cn(
                    "shrink-0 h-11 w-11 transition-all duration-200 rounded-xl shadow-sm",
                    messageInput.trim() 
                      ? "bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg" 
                      : "bg-muted text-muted-foreground"
                  )}
                  disabled={!messageInput.trim()}
                >
                  <Send className={cn("size-5 transition-transform duration-200", messageInput.trim() && "scale-110")} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-muted/20 to-transparent">
            <div className="text-center max-w-sm mx-auto p-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl animate-pulse" />
                <MessageCircle className="size-20 text-muted-foreground/40 mx-auto relative" />
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Select a conversation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Choose a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
