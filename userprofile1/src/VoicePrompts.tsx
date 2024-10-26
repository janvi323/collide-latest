import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic } from 'lucide-react'
import { UserData } from  './UserProfile'

type VoicePromptsProps = {
  voicePrompts: { prompt: string; audioUrl: string }[]
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

export default function VoicePrompts({ voicePrompts, setUserData }: VoicePromptsProps) {
  return (
    <Card className="animate-card">
      <CardHeader>
        <CardTitle>Voice Prompts</CardTitle>
      </CardHeader>
      <CardContent>
        {voicePrompts.map((prompt, index) => (
          <div key={index} className="mb-4 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{prompt.prompt}</h3>
            <audio controls src={prompt.audioUrl} className="w-full" />
          </div>
        ))}
        <Button className="w-full">
          <Mic className="mr-2 h-4 w-4" />
          Add Voice Prompt
        </Button>
      </CardContent>
    </Card>
  )
}