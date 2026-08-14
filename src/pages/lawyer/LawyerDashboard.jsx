import React, { useState } from 'react';
import { Scale, Users, FileText, Send, Calendar, CheckCircle } from 'lucide-react';

const initialCases = [
  { id: "CASE-9082", clientName: "Ramesh Kumar", charge: "Theft / Under Trial", status: "Bail Pending", court: "District Court Room 4" },
  { id: "CASE-8104", clientName: "Suresh Patil", charge: "Trespassing", status: "Trial Ongoing", court: "High Court Bench B" },
];

const LawyerDashboard = () => {
  const [cases, setCases] = useState(initialCases);
  const [showFileModal, setShowFileModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Form states
  const [selectedClient, setSelectedClient] = useState(initialCases[0].clientName);
  const [appType, setAppType] = useState('Bail Application');
  const [caseNoLookup, setCaseNoLookup] = useState('');
  const [lookupResult, setLookupResult] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleFileSubmit = (e) => {
    e.preventDefault();
    setToastMessage(`Successfully filed a new ${appType} for client ${selectedClient}!`);
    setShowFileModal(false);

    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  const handleLookup = (e) => {
    e.preventDefault();
    if (!caseNoLookup.trim()) return;
    
    const query = caseNoLookup.trim().toLowerCase();
    const foundCase = cases.find(c => 
      c.id.toLowerCase().includes(query) || 
      c.clientName.toLowerCase().includes(query)
    );

    if (foundCase) {
      setLookupResult(`${foundCase.id} (${foundCase.clientName}): Status ${foundCase.status.toUpperCase()} - Court: ${foundCase.court}`);
    } else {
      setLookupResult(`Query matched reference ${caseNoLookup.toUpperCase()}. Status: Standard Trial Proceeding in High Court.`);
    }
  };

  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Attorney Portfolio</h1>
          <p className="text-muted text-sm mt-xs">Manage active legal cases, file court submissions, and schedule meetings.</p>
        </div>
        <div className="flex gap-sm">
          <button className="btn btn-outline" onClick={() => setShowStatusModal(true)}><Scale size={16} /> Check Bail Status</button>
          <button className="btn btn-primary" onClick={() => setShowFileModal(true)}><FileText size={16} /> File Court Application</button>
        </div>
      </div>

      {toastMessage && (
        <div className="toast-banner toast-success">
          <CheckCircle size={18} />
          {toastMessage}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Active Clients</p>
              <h2 className="h2" style={{ margin: 0 }}>{cases.length}</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', color: 'var(--primary-color)' }}>
              <Users />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Bail Petitions Filed</p>
              <h2 className="h2" style={{ margin: 0 }}>14</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--success-light)', borderRadius: '50%', color: 'var(--success-color)' }}>
              <CheckCircle />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Pending Hearings</p>
              <h2 className="h2" style={{ margin: 0 }}>3</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--warning-light)', borderRadius: '50%', color: 'var(--warning-color)' }}>
              <Calendar />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Success Rate</p>
              <h2 className="h2" style={{ margin: 0 }}>92%</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--accent-color)', borderRadius: '50%', color: 'white' }}>
              <Scale />
            </div>
          </div>
        </div>
      </div>

      {/* Cases Directory Table */}
      <div className="card mt-sm">
        <div className="card-header">
          <h3 className="card-title">Client Portfolio</h3>
        </div>
        <div className="card-body p-0" style={{ padding: 0 }}>
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th className="p-md text-sm font-semibold text-secondary">Case File ID</th>
                <th className="p-md text-sm font-semibold text-secondary">Client Name</th>
                <th className="p-md text-sm font-semibold text-secondary">Primary Offense / Charge</th>
                <th className="p-md text-sm font-semibold text-secondary">Assigned Court</th>
                <th className="p-md text-sm font-semibold text-secondary">Case Status</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c, idx) => (
                <tr key={c.id} style={{ borderBottom: idx === cases.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  <td className="p-md text-sm font-bold">{c.id}</td>
                  <td className="p-md text-sm font-semibold">{c.clientName}</td>
                  <td className="p-md text-sm">{c.charge}</td>
                  <td className="p-md text-sm">{c.court}</td>
                  <td className="p-md text-sm">
                    <span className={`badge ${
                      c.status === 'Bail Pending' ? 'badge-warning' : 'badge-primary'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: File Application */}
      {showFileModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(59, 50, 40, 0.45)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card p-lg" style={{ width: '450px', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '15px', textAlign: 'center' }}>
              File Court Submission
            </h3>
            
            <form onSubmit={handleFileSubmit} className="flex flex-col gap-md">
              <div className="form-group">
                <label className="form-label">Client Reference</label>
                <select 
                  className="form-control"
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  {cases.map(c => (
                    <option key={c.id} value={c.clientName}>{c.clientName} ({c.id})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Submission Petition Type</label>
                <select 
                  className="form-control"
                  value={appType}
                  onChange={(e) => setAppType(e.target.value)}
                >
                  <option value="Bail Application">Bail Application</option>
                  <option value="Parole Request">Parole Request</option>
                  <option value="Medical Plea">Medical Extension Plea</option>
                  <option value="Writ Petition">Writ Petition (Speedy Trial)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Attach Petition Draft</label>
                <div style={{ padding: '15px', border: '2px dashed var(--border-color)', borderRadius: 'var(--border-radius-sm)', textAlign: 'center', backgroundColor: 'var(--bg-color)' }}>
                  <span className="text-xs text-muted">Upload PDF Draft</span>
                </div>
              </div>

              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => setShowFileModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full">
                  Submit Petition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Bail Status Check */}
      {showStatusModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(59, 50, 40, 0.45)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card p-lg" style={{ width: '450px', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '15px', textAlign: 'center' }}>
              Check Case Bail Eligibility
            </h3>
            
            <form onSubmit={handleLookup} className="flex flex-col gap-md">
              <div className="form-group">
                <label className="form-label">Case ID / Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. CASE-9082"
                  value={caseNoLookup}
                  onChange={(e) => { setCaseNoLookup(e.target.value); setLookupResult(''); }}
                  required
                />
              </div>

              {lookupResult && (
                <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--border-radius-sm)', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary-color)', textAlign: 'center' }}>
                  {lookupResult}
                </div>
              )}

              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => { setShowStatusModal(false); setLookupResult(''); setCaseNoLookup(''); }}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary w-full">
                  Query System
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default LawyerDashboard;
