import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@material-ui/core';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.any,
  children: PropTypes.node
};

const useCurrentRole = () => {
  
  // const role = localStorage.getItem('roleName');
  const role = '';
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const currentRole = useCurrentRole();

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
