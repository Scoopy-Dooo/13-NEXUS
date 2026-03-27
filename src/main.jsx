import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react';

import AuthContextProvider from './Contexts/AuthContextProvider';
import UserContextProvide from './Contexts/UserContextProvide';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvide>
      <AuthContextProvider>
        <HeroUIProvider>
          <App />
        </HeroUIProvider>
      </AuthContextProvider>
    </UserContextProvide>
  </StrictMode>
)
