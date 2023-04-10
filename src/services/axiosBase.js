// import Cookies from 'js-cookie';
import axios from 'axios';

const baseUrl = 'https://vinflat-webapp.azurewebsites.net/api/'

export const CallAPI = (
  endpoint,
  method = 'GET',
  body = {},
  params = {},
  configHeaders = null,
  responseType = null
) => {
  let token = null;
//   token = Cookies.get(TOKEN_KEY);
  const headers = configHeaders
    ? configHeaders
    : {
        'content-type': 'application/json',
        'Bearer': token && token !== 'undefined' ? token : null
      };
  return axios({
    method,
    url: process.env.REACT_APP_API_URL + endpoint,
    headers,
    data: body,
    responseType,
    params
  });
};