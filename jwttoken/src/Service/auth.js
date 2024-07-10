import axios from 'axios';

const login = async (username, password) => {
  try {
    const response = await axios.post('/api/login', { username, password });
    const { userId, accessToken, refreshToken } = response.data;
    
    localStorage.setItem('userId', userId);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.error('Login error:', error);
  }
};

const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

export { login, logout };
