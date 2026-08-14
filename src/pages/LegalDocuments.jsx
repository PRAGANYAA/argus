import React, { useState } from 'react';
import { mockLegalDocs } from '../data/mockData';
import { ShieldCheck, UploadCloud, FileText, Download, Eye, Lock, CheckCircle2 } from 'lucide-react';

const LegalDocuments = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Document Request states
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestDocName, setRequestDocName] = useState('');
  const [requestReason, setRequestReason] = useState('');

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setIsVerified(true);
    }, 1500);
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!requestDocName) return;
    alert(`Your request for "${requestDocName}" has been logged! The legal team will upload it shortly.`);
    setRequestDocName('');
    setRequestReason('');
    setShowRequestModal(false);
  };

  return (
    <div className="flex flex-col gap-md">
      {/* Header section */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Legal Documents</h1>
          <p className="text-muted text-sm mt-xs">Access all case-related documents securely.</p>
        </div>
        {isVerified ? (
          <div className="badge badge-success flex items-center gap-xs" style={{ fontSize: '0.9rem', padding: '8px 16px', borderRadius: '12px' }}>
            <ShieldCheck size={18} /> Verified Access
          </div>
        ) : (
          <div className="badge badge-danger flex items-center gap-xs" style={{ fontSize: '0.9rem', padding: '8px 16px', borderRadius: '12px' }}>
            <Lock size={18} /> Locked Access
          </div>
        )}
      </div>

      {/* Main split layout */}
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Side: Document List (Blurred if not verified) */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Case Files</h3>
            {isVerified && (
              <div className="flex gap-sm">
                <input type="text" className="form-control" placeholder="Search..." style={{ width: '150px', padding: '6px 12px' }} />
              </div>
            )}
          </div>
          <div className="card-body" style={{ padding: 0, position: 'relative' }}>
            
            {/* Table */}
            <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th className="p-md text-sm font-semibold text-secondary">Document Name</th>
                  <th className="p-md text-sm font-semibold text-secondary">ID</th>
                  <th className="p-md text-sm font-semibold text-secondary">Date Added</th>
                  <th className="p-md text-sm font-semibold text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockLegalDocs.map((doc, idx) => (
                  <tr key={doc.id} style={{ borderBottom: idx === mockLegalDocs.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                    <td className={`p-md text-sm font-semibold ${!isVerified ? 'blur-text' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={16} className="text-primary" /> {doc.name}
                    </td>
                    <td className={`p-md text-sm text-muted ${!isVerified ? 'blur-text' : ''}`}>{doc.id}</td>
                    <td className={`p-md text-sm ${!isVerified ? 'blur-text' : ''}`}>{doc.date}</td>
                    <td className="p-md text-sm text-right">
                      <div className="flex justify-end gap-sm">
                        <button className="btn btn-outline" style={{ padding: '6px', borderRadius: '50%' }} disabled={!isVerified}>
                          {isVerified ? <Eye size={14} /> : <Lock size={14} className="text-muted" />}
                        </button>
                        <button className="btn btn-primary" style={{ padding: '6px', borderRadius: '50%' }} disabled={!isVerified}>
                          {isVerified ? <Download size={14} /> : <Lock size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Blurred message overlay if not verified */}
            {!isVerified && (
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(1px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                <div className="card p-md items-center text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)', maxWidth: '300px' }}>
                  <Lock size={24} className="text-primary mb-xs" />
                  <h4 className="font-semibold text-sm">Access Restricted</h4>
                  <p className="text-xs text-muted mt-xs">Verify your family credentials on the right to unlock files.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Verification / Status Area */}
        <div className="flex flex-col gap-md">
          {!isVerified ? (
            <div className="card">
              <div className="card-header bg-danger-light" style={{ backgroundColor: 'var(--danger-light)' }}>
                <h3 className="card-title" style={{ color: 'var(--danger-color)' }}><Lock size={18} /> Credentials Needed</h3>
              </div>
              <div className="card-body flex flex-col gap-md">
                <p className="text-sm text-secondary" style={{ lineHeight: '1.5' }}>
                  Please upload your <strong>Family Card</strong> or <strong>Identity Certificate</strong> to verify your relationship with the inmate and access confidential files.
                </p>
                
                <div className="flex flex-col items-center gap-sm p-lg text-center" style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--bg-color)' }}>
                  <UploadCloud size={32} className="text-muted mb-xs" />
                  <div>
                    <span className="font-semibold text-sm">Click to upload Family Card</span>
                    <p className="text-xs text-muted mt-xs">PDF, PNG, JPG up to 5MB</p>
                  </div>
                </div>

                <button 
                  className="btn btn-primary w-full" 
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? 'Verifying Card...' : 'Verify Credentials'}
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header bg-success-light" style={{ backgroundColor: 'var(--success-light)' }}>
                <h3 className="card-title text-success"><CheckCircle2 size={18} /> Verified Session</h3>
              </div>
              <div className="card-body flex flex-col gap-md">
                <div className="flex items-center gap-md p-md bg-secondary rounded" style={{ backgroundColor: 'var(--bg-color)', borderRadius: 'var(--border-radius-sm)' }}>
                  <ShieldCheck size={28} className="text-success" />
                  <div>
                    <h4 className="font-semibold text-sm">Identity Confirmed</h4>
                    <p className="text-xs text-muted">Relationship: Brother</p>
                  </div>
                </div>

                <div className="flex flex-col gap-xs mt-sm">
                  <span className="text-xs text-muted font-bold">AUDIT LOG</span>
                  <div className="text-xs text-secondary mt-xs">
                    <p>• Verified Card: <strong>FC-98234-A</strong></p>
                    <p className="mt-xs">• Session starts: <strong>Today, 12:48 PM</strong></p>
                    <p className="mt-xs">• Authorized IP: <strong>192.168.1.100</strong></p>
                  </div>
                </div>

                <button className="btn btn-outline w-full text-xs mt-sm" onClick={() => setIsVerified(false)}>
                  Revoke Authorization
                </button>
              </div>
            </div>
          )}

          {/* Document Request */}
          <div className="card bg-primary-light" style={{ backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-color)' }}>
            <div className="card-body">
              <h4 className="font-semibold text-primary mb-xs">Missing Files?</h4>
              <p className="text-xs text-secondary mb-md">Submit a formal request to the legal team for any document not listed here.</p>
              <button className="btn btn-primary text-xs w-full" onClick={() => setShowRequestModal(true)}>Request Document</button>
            </div>
          </div>
        </div>

      </div>

      {/* Document Request Modal */}
      {showRequestModal && (
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
              Request Case Document
            </h3>
            
            <form onSubmit={handleRequestSubmit} className="flex flex-col gap-md">
              <div className="form-group">
                <label className="form-label">Document Name / Type</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Charge Sheet, FIR Copy"
                  value={requestDocName}
                  onChange={(e) => setRequestDocName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reason for Request (Optional)</label>
                <textarea 
                  className="form-control" 
                  placeholder="Describe why this document is needed..."
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  rows="3"
                  style={{ resize: 'none' }}
                />
              </div>

              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => setShowRequestModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDocuments;
