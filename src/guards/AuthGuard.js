import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import Login from '../pages/authentication/Login';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

const roleSupervisorPath = ['/dashboard/dormitory', '/dashboard/general/home']
const roleAdminPath = ['/dashboard/general/home']

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  console.log(pathname)
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  // const user = JSON.parse(localStorage.getItem('user') || '{}');
  // if (user?.Role?.RoleName === "Supervisor" && !roleSupervisorPath.includes(pathname)) {
  //   return <Navigate to='/dashboard/general/home' />
  // }
  // if (user?.Role?.RoleName === "Admin" && !roleAdminPath.includes(pathname)) {
  //   return <Navigate to='/dashboard/general/home' />
  // }
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
