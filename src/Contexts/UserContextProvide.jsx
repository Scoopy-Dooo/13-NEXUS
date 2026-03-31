import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserContext } from './UserContext'
import { AuthContext } from './AuthContext'
import { GetNotes, GetUnreadNotes } from '../Services/GetNOtifications'

export default function UserContextProvide({ children }) {
  const [isNote, setIsNote] = useState(false)
  const [userData, setUserData] = useState(() => {
    
    try {
      const stored = localStorage.getItem('userData')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
    
  })
  const { token } = useContext(AuthContext)
  
  const { data: notesData, isLoading: notesLoading, error: notesError } = useQuery({
    queryKey: ['notes'],
    queryFn: () => GetNotes(token),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60,
    enabled: !!token
  })

  const { data: unreadCount } = useQuery({
    queryKey: ['unreadCount'],
    queryFn: () => GetUnreadNotes(token),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 30,
    enabled: !!token
  })

  useEffect(() => {
    // console.log("🚀 ~ UserContextProvide ~ userData:", userData)
    if (userData) {

      localStorage.setItem('userData', JSON.stringify(userData))
    } else {
      localStorage.removeItem('userData')
    }
  }, [userData])

  return <>
    <UserContext.Provider value={{ userData, setUserData, isNote, setIsNote, notesData, notesLoading, notesError, unreadCount }}>{children}</UserContext.Provider>
  </>

}
