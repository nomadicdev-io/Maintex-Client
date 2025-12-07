import type { FC } from "react";
import {
  ThreadListItemPrimitive,
  ThreadListPrimitive,
} from "@assistant-ui/react";
import { ArchiveIcon, MessageSquarePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";

export const ThreadList: FC = () => {
  return (
    <ThreadListPrimitive.Root className="aui-root aui-thread-list-root flex flex-col items-stretch gap-1.5 bg-bg-100/10 border-s border-border">
      <ThreadListNew />
      <ThreadListItems />
    </ThreadListPrimitive.Root>
  );
};

const ThreadListNew: FC = () => {
  return (
    <ThreadListPrimitive.New asChild>
      <div className="w-full relative block p-3 border-b border-b-border">
        <Button
          className="w-full aui-thread-list-new flex items-center justify-center gap-2 rounded-xl p-3 text-start hover:bg-muted data-active:bg-muted bg-bg-300 border border-border h-10 rounded-lg"
          variant="ghost"
        >
          <MessageSquarePlus size={12} className="text-text/80 !w-4 !h-4" />
          New Chat
        </Button>
      </div>
    </ThreadListPrimitive.New>
  );
};

const ThreadListItems: FC = () => {
  return <ThreadListPrimitive.Items components={{ ThreadListItem }} />;
};

const ThreadListItem: FC = () => {
  return (
    <ThreadListItemPrimitive.Root className="aui-thread-list-item flex items-center gap-2 rounded-lg transition-all hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none data-active:bg-muted">
      <ThreadListItemPrimitive.Trigger className="aui-thread-list-item-trigger flex-grow px-3 py-2 text-start">
        <ThreadListItemTitle />
      </ThreadListItemPrimitive.Trigger>
      <ThreadListItemArchive />
    </ThreadListItemPrimitive.Root>
  );
};

const ThreadListItemTitle: FC = () => {
  return (
    <span className="aui-thread-list-item-title text-sm">
      <ThreadListItemPrimitive.Title fallback="New Chat" />
    </span>
  );
};

const ThreadListItemArchive: FC = () => {
  return (
    <ThreadListItemPrimitive.Archive asChild>
      <TooltipIconButton
        className="aui-thread-list-item-archive mr-3 ml-auto size-4 p-0 text-foreground hover:text-primary"
        variant="ghost"
        tooltip="Archive thread"
      >
        <ArchiveIcon />
      </TooltipIconButton>
    </ThreadListItemPrimitive.Archive>
  );
};
