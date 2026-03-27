import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from './Contexts/AuthContext';

export default function Guard({ children }) {
    // const nav = useNavigate()
    const { token } = useContext(AuthContext)

    if (!token) {
        // nav("/login")
        return children
        // return <Navigate to="/login" ></Navigate>
    } else {
        return children
    }
}