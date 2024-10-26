import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowLeft, Moon, Sun } from 'lucide-react'

type UserProfileHeaderProps = {
  name: string
  completionPercentage: number
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export default function UserProfileHeader({ name, completionPercentage, isDarkMode, toggleDarkMode }: UserProfileHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6 p-4 flex justify-between items-center">
      <Button variant="ghost" className="text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <h1 className="text-2xl font-bold text-primary">{name} • {completionPercentage}%</h1>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  )
}