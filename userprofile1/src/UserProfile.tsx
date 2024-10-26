'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserProfileHeader from './UserProfileHeader'
import UserPhotos from './UserPhotos'
import WrittenPrompts from './WrittenPrompts'
import VoicePrompts from './VoicePrompts'
import Polls from './Polls'
import BasicInfo from './BasicInfo'
import DatingPreferences from './DatingPreferences'
import Lifestyle from './Lifestyle'

gsap.registerPlugin(ScrollTrigger)

export type UserData = {
  name: string
  age: number
  hometown: { value: string; isVisible: boolean }
  politics: { value: string; isVisible: boolean }
  languages: { value: string; isVisible: boolean }
  datingIntentions: { value: string; isVisible: boolean }
  relationshipType: { value: string; isVisible: boolean }
  drinking: { value: string; isVisible: boolean }
  smoking: { value: string; isVisible: boolean }
  marijuana: { value: string; isVisible: boolean }
  drugs: { value: string; isVisible: boolean }
  religion: { value: string; isVisible: boolean }
  medicines: { value: string; isVisible: boolean }
  pets: { value: string; isVisible: boolean }
  diet: { value: string; isVisible: boolean }
  photos: string[]
  topPhotoEnabled: boolean
  writtenPrompts: { prompt: string; response: string }[]
  voicePrompts: { prompt: string; audioUrl: string }[]
  polls: { question: string; options: string[]; votes: number[] }[]
}

export default function UserProfile() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    name: 'Apeksha Rathi',
    age: 28,
    hometown: { value: 'Chandigarh', isVisible: true },
    politics: { value: 'Liberal', isVisible: true },
    languages: { value: 'English, Hindi', isVisible: true },
    datingIntentions: { value: 'Life partner', isVisible: true },
    relationshipType: { value: 'Non-monogamy', isVisible: true },
    drinking: { value: 'No', isVisible: true },
    smoking: { value: 'Sometimes', isVisible: true },
    marijuana: { value: 'Yes', isVisible: true },
    drugs: { value: 'Prefer not to say', isVisible: false },
    religion: { value: 'Hindu', isVisible: true },
    medicines: { value: 'None', isVisible: true },
    pets: { value: 'Cat lover', isVisible: true },
    diet: { value: 'Vegetarian', isVisible: true },
    photos: [
      'https://images.pexels.com/photos/15798712/pexels-photo-15798712/free-photo-of-woman-posing-with-flowers-in-background.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/15798712/pexels-photo-15798712/free-photo-of-woman-posing-with-flowers-in-background.jpeg?auto=compress&cs=tinysrgb&w=600',
      '/placeholder.svg?height=400&width=400',
    ],
    topPhotoEnabled: true,
    writtenPrompts: [
      { prompt: 'I go crazy for', response: 'Stand up comedians' },
      { prompt: "Don't hate me if I", response: 'Snap on u sometimes' },
      { prompt: 'I want someone who', response: 'Likes with a sprinkle of sparkle and a dash of charm' },
    ],
    voicePrompts: [
      { prompt: 'My favorite joke', audioUrl: 'https://example.com/audio1.mp3' },
      { prompt: 'My best impression', audioUrl: 'https://example.com/audio2.mp3' },
    ],
    polls: [
      { question: 'Best first date?', options: ['Coffee', 'Dinner', 'Adventure', 'Movie'], votes: [10, 15, 20, 5] },
      { question: 'Ideal vacation?', options: ['Beach', 'Mountains', 'City', 'Staycation'], votes: [25, 30, 15, 10] },
    ],
  })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      gsap.from(container.querySelectorAll('.animate-card'), {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        },
      })
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark')
  }

  return (
    <div ref={containerRef} className={`min-h-screen p-4 sm:p-6 lg:p-8 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-[#FFFFF0] to-[#FADADD]'}`}>
      <div className="max-w-4xl mx-auto">
        <UserProfileHeader 
          name={userData.name} 
          completionPercentage={56} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
        />

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="view">View</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <div className="space-y-6">
              <UserPhotos 
                photos={userData.photos} 
                topPhotoEnabled={userData.topPhotoEnabled} 
                setUserData={setUserData} 
              />
              <WrittenPrompts 
                writtenPrompts={userData.writtenPrompts} 
                setUserData={setUserData} 
              />
              <VoicePrompts 
                voicePrompts={userData.voicePrompts} 
                setUserData={setUserData} 
              />
              <BasicInfo 
                userData={userData} 
                setUserData={setUserData} 
              />
              <DatingPreferences 
                userData={userData} 
                setUserData={setUserData} 
              />
              <Lifestyle 
                userData={userData} 
                setUserData={setUserData} 
              />
              <Polls 
                polls={userData.polls} 
                setUserData={setUserData} 
              />
            </div>
          </TabsContent>
          <TabsContent value="view">
            {/* View mode content */}
            {/* This section can be further componentized if needed */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}