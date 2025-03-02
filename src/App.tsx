import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => {
  const localItem = localStorage.getItem('userData');
  const userData = localItem ? JSON.parse(localItem) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.token) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [userData, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

const AppWithRouter: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWithRouter;
