import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from './Contexts/AuthContext';

// authOnly={true}  → only logged-in users can access (default)
// authOnly={false} → only guests can access (login/register pages)
export default function Guard({ children, authOnly = true }) {
  const { token } = useContext(AuthContext);

  if (authOnly && !token) {
    return <Navigate to="/login" replace />;
  }


  if (!authOnly && token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
