
import { BotIcon, ChevronDownIcon } from "lucide-react";

import { type FC, forwardRef, type ReactNode } from "react";
import { 
  AssistantModalPrimitive,
  AssistantRuntimeProvider,
  useLocalRuntime,
} from "@assistant-ui/react";

import { Thread } from "@/components/assistant-ui/thread";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";

const MyModelAdapter = {
  async run({ messages, abortSignal }) {
    try {
      const result = await fetch("http://localhost:8880/v1/ai/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-App-Secret": import.meta.env.VITE_APP_SECRET_KEY,
          "X-App-Version": import.meta.env.VITE_APP_VERSION,
          "X-App-Device": navigator?.userAgentData?.platform || navigator?.platform,
          "X-App-Platform": "Maintex Web",
          "X-App-TimeZone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        body: JSON.stringify({
          messages,
        }),
        signal: abortSignal,
      });

      if (!result.ok) {
        throw new Error(`API error: ${result.statusText}`);
      }

      const contentType = result.headers.get("content-type") || "";
      let text = "";

      if (contentType.includes("application/json")) {
        const data = await result.json();
        text = data.text || data.message || data.response || JSON.stringify(data);
      } else {
        text = await result.text();
      }

      if (!text) {
        throw new Error("Empty response from API");
      }

      return {
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      };
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }
      throw error;
    }
  },
};

const ModalRuntimeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const runtime = useLocalRuntime(MyModelAdapter);
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
};

export const AssistantModal: FC = () => {
  return (
    <ModalRuntimeProvider>
      <AssistantModalPrimitive.Root>
        <AssistantModalPrimitive.Anchor className="aui-root aui-modal-anchor fixed right-4 bottom-4 size-11">
          <AssistantModalPrimitive.Trigger asChild>
            <AssistantModalButton />
          </AssistantModalPrimitive.Trigger>
        </AssistantModalPrimitive.Anchor>
        <AssistantModalPrimitive.Content
          sideOffset={16}
          className="aui-root aui-modal-content data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-1/2 data-[state=closed]:slide-out-to-right-1/2 data-[state=closed]:zoom-out data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-1/2 data-[state=open]:slide-in-from-right-1/2 data-[state=open]:zoom-in z-50 h-[500px] w-[400px] overflow-clip overscroll-contain rounded-xl border bg-popover p-0 text-popover-foreground shadow-md outline-none data-[state=closed]:animate-out data-[state=open]:animate-in [&>.aui-thread-root]:bg-inherit"
        >
          <Thread />
        </AssistantModalPrimitive.Content>
      </AssistantModalPrimitive.Root>
    </ModalRuntimeProvider>
  );
};

type AssistantModalButtonProps = { "data-state"?: "open" | "closed" };

const AssistantModalButton = forwardRef<
  HTMLButtonElement,
  AssistantModalButtonProps
>(({ "data-state": state, ...rest }, ref) => {
  const tooltip = state === "open" ? "Close Assistant" : "Open Assistant";

  return (
    <TooltipIconButton
      variant="default"
      tooltip={tooltip}
      side="left"
      {...rest}
      className="aui-modal-button size-full rounded-full shadow transition-transform hover:scale-110 active:scale-90"
      ref={ref}
    >
      <BotIcon
        data-state={state}
        className="aui-modal-button-closed-icon absolute size-6 transition-all data-[state=closed]:rotate-0 data-[state=open]:rotate-90 data-[state=closed]:scale-100 data-[state=open]:scale-0"
      />

      <ChevronDownIcon
        data-state={state}
        className="aui-modal-button-open-icon data-[state=closed]:-rotate-90 absolute size-6 transition-all data-[state=open]:rotate-0 data-[state=closed]:scale-0 data-[state=open]:scale-100"
      />
      <span className="aui-sr-only sr-only">{tooltip}</span>
    </TooltipIconButton>
  );
});

AssistantModalButton.displayName = "AssistantModalButton";
