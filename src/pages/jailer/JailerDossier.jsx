import React, { useState } from 'react';
import { initialPrisoners } from '../../data/jailerMockData';
import { ClipboardList, PlusCircle, Send, CheckCircle, ShieldAlert, X, Eye, FileText, UploadCloud, RefreshCw } from 'lucide-react';

const JailerDossier = () => {
  const [prisoners, setPrisoners] = useState(initialPrisoners);
  const [selectedInmate, setSelectedInmate] = useState(initialPrisoners[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newCrime, setNewCrime] = useState('');
  const [newSentence, setNewSentence] = useState('1 Year (12 Months)');
  const [newOfficer, setNewOfficer] = useState('');
  const [newBlock, setNewBlock] = useState('Block A, Cell 1');
  const [newSummary, setNewSummary] = useState('');

  const handleAddPrisoner = (e) => {
    e.preventDefault();
    if (!newName || !newCrime || !newOfficer) return;

    const newId = `INM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEntry = {
      id: newId,
      name: newName,
      crime: newCrime,
      sentence: newSentence,
      timeServedMonths: 0,
      timeServedDays: 0,
      behaviorCreditsDays: 0,
      eligibilityScore: 50,
      eligibilityStatus: "Under Review",
      arrestingOfficer: newOfficer,
      arrestDate: new Date().toISOString().split('T')[0],
      block: newBlock,
      rehabilitationDetails: "Awaiting Assignment",
      caseSummary: newSummary || "Arrest dossier processed. Subject admitted to facility. Case details under evaluation."
    };

    setPrisoners(prev => [newEntry, ...prev]);
    setSelectedInmate(newEntry);
    
    // Reset form
    setNewName('');
    setNewCrime('');
    setNewOfficer('');
    setNewBlock('Block A, Cell 1');
    setNewSummary('');
    setShowAddModal(false);
  };

  const handleGovSync = () => {
    setSyncing(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => {
        setSyncSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Prisoner Dossiers & Registry</h1>
          <p className="text-muted text-sm mt-xs">Detention history records, cell blocks allocation, and legal file cataloging.</p>
        </div>
        <div className="flex gap-sm">
          <button 
            className="btn btn-outline" 
            onClick={handleGovSync}
            disabled={syncing}
            style={{ minWidth: '180px' }}
          >
            {syncing ? (
              <>
                <RefreshCw size={16} className="spin mr-xs" /> Syncing Logs...
              </>
            ) : (
              <>
                <UploadCloud size={16} className="mr-xs" /> Update Government Portal
              </>
            )}
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <PlusCircle size={16} className="mr-xs" /> Register New Prisoner
          </button>
        </div>
      </div>

      {syncSuccess && (
        <div style={{
          backgroundColor: 'var(--success-light)',
          border: '1px solid var(--success-color)',
          color: 'var(--success-color)',
          padding: '12px 16px',
          borderRadius: 'var(--border-radius-sm)',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle size={18} />
          Warden's Monthly Inmate Dossiers and Analysis Report successfully synced with State Ministry of Justice portal!
        </div>
      )}

      {/* Split layout: Directory list left (2 columns), Selected Dossier Details right (1 column) */}
      <div className="grid" style={{ gridTemplateColumns: '1.2fr 1.8fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Side: Directory List */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)' }}>
            <h3 className="card-title text-sm">Prisoner Cell List</h3>
          </div>
          <div className="card-body p-0" style={{ maxHeight: '550px', overflowY: 'auto' }}>
            <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th className="p-md text-xs font-semibold text-secondary">Inmate ID</th>
                  <th className="p-md text-xs font-semibold text-secondary">Name</th>
                  <th className="p-md text-xs font-semibold text-secondary">Block</th>
                </tr>
              </thead>
              <tbody>
                {prisoners.map((inmate, idx) => (
                  <tr 
                    key={inmate.id} 
                    style={{ 
                      borderBottom: idx === prisoners.length - 1 ? 'none' : '1px solid var(--border-color)', 
                      cursor: 'pointer',
                      backgroundColor: selectedInmate.id === inmate.id ? 'var(--primary-light)' : 'transparent'
                    }}
                    className="table-row-hover"
                    onClick={() => setSelectedInmate(inmate)}
                  >
                    <td className="p-md text-xs font-bold text-primary">{inmate.id}</td>
                    <td className="p-md text-xs font-semibold">{inmate.name}</td>
                    <td className="p-md text-xs text-secondary">{inmate.block.split(',')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Detailed Dossier Sheet */}
        {selectedInmate && (
          <div className="card">
            <div className="card-header border-b flex justify-between items-center" style={{ borderBottomColor: 'var(--border-color)' }}>
              <div>
                <h3 className="card-title text-base" style={{ fontFamily: 'var(--font-family-serif)' }}>Official Detention Dossier</h3>
                <span className="text-xxs font-bold text-muted uppercase">Warden Registry Document ID: {selectedInmate.id}</span>
              </div>
              <span className="badge badge-primary">{selectedInmate.block}</span>
            </div>
            
            <div className="card-body flex flex-col gap-md" style={{ lineHeight: '1.5' }}>
              
              {/* Profile Overview */}
              <div className="grid grid-cols-2 gap-sm">
                <div>
                  <span className="text-xxs text-muted uppercase font-bold block">Inmate Full Name</span>
                  <span className="font-bold text-sm text-primary">{selectedInmate.name}</span>
                </div>
                <div>
                  <span className="text-xxs text-muted uppercase font-bold block">Detained Charge / Offense</span>
                  <span className="font-bold text-sm text-danger" style={{ color: 'var(--danger-color)' }}>{selectedInmate.crime}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-sm mt-xs border-b pb-sm" style={{ borderBottomColor: 'var(--border-color)' }}>
                <div>
                  <span className="text-xxs text-muted uppercase font-bold block">Sentence Length</span>
                  <span className="font-semibold text-xs text-secondary">{selectedInmate.sentence}</span>
                </div>
                <div>
                  <span className="text-xxs text-muted uppercase font-bold block">Admission Date</span>
                  <span className="font-semibold text-xs text-secondary">{selectedInmate.arrestDate}</span>
                </div>
                <div>
                  <span className="text-xxs text-muted uppercase font-bold block">Time Served</span>
                  <span className="font-semibold text-xs text-secondary">{selectedInmate.timeServedDays} Days ({selectedInmate.timeServedMonths} Mos)</span>
                </div>
              </div>

              {/* Case History Details */}
              <div>
                <span className="text-xxs text-muted uppercase font-bold block mb-xs"><FileText size={12} className="inline mr-xs" /> Detention Case Summary</span>
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--border-radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <p>{selectedInmate.caseSummary}</p>
                </div>
              </div>

              {/* Arresting metadata */}
              <div className="grid grid-cols-2 gap-sm">
                <div>
                  <span className="text-xxs text-muted uppercase font-bold block">Arresting Officer / Agency</span>
                  <span className="font-semibold text-xs text-secondary">{selectedInmate.arrestingOfficer}</span>
                </div>
                <div>
                  <span className="text-xxs text-muted uppercase font-bold block">Rehabilitation Program Status</span>
                  <span className="font-semibold text-xs text-success" style={{ color: 'var(--success-color)' }}>{selectedInmate.rehabilitationDetails}</span>
                </div>
              </div>

              {/* Behavior Logs Checklist */}
              <div className="border-t pt-sm" style={{ borderTopColor: 'var(--border-color)' }}>
                <span className="text-xxs text-muted uppercase font-bold block mb-xs">Warden Compliance Checklist</span>
                <div className="flex flex-col gap-xs mt-xs text-xs text-secondary">
                  <div className="flex items-center gap-sm">
                    <span style={{ color: selectedInmate.eligibilityStatus !== "Ineligible" ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 'bold' }}>
                      {selectedInmate.eligibilityStatus !== "Ineligible" ? "✔" : "✘"}
                    </span>
                    <span>No active severe disciplinary infractions in cell logs.</span>
                  </div>
                  <div className="flex items-center gap-sm">
                    <span style={{ color: selectedInmate.behaviorCreditsDays > 0 ? 'var(--success-color)' : 'var(--warning-color)', fontWeight: 'bold' }}>
                      {selectedInmate.behaviorCreditsDays > 0 ? "✔" : "⏳"}
                    </span>
                    <span>
                      {selectedInmate.behaviorCreditsDays > 0 
                        ? `Vocational labor quota logged (${selectedInmate.behaviorCreditsDays * 8} hrs).` 
                        : "Vocational labor hours pending quota logging."}
                    </span>
                  </div>
                  <div className="flex items-center gap-sm">
                    <span style={{ color: selectedInmate.rehabilitationDetails !== "Awaiting Assignment" ? 'var(--success-color)' : 'var(--warning-color)', fontWeight: 'bold' }}>
                      {selectedInmate.rehabilitationDetails !== "Awaiting Assignment" ? "✔" : "⏳"}
                    </span>
                    <span>Medical & rehabilitation evaluation file status: {selectedInmate.rehabilitationDetails}.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* MODAL: Register New Inmate */}
      {showAddModal && (
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
          <div className="card p-lg" style={{ width: '500px', backgroundColor: 'var(--bg-card)' }}>
            <div className="flex justify-between items-center mb-md border-b pb-xs" style={{ borderBottomColor: 'var(--border-color)' }}>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>
                Register Inmate Dossier
              </h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddPrisoner} className="flex flex-col gap-md">
              <div className="grid grid-cols-2 gap-sm">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Haris Khan"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Arresting Officer / Agency</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Inspector P. Rawat"
                    value={newOfficer}
                    onChange={(e) => setNewOfficer(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-sm">
                <div className="form-group">
                  <label className="form-label">Arrest Charge / Offense</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Theft (Under Trial)"
                    value={newCrime}
                    onChange={(e) => setNewCrime(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Sentence Duration</label>
                  <select 
                    className="form-control"
                    value={newSentence}
                    onChange={(e) => setNewSentence(e.target.value)}
                  >
                    <option value="6 Months (6 Months)">6 Months</option>
                    <option value="1 Year (12 Months)">1 Year</option>
                    <option value="2 Years (24 Months)">2 Years</option>
                    <option value="3 Years (36 Months)">3 Years</option>
                    <option value="5 Years (60 Months)">5 Years</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cell Block Allocation</label>
                <select 
                  className="form-control"
                  value={newBlock}
                  onChange={(e) => setNewBlock(e.target.value)}
                >
                  <option value="Block A, Cell 1">Block A (Standard Detention)</option>
                  <option value="Block B, Cell 4">Block B (Reformatory Wing)</option>
                  <option value="Block C, Cell 8">Block C (Vocational & Labor)</option>
                  <option value="Block D, Special Cell">Block D (High Security)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Case Summary Details</label>
                <textarea 
                  className="form-control" 
                  placeholder="Summarize arrest details and legal status..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  rows="3"
                  style={{ resize: 'none' }}
                />
              </div>

              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full">
                  Create Dossier Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default JailerDossier;
