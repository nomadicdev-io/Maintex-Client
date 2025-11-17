import { LayoutDashboard, MessagesSquare, CalendarDays, Users, CircleUser, Server, Package, FolderKanban, Megaphone, NotebookPen, Clock, DoorOpen, Settings, NotebookText, MapPinned, ListTree, FileCode, ChartNetwork, SquareTerminal, DatabaseBackup, MonitorSpeaker, Wrench, Columns3Cog, Ticket, WrenchIcon, FolderTree } from "lucide-react";

export const sidebarNav = [
    {
        label: "General",
        role: ['user', 'admin', 'hr', 'manager', 'developer', 'employee'],
        items: [
            {
                id: 'nav-01',
                label: "Dashboard",
                href: "/app",
                icon: <LayoutDashboard />,
                exact: true,
                users: 'user'
            },
            {
                id: 'nav-22',
                label: "Chats",
                href: "/app/chats",
                icon: <MessagesSquare />,
                exact: true
            },
            {
                id: 'nav-23',
                label: "Announcements",
                href: "/app/announcements",
                icon: <Megaphone />,
                exact: true
            }
        ]
    },
    {
        label: "Teamify",
        role: ['admin', 'hr', 'developer', 'employee'],
        items: [
            {
                id: 'nav-24',
                label: "Projects",
                href: "/app/teamify/projects",
                icon: <FolderKanban />,
                exact: false,
                users: 'employee'
            }
        ]
    },
    {
        label: "Service & Maintenance",
        role: ['admin', 'hr', 'developer', 'employee'],
        items: [
            {
                id: 'nav-11.22',
                label: "Tracking",
                href: "/app/manager/tracking",
                icon: <MapPinned />,
                exact: false,
                users: 'user'
            },
        ]
    },
    {
        label: "HR",
        role: ['admin', 'hr', 'developer'],
        items: [
            {   
                id: 'nav-11',
                label: "Attendance",
                href: "/app/hr/attendance",
                icon: <Clock />,
                exact: false,
                users: 'user'
            },
            {
                id: 'nav-11.1',
                label: "Employees",
                href: "/app/hr/employees",
                icon: <Users />,
                exact: false,
                users: 'user'
            },
            {
                id: 'nav-11.2',
                label: "Leave Management",
                href: "/app/hr/leave-management",
                icon: <DoorOpen />,
                exact: false,
                users: 'user'
            },
            // {
            //     id: 'nav-11.11',
            //     label: "Events",
            //     href: "/app/hr/events",
            //     icon: <Boxes />,
            //     exact: false,
            //     users: 'user'
            // },
            {
                id: 'nav-11.3',
                label: "Notes",
                href: "/app/hr/notes",
                icon: <NotebookText />,
                exact: false,
                users: 'user'
            },
            {
                id: 'nav-11.4',
                label: "Calendar",
                href: "/app/hr/calendar",
                icon: <CalendarDays />,
                exact: false,
                users: 'user'
            },
            {
                id: 'nav-11.5',
                label: "Manage Requests",
                href: "/app/hr/manage-requests",
                icon: <ListTree />,
                exact: false,
                users: 'user'
            }
        ]
    },
    {
        label: "Account",
        role: ['user', 'admin', 'hr', 'manager', 'developer'],
        items: [
            {   
                id: 'nav-10.2',
                label: "My Drive",
                href: "/app/account/drive",
                icon: <Package />,
                exact: false,
                users: 'user'
            },
            {
                id: 'nav-10.4',
                label: "Requests",
                href: "/app/account/requests",
                icon: <NotebookPen />,
                exact: false,
                users: 'user'
            },
            {   
                id: 'nav-10.1',
                label: "Projects",
                href: "/app/account/projects",
                icon: <FolderKanban />,
                exact: false,
                users: 'user'
            },
            {   
                id: 'nav-10.3',
                label: "Profile",
                href: "/app/account/profile",
                icon: <CircleUser />,
                exact: false,
                users: 'user'
            },
            
        ]
    },
    {
        label: "Admin",
        role: ['admin'],
        items: [
            {
                id: 'nav-15',
                label: "Activity Monitor",
                href: "/app/admin/activity-monitor",
                icon: <MonitorSpeaker />
            },
            // {
            //     id: 'nav-17',
            //     label: "User Management",
            //     href: "/app/admin/user-management",
            //     icon: <UserCog />
            // },
            {
                id: 'nav-18',
                label: "Servers & DB",
                href: "/app/admin/servers-db",
                icon: <Server />
            },
            // {
            //     id: 'nav-18.2',
            //     label: "Configuration",
            //     href: "/app/admin/configuration",
            //     icon: <Columns3Cog />
            // },
            {
                id: 'nav-19',
                label: "Settings",
                href: "/app/admin/settings",
                icon: <Settings />
            },
            {
                id: 'nav-19.1',
                label: "Backup",
                href: "/app/admin/backup",
                icon: <DatabaseBackup />,
            },
            {
                id: 'nav-13.5',
                label: "API Docs",
                href: import.meta.env.VITE_DOCS_URL,
                icon: <FileCode />,
                exact: false,
                users: 'admin',
                external: true
            },
        ]
    },
    {
        label: "Development",
        role: ['developer'],
        items: [
            {
                id: 'nav-133.6',
                label: "Tickets",
                href: "/app/development/tickets",
                icon: <Ticket />,
            },
            {
                id: 'nav-133.7',
                label: "Toolkit",
                href: "/app/development/toolkit",
                icon: <WrenchIcon />,
            },
            {
                id: 'nav-18.1',
                label: "Terminal",
                href: "/app/development/terminal",
                icon: <SquareTerminal />
            },
            {
                id: 'nav-133.8',
                label: "Repositories",
                href: "/app/development/repositories",
                icon: <FolderTree />,
            }
        ]
    }
]   
