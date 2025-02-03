// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import VerifyEmail from './components/VerifyEmail'; // Optional

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Change: Your protected route(s) should check for authentication and email verification */}
        <Route path="/" element={<h1>Home - Protected Page (Implement protected logic here)</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} /> {/* Optional route */}
      </Routes>
    </Router>
  );
};

export default App;
