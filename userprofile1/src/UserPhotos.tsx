import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Camera, X } from 'lucide-react'
import { UserData } from './UserProfile'

type UserPhotosProps = {
  photos: string[]
  topPhotoEnabled: boolean
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

export default function UserPhotos({ photos, topPhotoEnabled, setUserData }: UserPhotosProps) {
  const handleAddPhoto = () => {
    setUserData(prevData => ({
      ...prevData,
      photos: [...prevData.photos, '/placeholder.svg?height=400&width=400'].slice(0, 6)
    }))
  }

  const handleRemovePhoto = (index: number) => {
    setUserData(prevData => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index)
    }))
  }

  const handleToggleTopPhoto = () => {
    setUserData(prevData => ({
      ...prevData,
      topPhotoEnabled: !prevData.topPhotoEnabled
    }))
  }

  return (
    <Card className="animate-card">
      <CardHeader>
        <CardTitle>My photos & videos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square group">
              <img src={photo} alt={`User photo ${index + 1}`} className="w-full h-full object-cover rounded-md transition-transform duration-200 group-hover:scale-105" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={() => handleRemovePhoto(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {Array.from({ length: Math.max(0, 6 - photos.length) }).map((_, index) => (
            <Button
              key={`add-${index}`}
              variant="outline"
              className="aspect-square flex items-center justify-center"
              onClick={handleAddPhoto}
            >
              <Camera className="h-6 w-6" />
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="top-photo"
            checked={topPhotoEnabled}
            onCheckedChange={handleToggleTopPhoto}
          />
          <Label htmlFor="top-photo">Enable top photo</Label>
        </div>
      </CardContent>
    </Card>
  )
}