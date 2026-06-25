// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* When you go to /login, show the Login component */}
        <Route path="/login" element={<Login />} />
        
        {/* Optional: Home route */}
        <Route path="/" element={<h1>Welcome Home</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;