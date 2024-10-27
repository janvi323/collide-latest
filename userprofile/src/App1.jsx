'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, EyeOff, ChevronDown, ChevronUp, X, Plus, Edit2, ArrowLeft, Camera, Mic, PieChart } from 'lucide-react'
import { FaWheelchair, FaFistRaised, FaDog, FaCarrot, FaPray, FaPills, FaSmokingBan, FaBeer, FaCannabis } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Toaster, toast } from 'react-hot-toast'
import { useTheme } from 'next-themes'

gsap.registerPlugin(ScrollTrigger)

const icons = {
  religion: [<FaPray key="pray" />, <FaFistRaised key="fist" />, <FaDog key="dog" />, <FaCarrot key="carrot" />],
  medicines: [<FaPills key="pills" />, <FaSmokingBan key="smoking-ban" />],
  drugs: [<FaSmokingBan key="smoking-ban" />, <FaBeer key="beer" />, <FaCannabis key="cannabis" />],
  pets: [<FaDog key="dog" />],
  diet: [<FaCarrot key="carrot" />],
}

export default function Component() {
  const [userData, setUserData] = useState({
    name: 'Apeksha Rathi',
    age: 28,
    hometown: { value: 'Chandigarh', isVisible: true },
    politics: { value: 'Liberal', isVisible: true },
    languages: { value: 'English, Hindi', isVisible: true },
    DatingIntentions: { value: 'Life partner', isVisible: true },
    relationshipType: { value: 'Non-monogamy', isVisible: true },
    drinking: { value: 'No', isVisible: true },
    smoking: { value: 'Sometimes', isVisible: true },
    marijuana: { value: 'Yes', isVisible: true },
    drugs: { value: 'Prefer not to say', isVisible: false },
    religion: { value: '🕉️', isVisible: true },
    medicines: { value: '🚫', isVisible: true },
    pets: { value: '🐱', isVisible: true },
    diet: { value: '🥕', isVisible: true },
    photos: [
      'https://images.pexels.com/photos/15798712/pexels-photo-15798712/free-photo-of-woman-posing-with-flowers-in-background.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/15798712/pexels-photo-15798712/free-photo-of-woman-posing-with-flowers-in-background.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fp%2FDiksha-Singh-100044158970378%2F&psig=AOvVaw1VLVvaJqKZzHSWeQ6UPlVh&ust=1729525753138000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjAyd-nnYkDFQAAAAAdAAAAABAE',
    ],
    topPhotoEnabled: true,
    writtenPrompts: [
      { prompt: 'I go crazy for', response: 'Stand up comedians' },
      { prompt: "Don't hate me if I", response: 'Snap on u sometimes' },
      { prompt: 'I want someone who', response: 'Likes with a sprinkle of sparkle and a dash of charm' },
    ],
    voicePrompts: [
      // { prompt: 'My favorite joke', audioUrl: 'https://example.com/audio1.mp3' },
      // { prompt: 'My best impression', audioUrl: 'https://example.com/audio2.mp3' },
    ],
    polls: [
      { question: 'Best first date?', options: ['Coffee', 'Dinner', 'Adventure', 'Movie'], votes: [10, 15, 20, 5] },
      { question: 'Ideal vacation?', options: ['Beach', 'Mountains', 'City', 'Staycation'], votes: [25, 30, 15, 10] },
    ],
    // ... (previous user data)
  })

  const [activeTab, setActiveTab] = useState('edit')
  const [expandedSection, setExpandedSection] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const containerRef = useRef(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    gsap.from(container.querySelectorAll('.card'), {
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    })
  }, [])

  const handleVisibilityToggle = (field) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: { ...prevData[field], isVisible: !prevData[field].isVisible }
    }))
    toast.success(`${field} visibility updated`)
  }

  const handleEdit = (field) => {
    setEditingField(field)
    setEditValue(userData[field].value)
  }

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setUserData(prevData => ({
        ...prevData,
        [editingField]: { ...prevData[editingField], value: editValue }
      }))
      setEditingField(null)
      setIsLoading(false)
      toast.success('Changes saved successfully')
    }, 1000)
  }

  const handleCancel = () => {
    setEditingField(null)
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleAddPhoto = () => {
    // Simulating file upload
    setIsLoading(true)
    setTimeout(() => {
      const newPhoto = '/placeholder.svg?height=300&width=300'
      setUserData(prevData => ({
        ...prevData,
        photos: [...prevData.photos, newPhoto].slice(0, 6)
      }))
      setIsLoading(false)
      toast.success('Photo added successfully')
    }, 1500)
  }

  const handleRemovePhoto = (index) => {
    setUserData(prevData => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index)
    }))
    toast.success('Photo removed successfully')
  }

  const handleToggleTopPhoto = () => {
    setUserData(prevData => ({
      ...prevData,
      topPhotoEnabled: !prevData.topPhotoEnabled
    }))
    toast.success('Top photo setting updated')
  }

  const handleEditPrompt = (index) => {
    const prompt = userData.writtenPrompts[index]
    setEditingField(`prompt-${index}`)
    setEditValue(prompt.response)
  }

  const handleSavePrompt = (index) => {
    setIsLoading(true)
    setTimeout(() => {
      setUserData(prevData => ({
        ...prevData,
        writtenPrompts: prevData.writtenPrompts.map((prompt, i) => 
          i === index ? { ...prompt, response: editValue } : prompt
        )
      }))
      setEditingField(null)
      setIsLoading(false)
      toast.success('Prompt updated successfully')
    }, 1000)
  }

  const handleRemovePrompt = (index) => {
    setUserData(prevData => ({
      ...prevData,
      writtenPrompts: prevData.writtenPrompts.filter((_, i) => i !== index)
    }))
    toast.success('Prompt removed successfully')
  }

  const handleAddPollOption = (pollIndex, newOption) => {
    setUserData(prevData => ({
      ...prevData,
      polls: prevData.polls.map((poll, index) => 
        index === pollIndex
          ? { ...poll, options: [...poll.options, newOption], votes: [...poll.votes, 0] }
          : poll
      )
    }))
    toast.success('New poll option added')
  }

  const renderSection = (title, fields) => (
    <Card className="mb-6">
      <CardHeader className="bg-primary/10 cursor-pointer" onClick={() => toggleSection(title)}>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          {expandedSection === title ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CardTitle>
      </CardHeader>
      {expandedSection === title && (
        <CardContent className="space-y-4 mt-4">
          {fields.map(field => (
            <div key={field} className="flex items-center justify-between py-2 border-b">
              <div>
                <Label htmlFor={field}>{field}</Label>
                {editingField === field ? (
                  <Input
                    id={field}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{userData[field].value || 'Not answered yet'}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {editingField === field ? (
                  <>
                    <Button onClick={handleSave} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                    <Button onClick={handleCancel} variant="outline">Cancel</Button>
                  </>
                ) : (
                  <Button onClick={() => handleEdit(field)} variant="outline">
                    Edit
                  </Button>
                )}
                <Switch
                  checked={userData[field].isVisible}
                  onCheckedChange={() => handleVisibilityToggle(field)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  )

  const renderPoll = (poll, index) => (
    <Card key={index} className="mb-6">
      <CardHeader>
        <CardTitle>{poll.question}</CardTitle>
      </CardHeader>
      <CardContent>
        {poll.options.map((option, optionIndex) => (
          <div key={optionIndex} className="mb-2">
            <div className="flex items-center justify-between">
              <span>{option}</span>
              <span>{poll.votes[optionIndex]} votes</span>
            </div>
            <div className="w-full bg-primary/20 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${(poll.votes[optionIndex] / Math.max(...poll.votes)) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <Input
            placeholder="Add new option"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddPollOption(index, e.target.value)
                e.target.value = ''
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-bold">Apeksha Rathi • 56%</h1>
          <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="grid grid-cols-2">
              <Button
                onClick={() => setActiveTab('edit')}
                variant={activeTab === 'edit' ? 'default' : 'ghost'}
                className="rounded-none"
              >
                Edit
              </Button>
              <Button
                onClick={() => setActiveTab('view')}
                variant={activeTab === 'view' ? 'default' : 'ghost'}
                className="rounded-none"
              >
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        {activeTab === 'edit' ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My photos & videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {userData.photos.map((photo, index) => (
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
                  {Array.from({ length: Math.max(0, 6 - userData.photos.length) }).map((_, index) => (
                    <Button
                      key={`add-${index}`}
                      variant="outline"
                      className="aspect-square flex items-center justify-center"
                      onClick={handleAddPhoto}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Uploading...' : <Camera className="h-6 w-6" />}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="top-photo">Top Photo</Label>
                  <Switch
                    id="top-photo"
                    checked={userData.topPhotoEnabled}
                    onCheckedChange={handleToggleTopPhoto}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Written Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.writtenPrompts.map((prompt, index) => (
                  <div key={index} className="bg-primary/5 rounded-lg p-4">
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
                    {editingField === `prompt-${index}` ? (
                      <div className="mt-2">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="mb-2"
                        />
                        <Button onClick={() => handleSavePrompt(index)} disabled={isLoading}>
                          {isLoading ? 'Saving...' : 'Save'}
                        </Button>
                      </div>
                    ) : (
                      <p>{prompt.response}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voice Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.voicePrompts.map((prompt, index) => (
                  <div key={index} className="bg-primary/5 rounded-lg p-4">
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

            {renderSection('Basic Info', ['hometown', 'politics', 'languages'])}
            {renderSection('Dating Preferences', ['datingIntentions', 'relationshipType'])}
            {renderSection('Lifestyle', ['drinking', 'smoking', 'marijuana', 'drugs'])}

            <Card>
              <CardHeader>
                <CardTitle>Polls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.polls.map((poll, index) => renderPoll(poll, index))}
                <Button className="w-full">
                  <PieChart className="mr-2 h-4 w-4" />
                  Create New Poll
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <img src={userData.photos[0]} alt="Profile" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{userData.name}, {userData.age}</h2>
                  <p className="text-muted-foreground mb-4">{userData.hometown.value}</p>
                  <div className="space-y-4">
                    {Object.entries(userData).map(([key, value]) => {
                      if (typeof value === 'object' && 'isVisible' in value && value.isVisible) {
                        return (
                          <div key={key} className="bg-primary/5 rounded-lg p-4">
                            <h3 className="font-semibold mb-2">{key}</h3>
                            <p>{value.value}</p>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
            {userData.writtenPrompts.map((prompt, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{prompt.prompt}</h3>
                  <p>{prompt.response}</p>
                </CardContent>
              </Card>
            ))}
            {userData.voicePrompts.map((prompt, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{prompt.prompt}</h3>
                  <audio controls src={prompt.audioUrl} className="w-full" />
                </CardContent>
              </Card>
            ))}
            {userData.polls.map((poll, index) => renderPoll(poll, index))}
          </div>
        )}
      </div>
    </div>
  )
}