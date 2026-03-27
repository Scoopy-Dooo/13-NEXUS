import { useState, useEffect } from 'react'
import { UserContext } from './UserContext'

const storedUserData = localStorage.getItem('userData')


export default function UserContextProvide({ children }) {
  const [userData, setUserData] = useState(storedUserData ? JSON.parse(storedUserData) : null)




  useEffect(() => {
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
