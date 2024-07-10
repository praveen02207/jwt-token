import React, { useEffect, useState } from 'react';
import axiosInstance from '../Service/axiossetup';

const Dashboard = () => {
  const [data, setData] = useState('');

  const fetch = async () => {
    try {
      const response = await axiosInstance.get('/dashboard');
      if (response.data.status) {
        setData(response.data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Message: {data}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
