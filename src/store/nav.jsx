import { LayoutDashboard, MessagesSquare, CalendarDays, Users, CircleUser, Server, Package, FolderKanban, Megaphone, NotebookPen, Clock, DoorOpen, Settings, NotebookText, MapPinned, ListTree, FileCode, ChartNetwork, SquareTerminal, DatabaseBackup, MonitorSpeaker, Wrench, Columns3Cog, Ticket, WrenchIcon, FolderTree } from "lucide-react";
import i18n from "@/lang";

export const sidebarNav = [
    {
        label: i18n.t("general"),
        role: ['user', 'admin', 'hr', 'manager', 'developer', 'employee'],
        items: [
            {
                id: 'nav-01',
                label: i18n.t("dashboard"),
                href: "/app",
                icon: <LayoutDashboard />,
                exact: true,
                users: 'user'
            },
            {
                id: 'nav-22',
                label: i18n.t("chats"),
                href: "/app/chats",
                icon: <MessagesSquare />,
                exact: true
            },
            {
                id: 'nav-23',
                label: i18n.t("announcements"),
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
                label: i18n.t("projects"),
                href: "/app/teamify/projects",
                icon: <FolderKanban />,
                exact: false,
                users: 'employee'
            }
        ]
    },
    {
        label: i18n.t("service-maintenance"),
        role: ['admin', 'hr', 'developer', 'employee'],
        items: [
            {
                id: 'nav-11.22',
                label: i18n.t("tracking"),
                href: "/app/manager/tracking",
                icon: <MapPinned />,
                exact: false,
                users: 'user'
            },
        ]
    },
    {
        label: i18n.t("hr"),
        role: ['admin', 'hr', 'developer'],
        items: [
            {   
                id: 'nav-11',
                label: i18n.t("attendance"),
                href: "/app/hr/attendance",
                icon: <Clock />,
                exact: false,
                users: 'user'
            },
            {
                id: 'nav-11.1',
                label: i18n.t("employees"),
                href: "/app/hr/employees",
                icon: <Users />,
                exact: false,
                users: 'user'
            },
            {
                id: 'nav-11.2',
                label: i18n.t("leave-management"),
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
                label: i18n.t("notes"),
                href: "/app/hr/notes",
                icon: <NotebookText />,
                exact: false,
                users: 'user'
            },
            {
                id: 'nav-11.4',
                label: i18n.t("calendar"),
                href: "/app/hr/calendar",
                icon: <CalendarDays />,
                exact: false,
                users: 'user'
            },
            {
                id: 'nav-11.5',
                label: i18n.t("manage-requests"),
                href: "/app/hr/manage-requests",
                icon: <ListTree />,
                exact: false,
                users: 'user'
            }
        ]
    },
    {
        label: i18n.t("account"),
        role: ['user', 'admin', 'hr', 'manager', 'developer'],
        items: [
            {   
                id: 'nav-10.2',
                label: i18n.t("my-drive"),
                href: "/app/account/drive",
                icon: <Package />,
                exact: false,
                users: 'user'
            },
            {
                id: 'nav-10.4',
                label: i18n.t("requests"),
                href: "/app/account/requests",
                icon: <NotebookPen />,
                exact: false,
                users: 'user'
            },
            {   
                id: 'nav-10.1',
                label: i18n.t("projects"),
                href: "/app/account/projects",
                icon: <FolderKanban />,
                exact: false,
                users: 'user'
            },
            {   
                id: 'nav-10.3',
                label: i18n.t("profile"),
                href: "/app/account/profile",
                icon: <CircleUser />,
                exact: false,
                users: 'user'
            },
            
        ]
    },
    {
        label: i18n.t("admin"),
        role: ['admin'],
        items: [
            {
                id: 'nav-15',
                label: i18n.t("activity-monitor"),
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
                label: i18n.t("servers-db"),
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
                label: i18n.t("settings"),
                href: "/app/admin/settings",
                icon: <Settings />
            },
            {
                id: 'nav-19.1',
                label: i18n.t("backup"),
                href: "/app/admin/backup",
                icon: <DatabaseBackup />,
            },
            {
                id: 'nav-13.5',
                label: i18n.t("api-docs"),
                href: import.meta.env.VITE_DOCS_URL,
                icon: <FileCode />,
                exact: false,
                users: 'admin',
                external: true
            },
        ]
    },
    {
        label: i18n.t("development"),
        role: ['developer'],
        items: [
            {
                id: 'nav-133.6',
                label: i18n.t("tickets"),
                href: "/app/development/tickets",
                icon: <Ticket />,
            },
            {
                id: 'nav-133.7',
                label: i18n.t("toolkit"),
                href: "/app/development/toolkit",
                icon: <WrenchIcon />,
            },
            {
                id: 'nav-18.1',
                label: i18n.t("terminal"),
                href: "/app/development/terminal",
                icon: <SquareTerminal />
            },
            {
                id: 'nav-133.8',
                label: i18n.t("repositories"),
                href: "/app/development/repositories",
                icon: <FolderTree />,
            }
        ]
    }
]   
