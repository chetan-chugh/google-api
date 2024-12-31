import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="664050492027-5dr06sj6tf9r8aem1m0dflam353vsutb.apps.googleusercontent.com">
    <BrowserRouter >
    <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
