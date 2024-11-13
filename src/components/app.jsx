import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Chat from "./Chat.jsx";
import HomePage from "./home.jsx";
import DisclaimerPopup from "./disclaimer.jsx";

// Wrapper for DisclaimerPopup to handle navigation
const DisclaimerWrapper = () => {
  const navigate = useNavigate();
  
  const handleProceed = () => {
    // Store in session storage that user has accepted
    sessionStorage.setItem('disclaimerAccepted', 'true');
    navigate('/chat');
  };

  return <DisclaimerPopup onProceed={handleProceed} />;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const disclaimerAccepted = sessionStorage.getItem('disclaimerAccepted') === 'true';
  
  if (!disclaimerAccepted) {
    return <Navigate to="/disclaimer" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/disclaimer" element={<DisclaimerWrapper />} />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;