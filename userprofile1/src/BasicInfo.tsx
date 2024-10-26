import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { UserData } from './UserProfile'

type BasicInfoProps = {
  userData: UserData
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

export default function BasicInfo({ userData, setUserData }: BasicInfoProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="basic-info">
        <AccordionTrigger>Basic Info</AccordionTrigger>
        <AccordionContent>
          {['hometown', 'politics', 'languages'].map((field) => (
            <div key={field} className="mb-4">
              <Label htmlFor={field} className="text-base font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <div className="flex items-center mt-1">
                <Input
                  id={field}
                  value={userData[field as keyof UserData].value}
                  onChange={(e) => {
                    setUserData((prevData) => ({
                      ...prevData,
                      [field]: { ...prevData[field as keyof UserData], value: e.target.value },
                    }))
                  }}
                  className="flex-grow"
                />
                <Switch
                  id={`${field}-visibility`}
                  checked={userData[field as keyof UserData].isVisible}
                  onCheckedChange={(checked) => {
                    setUserData((prevData) => ({
                      ...prevData,
                      [field]: { ...prevData[field as keyof UserData], isVisible: checked },
                    }))
                  }}
                  className="ml-2"
                />
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}