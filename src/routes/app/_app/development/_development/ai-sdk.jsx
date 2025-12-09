import { createFileRoute } from '@tanstack/react-router'
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/react-ai-sdk";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";
import { useTheme } from 'next-themes'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useTranslation } from 'react-i18next'
import { Toggle } from "@/components/ui/toggle"
import { BrainCircuit, Globe } from 'lucide-react';

export const Route = createFileRoute(
  '/app/_app/development/_development/ai-sdk',
)({
  component: RouteComponent,
})

const models = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      chef: "OpenAI",
      chefSlug: "openai",
      providers: ["openai", "azure"],
    },
    {
      id: "gpt-4o-mini",
      name: "GPT-4o Mini",
      chef: "OpenAI",
      chefSlug: "openai",
      providers: ["openai", "azure"],
    },
    {
      id: "claude-opus-4-20250514",
      name: "Claude 4 Opus",
      chef: "Anthropic",
      chefSlug: "anthropic",
      providers: ["anthropic", "azure", "google", "amazon-bedrock"],
    },
    {
      id: "claude-sonnet-4-20250514",
      name: "Claude 4 Sonnet",
      chef: "Anthropic",
      chefSlug: "anthropic",
      providers: ["anthropic", "azure", "google", "amazon-bedrock"],
    },
    {
      id: "gemini-2.0-flash-exp",
      name: "Gemini 2.0 Flash",
      chef: "Google",
      chefSlug: "google",
      providers: ["google"],
    },
];

function RouteComponent() {

    const {resolvedTheme} = useTheme()
    const {t} = useTranslation()

    const runtime = useChatRuntime({
        transport: new AssistantChatTransport({
          api: import.meta.env.VITE_API_AI_URL + '/chat',
          headers: {
            'Content-Type': 'application/json',
            'X-App-Secret': import.meta.env.VITE_APP_SECRET_KEY,
            'X-App-Version': import.meta.env.VITE_APP_VERSION,
            'X-App-Device': navigator?.userAgentData?.platform || navigator?.platform,
            'X-App-Platform': 'Maintex Web',
            'X-App-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }),
    });

    return (
        <AssistantRuntimeProvider runtime={runtime}>
            <div className="relative w-full h-[calc(100vh-4rem)] bg-bg-300/550 border border-border/50  overflow-hidden shadow-lg shadow-bg/50 grid grid-cols-[1fr_18rem]">
                <div className="relative w-full h-full block overflow-hidden pb-12">
                    <div className="relative gap-2 w-full p-3 border-b border-border bg-bg-100/10 flex items-center justify-between">
                        {/* <div className="relative w-auto h-5 inline-flex">
                            <img src={resolvedTheme === 'dark' ? '/ai-logo-dark.svg' : '/ai-logo-light.svg'} alt="Maintex AI" className="w-auto h-full object-contain" />
                        </div> */}
                        <div className="relative w-10 h-10 inline-flex items-center justify-center">
                            <img src={'/ai-icon-dark.png'} alt="Maintex AI" className="w-auto h-full object-contain dark:invert-0 invert-100" />
                        </div>
                        <div className="relative inline-flex gap-2 items-center">
                            <Select value={models[0].id} >
                                <SelectTrigger className="max-w-45">
                                    <SelectValue placeholder={t('select-model')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Models</SelectLabel>
                                    {models.map((model) => (
                                        <SelectItem value={model.id}>{model.name}</SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Toggle
                                aria-label="Toggle web search"
                                variant="outline"
                                className="data-[state=on]:bg-bg-300! data-[state=on]:*:[svg]:fill-text data-[state=on]:*:[svg]:stroke-text/60"
                                >
                                <Globe />
                                {t('web_search')}
                            </Toggle>
                            <Toggle
                                aria-label="Toggle advanced mode"
                                variant="outline"
                                className="data-[state=on]:bg-bg-300/60! data-[state=on]:*:[svg]:fill-text data-[state=on]:*:[svg]:stroke-text/60"
                                >
                                <BrainCircuit />
                                {t('advanced_mode')}
                            </Toggle>
                        </div>
                    </div>
                    <Thread />
                </div>
                <ThreadList />
            </div>
        </AssistantRuntimeProvider>
    )
}
