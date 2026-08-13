import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';

import Login from './features/authentication/pages/Login';
import Register from './features/authentication/pages/Register';
import ForgotPassword from './features/authentication/pages/ForgotPassword';
import ResetPassword from './features/authentication/pages/ResetPassword';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './features/authentication/components/ProtectedRoute';

import { MainLayout } from './components/layout/MainLayout';
import Dashboard from './features/dashboard/pages/Dashboard';
import { PatientList } from './features/emr/pages/PatientList';
import { PatientDetails } from './features/emr/pages/PatientDetails';
import { DoctorConsultation } from './features/doctors/pages/DoctorConsultation';
import { LaboratoryQueue } from './features/laboratory/pages/LaboratoryQueue';
import { PharmacyView } from './features/pharmacy/pages/PharmacyView';
import { BillingView } from './features/billing/pages/BillingView';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  primaryColor: 'blue',
  defaultRadius: 'md',
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={1000} />
      <Router>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Unified Hospital Protected Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/patients/:id" element={<PatientDetails />} />
              <Route path="/doctors" element={<DoctorConsultation />} />
              <Route path="/appointments" element={<Dashboard />} />
              <Route path="/laboratory" element={<LaboratoryQueue />} />
              <Route path="/pharmacy" element={<PharmacyView />} />
              <Route path="/prescriptions" element={<PharmacyView />} />
              <Route path="/billing" element={<BillingView />} />
              <Route path="/reports" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />

              {/* Role-Specific Portal Redirects */}
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/doctor/dashboard" element={<Dashboard />} />
              <Route path="/nurse/dashboard" element={<Dashboard />} />
              <Route path="/patient/dashboard" element={<Dashboard />} />
              <Route path="/pharmacy/dashboard" element={<PharmacyView />} />
              <Route path="/lab/dashboard" element={<LaboratoryQueue />} />
            </Route>
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
