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
import JailerVisitations from './pages/jailer/JailerVisitations';

// Lawyer Portal Pages
import LawyerDashboard from './pages/lawyer/LawyerDashboard';
import LawyerRequests from './pages/lawyer/LawyerRequests';
import LawyerBilling from './pages/lawyer/LawyerBilling';
import LawyerPetitions from './pages/lawyer/LawyerPetitions';
import LawyerCaseHistory from './pages/lawyer/LawyerCaseHistory';

// Government Portal Pages
import GovernmentDashboard from './pages/government/GovernmentDashboard';
import GovtRequests from './pages/government/GovtRequests';
import GovtPrisons from './pages/government/GovtPrisons';
import GovtDatabase from './pages/government/GovtDatabase';
import GovtSubscription from './pages/government/GovtSubscription';
import GovtPolicies from './pages/government/GovtPolicies';

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
          <Route path="visitations" element={<JailerVisitations />} />
          <Route path="eligibility-model" element={<JailerModelSimulator />} />
          <Route path="notifications" element={<JailerNotifications />} />
        </Route>

        {/* Lawyer Portal */}
        <Route path="/lawyer" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<LawyerDashboard />} />
          <Route path="requests" element={<LawyerRequests />} />
          <Route path="petitions" element={<LawyerPetitions />} />
          <Route path="case-history" element={<LawyerCaseHistory />} />
          <Route path="billing" element={<LawyerBilling />} />
        </Route>

        {/* Government Portal */}
        <Route path="/government" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<GovernmentDashboard />} />
          <Route path="requests" element={<GovtRequests />} />
          <Route path="policies" element={<GovtPolicies />} />
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
