import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react';

import AuthContextProvider from './Contexts/AuthContextProvider';
import UserContextProvide from './Contexts/UserContextProvide';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <UserContextProvide>
          <HeroUIProvider>
            <App />
          </HeroUIProvider>
        </UserContextProvide>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
