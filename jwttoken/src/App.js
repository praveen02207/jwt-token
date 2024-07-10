import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute >
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute >
              <Clients />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
