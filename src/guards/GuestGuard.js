import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD, PATH_ADMIN, PATH_SUPERVISOR } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    if (localStorage.getItem('roleName') === 'Admin') {
      return <Navigate to={PATH_ADMIN.home.dashboard} />;
    }
    if (localStorage.getItem('roleName') === 'Supervisor') {
      return <Navigate to={PATH_SUPERVISOR.root} />;
    }
  }

  return <>{children}</>;
}
