import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import LessonModule from './components/LessonModule';

export default function App() {
  return (
    <ProgressProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/lesson/:id" element={<LessonModule />} />
          {/* Redirect any unknown route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ProgressProvider>
  );
}
