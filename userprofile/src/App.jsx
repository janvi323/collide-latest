
'use client'
import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import Slider from './slider.jsx'; // Adjust the path as necessary
// Adjust the path as necessary

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, EyeOff, ChevronDown, ChevronUp, X, Plus, Edit2, ArrowLeft, Camera, Mic, PieChart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const emojis = {
  religion: ['🕉️', '☪️', '✝️', '✡️', '☸️'],
  medicines: ['💊', '🚫'],
  drugs: ['🚭', '🚬', '🍺', '🍁'],
  pets: ['🐶', '🐱', '🐠', '🐦'],
  diet: ['🥩', '🥕', '🥛', '🍣'],
}

export default function App() {
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
  })

  const [activeTab, setActiveTab] = useState('edit')
  const [expandedSection, setExpandedSection] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')

  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    gsap.from(container.querySelectorAll('.card'), {
      // opacity: 0,
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
  }

  const handleEdit = (field) => {
    setEditingField(field)
    setEditValue(userData[field].value)
  }

  const handleSave = () => {
    setUserData(prevData => ({
      ...prevData,
      [editingField]: { ...prevData[editingField], value: editValue }
    }))
    setEditingField(null)
  }

  const handleCancel = () => {
    setEditingField(null)
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleAddPhoto = () => {
    const newPhoto = 'https://images.pexels.com/photos/15798712/pexels-photo-15798712/free-photo-of-woman-posing-with-flowers-in-background.jpeg?auto=compress&cs=tinysrgb&w=600'
    setUserData(prevData => ({
      ...prevData,
      photos: [...prevData.photos, newPhoto].slice(0, 6)
    }))
  }

  const handleRemovePhoto = (index) => {
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

  const handleEditPrompt = (index) => {
    const prompt = userData.writtenPrompts[index]
    setEditingField(`prompt-${index}`)
    setEditValue(prompt.response)
  }

  const handleSavePrompt = (index) => {
    setUserData(prevData => ({
      ...prevData,
      writtenPrompts: prevData.writtenPrompts.map((prompt, i) => 
        i === index ? { ...prompt, response: editValue } : prompt
      )
    }))
    setEditingField(null)
  }

  const handleRemovePrompt = (index) => {
    setUserData(prevData => ({
      ...prevData,
      writtenPrompts: prevData.writtenPrompts.filter((_, i) => i !== index)
    }))
  }

  const renderSection = (title, fields) => (
    <div className="card mb-6 bg-white rounded-lg shadow-md overflow-hidden">
      <button
        className="flex items-center justify-between w-full py-3 px-4 bg-yellow-100 hover:bg-yellow-200 transition-colors duration-200"
        onClick={() => toggleSection(title)}
      >
        <span className="font-semibold text-yellow-800">{title}</span>
        {expandedSection === title ? <ChevronUp size={20} className="text-yellow-600" /> : <ChevronDown size={20} className="text-yellow-600" />}
      </button>
      {expandedSection === title && (
        <div className="p-4 space-y-4">
          {fields.map(field => (
            <div key={field} className="flex items-center justify-between py-2 border-b border-yellow-100">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{field}</h3>
                <p className="text-sm text-gray-600">{userData[field].value || 'Not answered yet'}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(field)}
                  className="px-3 py-1 text-sm text-yellow-600 border border-yellow-300 rounded-full hover:bg-yellow-50"
                >
                  Edit
                </button>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name={`toggle-${field}`}
                    id={`toggle-${field}`}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={userData[field].isVisible}
                    onChange={() => handleVisibilityToggle(field)}
                  />
                  <label
                    htmlFor={`toggle-${field}`}
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderPoll = (poll, index) => (
    <div key={index} className="card mb-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">{poll.question}</h3>
        {poll.options.map((option, optionIndex) => (
          <div key={optionIndex} className="mb-2">
            <div className="flex items-center justify-between">
              <span>{option}</span>
              <span>{poll.votes[optionIndex]} votes</span>
            </div>
            <div className="w-full bg-yellow-100 rounded-full h-2.5">
              <div
                className="bg-yellow-500 h-2.5 rounded-full"
                style={{ width: `${(poll.votes[optionIndex] / Math.max(...poll.votes)) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button className="text-yellow-600 hover:text-yellow-700">
            <ArrowLeft className="mr-2 h-4 w-4 inline" /> Back
          </button>
          <h1 className="text-3xl font-bold text-yellow-800">Apeksha Rathi • 56%</h1>
        </div>

        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="grid grid-cols-2">
            <button
              onClick={() => setActiveTab('edit')}
              className={`py-3 text-center font-semibold ${activeTab === 'edit' ? 'bg-yellow-400 text-white' : 'bg-yellow-100 text-yellow-700'}`}
            >
              Edit
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className={`py-3 text-center font-semibold ${activeTab === 'view' ? 'bg-yellow-400 text-white' : 'bg-yellow-100 text-yellow-700'}`}
            >
              View
            </button>
          </div>
        </div>
        {activeTab === 'edit' ? (
          <div className="space-y-6">
            <div className="card bg-white rounded-lg shadow-md overflow-hidden">
              <h2 className="text-xl font-semibold p-4 bg-yellow-100 text-yellow-800">My photos & videos</h2>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {userData.photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square group">
                      <img src={photo} alt={`User photo ${index + 1}`} className="w-full h-full object-cover rounded-md transition-transform duration-200 group-hover:scale-105" />
                      <button
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                  {Array.from({ length: Math.max(0, 6 - userData.photos.length) }).map((_, index) => (
                    <button
                      key={`add-${index}`}
                      onClick={handleAddPhoto}
                      className="aspect-square flex items-center justify-center border-2 border-dashed border-yellow-300 rounded-md hover:border-yellow-400 transition-colors duration-200 bg-yellow-50"
                    >
                      <Camera size={24} className="text-yellow-600" />
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Top Photo</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      name="toggle-top-photo"
                      id="toggle-top-photo"
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      checked={userData.topPhotoEnabled}
                      onChange={handleToggleTopPhoto}
                    />
                    <label
                      htmlFor="toggle-top-photo"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-white rounded-lg shadow-md overflow-hidden">
              <h2 className="text-xl font-semibold p-4 bg-yellow-100 text-yellow-800">Written Prompts</h2>
              <div className="p-4 space-y-4">
                {userData.writtenPrompts.map((prompt, index) => (
                  <div key={index} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-yellow-700">{prompt.prompt}</h3>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditPrompt(index)} className="text-yellow-600 hover:text-yellow-700">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleRemovePrompt(index)} className="text-red-500 hover:text-red-600">
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700">{prompt.response}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-white rounded-lg shadow-md overflow-hidden">
              <h2 className="text-xl font-semibold p-4 bg-yellow-100 text-yellow-800">Voice Prompts</h2>
              <div className="p-4 space-y-4">
                {userData.voicePrompts.map((prompt, index) => (
                  <div key={index} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h3 className="text-lg font-semibold text-yellow-700 mb-2">{prompt.prompt}</h3>
                    <audio controls src={prompt.audioUrl} className="w-full" />
                  </div>
                ))}
                <button className="w-full py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center">
                  <Mic size={20} className="mr-2" />
                  Add Voice Prompt
                </button>
              </div>
            </div>

            {renderSection('Basic Info', ['hometown', 'politics', 'languages'])}
            {renderSection('Dating Preferences', ['datingIntentions', 'relationshipType'])}
            {renderSection('Lifestyle', ['drinking', 'smoking', 'marijuana', 'drugs'])}

            <div className="card bg-white rounded-lg shadow-md overflow-hidden">
              <h2 className="text-xl font-semibold p-4 bg-yellow-100 text-yellow-800">Polls</h2>
              <div className="p-4 space-y-4">
                {userData.polls.map((poll, index) => renderPoll(poll, index))}
                <button className="w-full py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center">
                  <PieChart size={20} className="mr-2" />
                  Create New Poll
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="card bg-white rounded-lg shadow-md overflow-hidden">
              <img src={userData.photos[0]} alt="Profile" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-yellow-800">{userData.name}, {userData.age}</h2>
                <p className="text-gray-600 mb-4">{userData.hometown.value}</p>
                <div className="space-y-4">
                  {Object.entries(userData).map(([key, value]) => {
                    if (typeof value === 'object' && 'isVisible' in value && value.isVisible) {
                      return (
                        <div key={key} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                          <h3 className="font-semibold mb-2 text-yellow-700">{key}</h3>
                          <p className="text-gray-700">{value.value}</p>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            </div>
            {userData.writtenPrompts.map((prompt, index) => (
              <div key={index} className="card bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold mb-2 text-yellow-700">{prompt.prompt}</h3>
                  <p className="text-gray-700">{prompt.response}</p>
                </div>
              </div>
            ))}
            {userData.voicePrompts.map((prompt, index) => (
              <div key={index} className="card bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold mb-2 text-yellow-700">{prompt.prompt}</h3>
                  <audio controls src={prompt.audioUrl} className="w-full" />
                </div>
              </div>
            ))}
            {userData.polls.map((poll, index) => renderPoll(poll, index))}
          </div>
        )}
      </div>
    </div>
  )
}