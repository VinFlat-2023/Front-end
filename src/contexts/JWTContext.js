import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
// -------------------------------
import mockData from '../utils/mock-data';
import { getProfile, getRole } from 'src/redux/slices/user';
import { getRoles } from '@testing-library/react';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

// -------------------------------------
const profile = {
  id: mockData.id(1),
  cover: mockData.image.cover(1),
  position: 'UI Designer',
  follower: 1234,
  following: 5678,
  quote: 'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  country: mockData.address.country(1),
  email: mockData.email(1),
  company: mockData.company(1),
  school: mockData.company(2),
  role: 'Manager',
  facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
  instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
  linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
  twitterLink: `https://www.twitter.com/caitlyn.kerluke`
};
// ----------------------

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state) => ({
    ...state,
    isAuthenticated: true,
    user: profile
  }),
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state) => ({
    ...state,
    isAuthenticated: true,
    user: profile
  })
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/accounts/profile', {
            headers: {
              Authorization: 'Bearer ' + accessToken
            }
          });
          const user = response?.data?.data;
          user && localStorage.setItem('user', JSON.stringify(user));
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: {}
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (userName, password) => {
    const response = await axios.post('/auth/management/v1/login', {
      usernameOrPhoneNumber: userName,
      password
    });
    const { id, token } = response.data.data;

    setSession(token);
    window.localStorage.setItem('userId', id);
    const role = await axios.get('/employees/profile');
    window.sessionStorage.setItem('role',role.data.data.Role.RoleName);
    dispatch({
      type: 'LOGIN'
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    window.localStorage.clear();
    window.sessionStorage.clear();
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
