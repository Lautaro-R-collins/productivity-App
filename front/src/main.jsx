import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PomodoroProvider } from './context/PomodoroContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PomodoroProvider>
        <App />
      </PomodoroProvider>
    </BrowserRouter>
  </StrictMode>,
)
