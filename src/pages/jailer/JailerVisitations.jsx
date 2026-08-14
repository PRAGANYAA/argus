import React, { useState } from 'react';
import { Users, Calendar, Clock, CheckCircle, XCircle, ShieldCheck, Download, Search, Video, FileText, CheckCircle2 } from 'lucide-react';

const mockVisitations = [
  {
    id: "VST-901",
    inmateName: "Ramesh Kumar (INM-1092)",
    visitorName: "Priya Kumar (Wife)",
    visitType: "Physical Mulakat (Family)",
    requestedDate: "2026-08-16",
    requestedTime: "10:30 AM",
    idProof: "Aadhaar XXXX-8912",
    status: "Pending Review",
    notes: "Regular bi-weekly family visitation requested."
  },
  {
    id: "VST-902",
    inmateName: "Suresh Patil (INM-4081)",
    visitorName: "Adv. S. Nair (Attorney)",
    visitType: "Legal Counsel Consultation",
    requestedDate: "2026-08-15",
    requestedTime: "02:00 PM",
    idProof: "Bar Council ID #BC-8910",
    status: "Approved",
    notes: "Pre-trial bail hearing strategy meeting."
  },
  {
    id: "VST-903",
    inmateName: "Vikram Roy (INM-5510)",
    visitorName: "Rajesh Roy (Brother)",
    visitType: "Virtual Mulakat (Video Dock)",
    requestedDate: "2026-08-17",
    requestedTime: "11:00 AM",
    idProof: "Voter ID #VTR-9912",
    status: "Approved",
    notes: "Virtual video dock slot allocated."
  }
];

