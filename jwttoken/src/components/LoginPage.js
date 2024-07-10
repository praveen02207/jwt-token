import React, { useState } from 'react';
import axiosInstance from '../Service/axiossetup';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('user1');
  const [password, setPassword] = useState('password1');



 



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const { userId, accessToken, refreshToken } = response.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Login error:', error);
    }

    // window.location.href = '/dashboard';
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
