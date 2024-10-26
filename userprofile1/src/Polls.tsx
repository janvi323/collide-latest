import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart } from 'lucide-react'
import { UserData } from './UserProfile'

type PollsProps = {
  polls: { question: string; options: string[]; votes: number[] }[]
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

export default function Polls({ polls, setUserData }: PollsProps) {
  const renderPoll = (poll: { question: string; options: string[]; votes: number[] }, index: number) => (
    <Card key={index} className="mb-4">
      <CardHeader>
        <CardTitle>{poll.question}</CardTitle>
      </CardHeader>
      <CardContent>
        {poll.options.map((option, optionIndex) => (
          <div key={optionIndex} className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span>{option}</span>
              <span>{poll.votes[optionIndex]} votes</span>
            </div>
            <Progress value={(poll.votes[optionIndex] / Math.max(...poll.votes)) * 100} />
          </div>
        ))}
      </CardContent>
    </Card>
  )

  return (
    <Card className="animate-card">
      <CardHeader>
        <CardTitle>Polls</CardTitle>
      </CardHeader>
      <CardContent>
        {polls.map((poll, index) => renderPoll(poll, index))}
        <Button className="w-full">
          <PieChart className="mr-2 h-4 w-4" />
          Create New Poll
        </Button>
      </CardContent>
    </Card>
  )
}