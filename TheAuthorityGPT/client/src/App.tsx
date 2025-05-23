import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import PromptPage from './pages/PromptPage';
import DownloadsPage from './pages/DownloadsPage';
import VaultPage from './pages/VaultPage';
import OnboardingPage from './pages/OnboardingPage';
import UpgradePage from './pages/UpgradePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        
        {/* Protected routes with shared layout */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/prompts" element={<PromptPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/upgrade" element={<UpgradePage />} />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
