import React, { useState } from 'react';
import { initialPrisoners } from '../../data/jailerMockData';
import { Award, FileText, Send, CheckCircle, Scale, ShieldCheck, X } from 'lucide-react';

const JailerApprovals = () => {
  const [prisoners, setPrisoners] = useState(initialPrisoners.filter(p => p.eligibilityStatus !== "Ineligible"));
  const [selectedIds, setSelectedIds] = useState([]);
  const [recommendText, setRecommendText] = useState('');
  const [urgency, setUrgency] = useState('Immediate Release Clearance');
  const [submitted, setSubmitted] = useState(false);
  const [notifText, setNotifText] = useState('');

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === prisoners.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(prisoners.map(p => p.id));
    }
  };

  const handleSubmitRecommendation = (e) => {
    e.preventDefault();
    if (selectedIds.length === 0 || !recommendText) return;

    // Update statuses locally
    setPrisoners(prev => prev.map(p => {
      if (selectedIds.includes(p.id)) {
        return {
          ...p,
          eligibilityStatus: "Recommendation Sent"
        };
      }
      return p;
    }));

    setNotifText(`Successfully submitted release recommendations for ${selectedIds.length} prisoners to the Department of Judiciary. Action recommended: ${urgency}`);
    setSubmitted(true);
    setSelectedIds([]);
    setRecommendText('');
    
    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Release Approvals</h1>
          <p className="text-muted text-sm mt-xs">Verify AI-assessed eligibility indicators and dispatch formal release/parole recommendations to the government.</p>
        </div>
      </div>

      {submitted && (
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
          {notifText}
        </div>
      )}

      {/* Split screen: Eligible list left (2 columns), Recommendation dispatch panel right (1 column) */}
      <div className="grid" style={{ gridTemplateColumns: '1.7fr 1.3fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Side: Table of eligible inmates */}
        <div className="card">
          <div className="card-header border-b flex justify-between items-center" style={{ borderBottomColor: 'var(--border-color)' }}>
            <h3 className="card-title text-sm"><ShieldCheck size={16} className="inline mr-xs text-primary" /> Prisoners Fit for Release</h3>
            <button className="btn btn-outline text-xxs" style={{ padding: '4px 8px' }} onClick={toggleSelectAll}>
              {selectedIds.length === prisoners.length ? "Deselect All" : "Select All Eligible"}
            </button>
          </div>
          
          <div className="card-body p-0">
            <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th className="p-md text-xs font-semibold text-secondary" style={{ width: '40px' }}>Select</th>
                  <th className="p-md text-xs font-semibold text-secondary">Inmate ID</th>
                  <th className="p-md text-xs font-semibold text-secondary">Name</th>
                  <th className="p-md text-xs font-semibold text-secondary">Charge</th>
                  <th className="p-md text-xs font-semibold text-secondary">Audited Term</th>
                  <th className="p-md text-xs font-semibold text-secondary">Fit Status</th>
                </tr>
              </thead>
              <tbody>
                {prisoners.map((inmate, idx) => (
                  <tr 
                    key={inmate.id} 
                    style={{ borderBottom: idx === prisoners.length - 1 ? 'none' : '1px solid var(--border-color)' }}
                    className="table-row-hover"
                  >
                    <td className="p-md" style={{ textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(inmate.id)}
                        onChange={() => toggleSelect(inmate.id)}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color)' }}
                      />
                    </td>
                    <td className="p-md text-xs font-bold text-primary">{inmate.id}</td>
                    <td className="p-md text-xs font-semibold">{inmate.name}</td>
                    <td className="p-md text-xs text-secondary">{inmate.crime}</td>
                    <td className="p-md text-xs">{inmate.timeServedMonths} / {parseInt(inmate.sentence.split(' ')[0]) * 12} Mos</td>
                    <td className="p-md text-xs">
                      <span className={`badge ${
                        inmate.eligibilityStatus.includes('Report Sent') ? 'badge-success' :
                        inmate.eligibilityStatus === 'Eligible for Release' ? 'badge-success' :
                        inmate.eligibilityStatus === 'Eligible for Parole' ? 'badge-primary' : 'badge-warning'
                      }`}>
                        {inmate.eligibilityStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Recommendation Console Form */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)' }}>
            <h3 className="card-title text-sm"><Scale size={16} className="inline mr-xs text-primary" /> Judicial Recommendation Console</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmitRecommendation} className="flex flex-col gap-md">
              
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                <span className="text-xxs font-bold text-muted uppercase block">Selected Inmates</span>
                <p className="font-semibold text-sm text-primary mt-xs">
                  {selectedIds.length === 0 ? "No prisoners selected" : `${selectedIds.length} Prisoner(s) queued`}
                </p>
                {selectedIds.length > 0 && (
                  <p className="text-xxs text-muted mt-xs">
                    {selectedIds.join(', ')}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Next Steps Recommendation</label>
                <select 
                  className="form-control"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option value="Immediate Release Clearance">Immediate Release Clearance (Served full ratio)</option>
                  <option value="Schedule Parole Board Hearing">Schedule Parole Board Hearing</option>
                  <option value="Fast-Track Bail Approval">Fast-Track Bail Approval</option>
                  <option value="DLSA Pro Bono representation assign">Assign DLSA Legal Counsel Representation</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Warden Assessment Notes</label>
                <textarea 
                  className="form-control" 
                  placeholder="State details on conduct index, program completions, and why they are fit for the selected next steps..."
                  value={recommendText}
                  onChange={(e) => setRecommendText(e.target.value)}
                  rows="5"
                  style={{ resize: 'none' }}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full mt-sm"
                disabled={selectedIds.length === 0 || !recommendText}
              >
                <Send size={16} className="mr-xs" /> Submit Recommendation Report
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JailerApprovals;
