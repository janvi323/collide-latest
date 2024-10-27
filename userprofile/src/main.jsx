import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './App.css'
import Component from './App1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Component />
    </StrictMode>
  ,
)
