import { useSetAtom } from "jotai"
import { voiceAgentAtom } from "../../routes/app/_app"
import { motion, useDragControls } from "motion/react"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { useRef } from 'react';
import '@livekit/components-styles';

export default function VoiceAgent() {

    const controls = useDragControls()
    const constraintsRef = useRef(document.getElementById('app-layout'))
    const setVoiceAgent = useSetAtom(voiceAgentAtom)

    return (
        <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -100, scale: 0.8 }}
        transition={{ duration: 0.2, type: 'tween' }}
        drag 
        dragControls={controls}
        dragConstraints={constraintsRef}
        dragElastic={0.25}
        className="w-[20rem] h-[27.5rem] border border-border rounded-2xl bg-bg-300/95 fixed top-0 right-0 m-5 backdrop-blur-lg z-[99999] voice-agent"
        >
    
            <div className="flex gap-2 items-center justify-end p-2 absolute top-0 right-0">              
                <Button size="iconSm" variant="shadeLow" onClick={()=> setVoiceAgent(e=> !e)}>
                    <X  size={14}/>
                </Button>
            </div>

        </motion.div>
    )
}
