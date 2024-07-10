import axios from 'axios';
import axiosInstance from './axiossetup';

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const getValidAccessToken = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userId = localStorage.getItem('userId');
  // check userid also if want 

  if (!accessToken || !refreshToken) {
    return null;
  }

  // Check if the access token is still valid
  const tokenExpiration = parseJwt(accessToken)?.exp;
  const now = Math.floor(Date.now() / 1000);


  const remainingTimeInSeconds = tokenExpiration - now;
  const remainingTimeInMinutes = Math.max(Math.floor(remainingTimeInSeconds / 60), 0);
  console.log(`Token expires in ${remainingTimeInMinutes} minutes`);


  if (tokenExpiration && tokenExpiration > now) {
    console.log('accessToken', accessToken)
    return accessToken;
  }

  // If the access token is expired, use the refresh token to get a new access token
  try {
    console.log('try block')
    const response = await axios.post('http://localhost:5000/api/refresh-token', { refreshToken });
    const newAccessToken = response.data.accessToken;

    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('praveen', newAccessToken);
    return newAccessToken;
  } catch (error) {

    // If refreshing the token fails, log out the user
    console.log('error', error)
    logout();
    return null;
  }
};

const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};



export { getValidAccessToken, logout };
