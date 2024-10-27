import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import Material-UI theme provider
import Component from './App'; // Ensure the path to your component is correct
import './App.css'; // Import your CSS styles
import { Toaster } from 'react-hot-toast'; // Import toast notifications

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light', // You can switch this to 'dark' for dark mode
  },
});

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Toaster />
        <Component />
      </ThemeProvider>
    </React.StrictMode>
  );
}