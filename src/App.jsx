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
import JailerDossier from './pages/jailer/JailerDossier';
import JailerApprovals from './pages/jailer/JailerApprovals';
import JailerNotifications from './pages/jailer/JailerNotifications';
import JailerModelSimulator from './pages/jailer/JailerModelSimulator';

// Lawyer Portal Pages
import LawyerRequests from './pages/lawyer/LawyerRequests';
import LawyerBilling from './pages/lawyer/LawyerBilling';

// Government Portal Pages
import GovtRequests from './pages/government/GovtRequests';
import GovtPrisons from './pages/government/GovtPrisons';
import GovtDatabase from './pages/government/GovtDatabase';
import GovtSubscription from './pages/government/GovtSubscription';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Jailer Portal */}
        <Route path="/jailer" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<JailerDashboard />} />
          <Route path="dossiers" element={<JailerDossier />} />
          <Route path="approvals" element={<JailerApprovals />} />
          <Route path="eligibility-model" element={<JailerModelSimulator />} />
          <Route path="notifications" element={<JailerNotifications />} />
        </Route>

        {/* Lawyer Portal */}
        <Route path="/lawyer" element={<Layout />}>
          <Route index element={<Navigate to="requests" replace />} />
          <Route path="requests" element={<LawyerRequests />} />
          <Route path="billing" element={<LawyerBilling />} />
        </Route>

        {/* Government Portal */}
        <Route path="/government" element={<Layout />}>
          <Route index element={<Navigate to="requests" replace />} />
          <Route path="requests" element={<GovtRequests />} />
          <Route path="prisons" element={<GovtPrisons />} />
          <Route path="database" element={<GovtDatabase />} />
          <Route path="subscription" element={<GovtSubscription />} />
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
