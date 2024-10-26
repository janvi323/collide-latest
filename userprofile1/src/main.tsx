import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@mui/material/styles"
import UserProfile from './UserProfile'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={{ palette: { mode: 'light' } }}>
      <UserProfile />
    </ThemeProvider>
  </React.StrictMode>,
)