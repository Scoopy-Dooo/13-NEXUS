import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

export default function AuthContextProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token'))
    useEffect(() => {
        // console.log('token in auth context provider : ', token);
        if (token) {
            localStorage.setItem('token', token)

        } else {
            localStorage.removeItem('token')
        }
    }, [token])


    return <AuthContext.Provider value={{ token, setToken }}>
        {children}
    </AuthContext.Provider>


}
