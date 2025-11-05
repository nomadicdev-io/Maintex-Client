import { Button } from '../ui/button'
import { X } from 'lucide-react'
import useAI from '@/hooks/useAI'
import { motion } from 'motion/react'
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useLocalRuntime } from "@assistant-ui/react";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";


const MyModelAdapter = {
  async run({ messages, abortSignal }) {
    // Call your backend endpoint with the chat messages
    const res = await fetch("http://localhost:8880/v1/ai/chat", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "X-App-Secret": import.meta.env.VITE_APP_SECRET_KEY,
        "X-App-Version": import.meta.env.VITE_APP_VERSION,
        "X-App-Device": navigator?.userAgentData?.platform || navigator?.platform,
        "X-App-Platform": "Maintex Web",
        "X-App-TimeZone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify({ messages }),       // send messages array
      signal: abortSignal,                     // support cancellation
    });
    const data = await res.json();
    // Return assistant-ui-compatible content
    return {
      content: [{ type: "text", text: data.text }],
    };
  }
};

export default function DashboardAIChat() {

    const {reset} = useAI()

    const runtime = useLocalRuntime(MyModelAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: {delay: 0.2} }}
      transition={{ duration: 0.2 }}
      className="w-full h-full absolute inset-0 z-[9999] bg-bg/50 flex items-center justify-center backdrop-blur-sm bg-linear-to-r from-bg/50 to-bg-300/50">

          

          <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: {delay: 0} }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="relative w-[70rem] h-[47.5rem] bg-bg-300 border border-border/50 rounded-3xl overflow-hidden shadow-lg shadow-bg/50 grid grid-cols-[15rem_1fr]">
              <ThreadList />
              <Thread />            

              <div className="w-full p-3 absolute top-0 right-0 flex items-center justify-end">
                  <Button size="icon" variant="shadeLow" onClick={reset}>
                      <X />
                  </Button>
              </div>
          </motion.div>
          
      </motion.div>
    </AssistantRuntimeProvider>
  )
}
