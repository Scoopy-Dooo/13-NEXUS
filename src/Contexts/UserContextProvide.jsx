import { useState, useEffect } from 'react'
import { UserContext } from './UserContext'

export default function UserContextProvide({ children }) {
  const [userData, setUserData] = useState(() => {

    try {
      const stored = localStorage.getItem('userData')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }

  })

  useEffect(() => {
    console.log("🚀 ~ UserContextProvide ~ userData:", userData)
    if (userData) {

      localStorage.setItem('userData', JSON.stringify(userData))
    } else {
      localStorage.removeItem('userData')
    }
  }, [userData])

  return <>
    <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
  </>

}
