import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';

// Family Portal Pages
import Dashboard from './pages/Dashboard';
import LegalDocuments from './pages/LegalDocuments';
import KnowYourRights from './pages/KnowYourRights';
import LawyerConnect from './pages/LawyerConnect';
import EligibilityEngine from './pages/EligibilityEngine';
import Notifications from './pages/Notifications';

// Jailer Portal Pages
import JailerDashboard from './pages/jailer/JailerDashboard';
import JailerVisitations from './pages/jailer/JailerVisitations';

// Lawyer Portal Pages
import LawyerDashboard from './pages/lawyer/LawyerDashboard';

// Government Portal Pages
import GovernmentDashboard from './pages/government/GovernmentDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Jailer Portal */}
        <Route path="/jailer" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<JailerDashboard />} />
          <Route path="visitations" element={<JailerVisitations />} />
        </Route>

        {/* Lawyer Portal */}
        <Route path="/lawyer" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<LawyerDashboard />} />
        </Route>

        {/* Government Portal */}
        <Route path="/government" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<GovernmentDashboard />} />
        </Route>

        {/* Family Portal */}
        <Route path="/family" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="legal-docs" element={<LegalDocuments />} />
          <Route path="rights" element={<KnowYourRights />} />
          <Route path="lawyer-connect" element={<LawyerConnect />} />
          <Route path="eligibility" element={<EligibilityEngine />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
