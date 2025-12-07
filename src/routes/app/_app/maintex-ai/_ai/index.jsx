import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";
import { createFileRoute } from '@tanstack/react-router'
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
} from "@assistant-ui/react";

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
        // forward the messages in the chat to the API
        body: JSON.stringify({
          messages,
        }),
        // if the user hits the "cancel" button or escape keyboard key, cancel the request
        signal: abortSignal,
      });

      if (!result.ok) {
        throw new Error(`API error: ${result.statusText}`);
      }

      // Check the content type to handle both JSON and plain text responses
      const contentType = result.headers.get("content-type") || "";
      let text = "";

      if (contentType.includes("application/json")) {
        // Handle JSON response
        const data = await result.json();
        text = data.text || data.message || data.response || JSON.stringify(data);
      } else {
        // Handle plain text response
        text = await result.text();
      }

      // Ensure we have text content
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
      // User cancelled - this is normal, don't throw
      if (error.name === 'AbortError') {
        return;
      }
      // Re-throw other errors to display in UI
      throw error;
    }
  },
};

export function MyRuntimeProvider({
  children,
}) {
  const runtime = useLocalRuntime(MyModelAdapter);
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}


export const Route = createFileRoute('/app/_app/maintex-ai/_ai/')({
  component: RouteComponent,
})

function RouteComponent() {
 
  return (
    <MyRuntimeProvider >

        <div
        className="relative w-full h-[calc(100vh-4rem)] bg-bg-300/550 border border-border/50  overflow-hidden shadow-lg shadow-bg/50 grid grid-cols-[1fr_18rem]">
            <Thread />  
            <ThreadList />

        </div>
        
  </MyRuntimeProvider>
  )
}
