import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Plus, X } from 'lucide-react'
import { UserData } from './UserProfile'

type WrittenPromptsProps = {
  writtenPrompts: { prompt: string; response: string }[]
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

export default function WrittenPrompts({ writtenPrompts, setUserData }: WrittenPromptsProps) {
  const handleEditPrompt = (index: number) => {
    console.log('Editing prompt:', index)
  }

  const handleRemovePrompt = (index: number) => {
    setUserData(prevData => ({
      ...prevData,
      writtenPrompts: prevData.writtenPrompts.filter((_, i) => i !== index)
    }))
  }

  return (
    <Card className="animate-card">
      <CardHeader>
        <CardTitle>Written Prompts</CardTitle>
      </CardHeader>
      <CardContent>
        {writtenPrompts.map((prompt, index) => (
          <div key={index} className="mb-4 p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{prompt.prompt}</h3>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleEditPrompt(index)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleRemovePrompt(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p>{prompt.response}</p>
          </div>
        ))}
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Written Prompt
        </Button>
      </CardContent>
    </Card>
  )
}