const JailerVisitations = () => {
  const [visitations, setVisitations] = useState(mockVisitations);
  const [selectedVisit, setSelectedVisit] = useState(mockVisitations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);

  const filteredVisits = visitations.filter(v => 
    v.inmateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStatus = (id, newStatus) => {
    setVisitations(prev => prev.map(v => {
      if (v.id === id) {
        return { ...v, status: newStatus };
      }
      return v;
    }));

    if (selectedVisit.id === id) {
      setSelectedVisit(prev => ({ ...prev, status: newStatus }));
    }

    setToastMessage(`Visitation request ${id} updated to ${newStatus.toUpperCase()}!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleGenerateGatePass = (visit) => {
    setDownloadingId(visit.id);

    setTimeout(() => {
      const passContent = `
===================================================
     PRISON SECURITY CONTROL — VISITATION GATE PASS
===================================================
Pass Voucher ID   : VCH-${visit.id}
Facility          : Central Jail Facility, Wing B
Inmate Name       : ${visit.inmateName}
Authorized Visitor: ${visit.visitorName}
ID Credentials    : ${visit.idProof}
Visit Category    : ${visit.visitType}
Scheduled Slot    : ${visit.requestedDate} at ${visit.requestedTime}
Status            : AUTHORIZED (SECURITY CLEARED)
===================================================
Instructions: Present this entry voucher along with original government photo ID at Security Checkpoint 1.
      `;

      const blob = new Blob([passContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Gate_Pass_${visit.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadingId(null);
      setToastMessage(`Gate pass voucher for ${visit.visitorName} downloaded!`);
      setTimeout(() => setToastMessage(''), 4000);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Prisoner Visitation Management</h1>
          <p className="text-muted text-sm mt-xs">Audit family and legal visitation petitions, assign security slots, and generate entry passes.</p>
        </div>
      </div>

      {toastMessage && (
        <div className="toast-banner toast-success">
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* Grid: Requests List (Left) & Audit Panel (Right) */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left: Visit Requests Feed */}
        <div className="card">
          <div className="card-header border-b flex flex-col gap-xs items-start" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Users size={16} className="text-primary" /> Visitation Requests Queue</h3>
            <div className="w-full flex items-center gap-sm mt-xs">
              <Search size={14} className="text-muted" />
              <input 
                type="text" 
                className="form-control text-xs" 
                placeholder="Search visitor, inmate or pass ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '6px 12px' }}
              />
            </div>
          </div>

          <div className="card-body p-0">
            <div className="flex flex-col">
              {filteredVisits.map((visit, idx) => (
                <div 
                  key={visit.id}
                  onClick={() => setSelectedVisit(visit)}
                  style={{
                    padding: '16px',
                    borderBottom: idx === filteredVisits.length - 1 ? 'none' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    backgroundColor: selectedVisit.id === visit.id ? 'var(--primary-light)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  className="table-row-hover flex justify-between items-center"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-primary">{visit.visitorName}</span>
                      <span className={`badge ${
                        visit.status === 'Approved' ? 'badge-success' :
                        visit.status === 'Rejected' ? 'badge-danger' : 'badge-warning'
                      }`} style={{ fontSize: '8px', padding: '2px 6px' }}>
                        {visit.status}
                      </span>
                    </div>
                    <span className="text-xxs text-secondary block mt-xs">For: {visit.inmateName}</span>
                    <span className="text-xxs text-muted block mt-xxs"><Clock size={10} className="inline mr-xs" /> {visit.requestedDate} @ {visit.requestedTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Inspection Console & Action Panel */}
        <div className="card" style={{ flex: 1.3 }}>
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><ShieldCheck size={16} className="text-primary" /> Visitation Security Clearance Console</h3>
          </div>
          
          <div className="card-body flex flex-col gap-md">
            <div>
              <span className="text-xxs text-muted font-bold block uppercase">Pass Ref: {selectedVisit.id}</span>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                {selectedVisit.visitorName}
              </h3>
              <span className="badge badge-primary mt-xs" style={{ fontSize: '8px' }}>{selectedVisit.visitType}</span>
            </div>

            <div className="grid grid-cols-2 gap-sm text-xs border-y py-sm" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <span className="text-muted block text-xxs font-bold uppercase">Inmate Target</span>
                <span className="font-semibold text-primary block mt-xxs">{selectedVisit.inmateName}</span>
              </div>
              <div>
                <span className="text-muted block text-xxs font-bold uppercase">Identity Proof</span>
                <span className="font-semibold text-secondary block mt-xxs">{selectedVisit.idProof}</span>
              </div>
              <div>
                <span className="text-muted block text-xxs font-bold uppercase">Requested Date</span>
                <span className="font-semibold text-secondary block mt-xxs">{selectedVisit.requestedDate}</span>
              </div>
              <div>
                <span className="text-muted block text-xxs font-bold uppercase">Time Slot</span>
                <span className="font-semibold text-secondary block mt-xxs">{selectedVisit.requestedTime}</span>
              </div>
            </div>

            <div>
              <span className="text-xxs text-muted font-bold uppercase block mb-xs">Purpose Notes</span>
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--border-radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {selectedVisit.notes}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-sm border-t pt-md" style={{ borderTopColor: 'var(--border-color)' }}>
              {selectedVisit.status === 'Pending Review' ? (
                <div className="flex gap-sm">
                  <button 
                    className="btn btn-outline w-full text-xs" 
                    style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)' }}
                    onClick={() => handleUpdateStatus(selectedVisit.id, 'Rejected')}
                  >
                    <XCircle size={14} /> Reject Request
                  </button>
                  <button 
                    className="btn btn-primary w-full text-xs" 
                    style={{ backgroundColor: 'var(--success-color)', borderColor: 'var(--success-color)' }}
                    onClick={() => handleUpdateStatus(selectedVisit.id, 'Approved')}
                  >
                    <CheckCircle size={14} /> Approve Visitation
                  </button>
                </div>
              ) : selectedVisit.status === 'Approved' ? (
                <div className="flex flex-col gap-sm">
                  <div className="toast-banner toast-success text-center justify-center">
                    ✔ Authorized for Entrance Security Checkpoint
                  </div>
                  <button 
                    className="btn btn-primary w-full text-xs"
                    onClick={() => handleGenerateGatePass(selectedVisit)}
                    disabled={downloadingId === selectedVisit.id}
                  >
                    <Download size={14} className="mr-xs" /> 
                    {downloadingId === selectedVisit.id ? "Generating Gate Pass..." : "Download Authorized Gate Pass"}
                  </button>
                </div>
              ) : (
                <div className="toast-banner toast-danger text-center justify-center">
                  ✘ Visitation Request Denied by Warden Control
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default JailerVisitations;
