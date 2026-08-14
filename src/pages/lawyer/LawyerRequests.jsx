import React, { useState } from 'react';
import { 
  Users, Scale, FileText, CheckCircle2, ChevronRight, Video, VideoOff, Mic, 
  MicOff, PhoneOff, AlertCircle, Coins, ShieldAlert, Award, Download, ExternalLink, Play
} from 'lucide-react';

// Mock legal consultation requests from public/family users
const mockLegalRequests = [
  {
    id: "REQ-LAW-101",
    clientName: "Prisoner 1 (Ramesh)",
    charge: "Theft / Custody (Sec 379 IPC)",
    annualIncome: 45000, // Eligible for free aid (<1.5L)
    details: "Detained for 4 months without a formal chargesheet. Seeking immediate bail petition support under Section 436A CrPC.",
    docs: [
      { name: "Arrest_Memo_INM.pdf", type: "Arrest Record" },
      { name: "DLSA_Poverty_Declaration.pdf", type: "Financial Aid Declaration" }
    ],
    status: "Pending Review"
  },
  {
    id: "REQ-LAW-102",
    clientName: "Prisoner 2 (Patil)",
    charge: "Trespassing / Custody (Sec 447 IPC)",
    annualIncome: 210000, // Charged consultation (>1.5L)
    details: "Family has filed bail application. Requesting certified attorney representation to advocate in District Court Room 3.",
    docs: [
      { name: "Property_Dispute_Brief.pdf", type: "Case Document" }
    ],
    status: "Pending Review"
  },
  {
    id: "REQ-LAW-103",
    clientName: "Prisoner 3 (Roy)",
    charge: "Reform Review / Custody (Sec 323 IPC)",
    annualIncome: 85000, // Eligible for free aid (<1.5L)
    details: "Welfare officer recommended reform evaluation. Term served exceeds 50% of maximum sanction.",
    docs: [
      { name: "Warden_Conduct_Certificate.pdf", type: "Reform Log" }
    ],
    status: "Pending Review"
  }
];

const LawyerRequests = () => {
  const [requests, setRequests] = useState(mockLegalRequests);
  const [selectedReq, setSelectedReq] = useState(mockLegalRequests[0]);
  
  // Free aid vs Billing Rate states
  const [billingRate, setBillingRate] = useState('');
  const [billingFinalized, setBillingFinalized] = useState(false);
  const [rateError, setRateError] = useState('');

  // Video Call simulator states
  const [callActive, setCallActive] = useState(false);
  const [callingState, setCallingState] = useState('idle'); // idle, ringing, connected
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);

  // Document preview simulation modal state
  const [previewDoc, setPreviewDoc] = useState(null);

  const isEligibleForFreeAid = selectedReq.annualIncome <= 150000;

  const handleSelectRequest = (req) => {
    setSelectedReq(req);
    setBillingFinalized(false);
    setBillingRate('');
    setRateError('');
    handleHangUp();
  };

  const handleFreeAidApproval = () => {
    setRequests(prev => prev.map(r => {
      if (r.id === selectedReq.id) {
        return { ...r, status: 'Cleared (Free Aid)' };
      }
      return r;
    }));
    setSelectedReq(prev => ({ ...prev, status: 'Cleared (Free Aid)' }));
    setBillingFinalized(true);
  };

  const handleChargedApproval = (e) => {
    e.preventDefault();
    if (!billingRate || parseFloat(billingRate) <= 0) {
      setRateError('Please set a valid consultation fee.');
      return;
    }
    setRequests(prev => prev.map(r => {
      if (r.id === selectedReq.id) {
        return { ...r, status: `Cleared (Invoice ₹${billingRate})` };
      }
      return r;
    }));
    setSelectedReq(prev => ({ ...prev, status: `Cleared (Invoice ₹${billingRate})` }));
    setBillingFinalized(true);
  };

  // Video call control simulations
  const handleInitiateCall = () => {
    setCallingState('ringing');
    setCallActive(true);
    setElapsedTime(0);

    setTimeout(() => {
      setCallingState('connected');
      
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
    }, 2000);
  };

  const handleHangUp = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setCallActive(false);
    setCallingState('idle');
    setElapsedTime(0);

    // Update status to Completed once call ends
    if (selectedReq.status.includes('Cleared')) {
      setRequests(prev => prev.map(r => {
        if (r.id === selectedReq.id) {
          return { ...r, status: 'Consultation Completed' };
        }
        return r;
      }));
      setSelectedReq(prev => ({ ...prev, status: 'Consultation Completed' }));
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      
      {/* Title */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Attorney Consultations Portal</h1>
          <p className="text-muted text-sm mt-xs">Review legal aid petitions, audit uploaded credentials, and conduct secure virtual lawyer client consultations.</p>
        </div>
      </div>

      {/* Main Grid: Queue, Consoles, Video panels */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Card: Requests Queue */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Users size={16} className="text-primary" /> Incoming Consultation Requests</h3>
          </div>
          <div className="card-body p-0">
            <div className="flex flex-col">
              {requests.map((req, idx) => (
                <div 
                  key={req.id}
                  onClick={() => handleSelectRequest(req)}
                  style={{
                    padding: '16px',
                    borderBottom: idx === requests.length - 1 ? 'none' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    backgroundColor: selectedReq.id === req.id ? 'var(--primary-light)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  className="table-row-hover flex justify-between items-center"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-xs text-primary">{req.clientName}</span>
                      <span className={`badge ${
                        req.status.includes('Free') ? 'badge-success' : 
                        req.status.includes('Invoice') ? 'badge-warning' : 
                        req.status.includes('Completed') ? 'badge-success' : 'badge-secondary'
                      }`} style={{ fontSize: '7.5px', padding: '1px 5px', borderRadius: '4px' }}>
                        {req.status}
                      </span>
                    </div>
                    <span className="text-xxs text-secondary block mt-xs">{req.charge}</span>
                  </div>
                  <ChevronRight size={14} className="text-muted ml-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Card: Inmate Case Auditing */}
        <div className="card" style={{ flex: 1.2 }}>
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><FileText size={16} className="text-primary" /> Petition & Document Auditing</h3>
          </div>
          <div className="card-body flex flex-col gap-md">
            
            <div>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                {selectedReq.clientName}
              </h3>
              <span className="text-xxs text-muted font-bold block uppercase mt-xs">Petition Ref: {selectedReq.id} | Case Type: {selectedReq.charge.split(' ')[0]}</span>
            </div>

            <div>
              <span className="text-xxs text-muted uppercase font-bold tracking-wider block mb-xs">Brief Description</span>
              <p className="text-xs text-secondary" style={{ lineHeight: '1.5', margin: 0 }}>
                {selectedReq.details}
              </p>
            </div>

            {/* Document attachments preview list */}
            <div>
              <span className="text-xxs text-muted uppercase font-bold tracking-wider block mb-sm">Submitted Court Registry Records</span>
              <div className="flex flex-col gap-xs">
                {selectedReq.docs.map((doc, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setPreviewDoc(doc)}
                    style={{
                      border: '1px dashed var(--border-color)',
                      padding: '8px 12px',
                      borderRadius: 'var(--border-radius-sm)',
                      cursor: 'pointer',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'between',
                      transition: 'all 0.2s'
                    }}
                    className="table-row-hover text-xxs"
                  >
                    <div>
                      <span className="font-bold text-primary block">{doc.name}</span>
                      <span className="text-muted block mt-xxs">Class: {doc.type}</span>
                    </div>
                    <ExternalLink size={12} className="text-muted" />
                  </div>
                ))}
              </div>
            </div>

            {/* Income and DLSA Free Aid Eligibility Section */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
              <div className="flex justify-between items-center mb-xs">
                <span className="text-xxs text-muted uppercase font-bold tracking-wider">Legal Aid Eligibility Index</span>
                <span className="font-bold text-xxs text-secondary">Annual Income: ₹{selectedReq.annualIncome.toLocaleString()}</span>
              </div>
              
              <div style={{
                backgroundColor: isEligibleForFreeAid ? 'var(--success-light)' : 'var(--warning-light)',
                border: isEligibleForFreeAid ? '1px solid var(--success-color)' : '1px solid var(--warning-color)',
                padding: '10px 12px',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '10px',
                color: isEligibleForFreeAid ? 'var(--success-color)' : 'var(--warning-color)',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Scale size={14} />
                {isEligibleForFreeAid 
                  ? "Eligible for Free Legal Aid (Income <= ₹1,50,000/annum)." 
                  : "Requires Charged Consultation Fee (Income > ₹1,50,000/annum)."
                }
              </div>
            </div>

            {/* Action buttons mapping Free Consultation vs Rate Setting */}
            {!billingFinalized && !selectedReq.status.includes('Completed') ? (
              <div className="flex flex-col gap-sm" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                {isEligibleForFreeAid ? (
                  <button 
                    className="btn btn-primary text-xs w-full"
                    style={{ backgroundColor: 'var(--success-color)', borderColor: 'var(--success-color)' }}
                    onClick={handleFreeAidApproval}
                  >
                    <CheckCircle2 size={14} className="mr-xs" /> Approve Free Legal Consultation
                  </button>
                ) : (
                  <form onSubmit={handleChargedApproval} className="flex gap-sm items-end">
                    <div className="form-group mb-0" style={{ flex: 1 }}>
                      <label className="text-xxs font-bold text-secondary block mb-xs">Set Legal Fee (INR)</label>
                      <input 
                        type="number" 
                        className="form-control text-xs" 
                        placeholder="₹1,500" 
                        value={billingRate}
                        onChange={(e) => { setBillingRate(e.target.value); setRateError(''); }}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary text-xs" style={{ height: '36px' }}>
                      Invoice Fee
                    </button>
                  </form>
                )}
                {rateError && <span className="text-xxs font-bold text-danger block" style={{ color: 'var(--danger-color)' }}>{rateError}</span>}
              </div>
            ) : (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                {!selectedReq.status.includes('Completed') ? (
                  <div className="text-center">
                    <span className="text-xxs text-muted block mb-sm">Consultation cleared. Proceed to secure visual link.</span>
                    <button 
                      className="btn btn-primary w-full text-xs" 
                      onClick={handleInitiateCall}
                      disabled={callActive}
                    >
                      <Video size={14} className="mr-xs" /> Initiate Secure Video Consultation
                    </button>
                  </div>
                ) : (
                  <div className="text-center font-bold text-xxs text-success" style={{ color: 'var(--success-color)', padding: '5px' }}>
                    ✔ Case Consultation Completed. Records synced with DLSA registry.
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Right Card: High-Fidelity Video Call Interface */}
        <div className="card" style={{ flex: 1.2 }}>
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Video size={16} className="text-primary" /> Secure Video Consultation Link</h3>
          </div>
          <div className="card-body flex flex-col justify-between" style={{ minHeight: '350px', padding: '15px' }}>
            
            {!callActive ? (
              <div className="flex flex-col items-center justify-center text-center gap-sm" style={{ flex: 1, minHeight: '280px' }}>
                <div style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '50%', color: 'var(--text-muted)' }}>
                  <VideoOff size={32} />
                </div>
                <div>
                  <span className="font-bold text-xs text-primary block">No Active Consultation Feed</span>
                  <p className="text-xxs text-muted block mt-xxs" style={{ maxWidth: '240px', lineHeight: '1.4' }}>
                    Select an approved case petition from the board queue and click 'Initiate secure video' to open a live encrypted legal counsel.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between" style={{ flex: 1, minHeight: '300px' }}>
                
                {/* Simulated Screen with profile / stream metrics */}
                <div style={{
                  flex: 1,
                  backgroundColor: '#1b1713',
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1.5px solid var(--border-color)'
                }}>
                  
                  {/* secure calling overlay status */}
                  <div style={{
                    position: 'absolute', top: '10px', left: '10px',
                    backgroundColor: 'rgba(0,0,0,0.6)', color: 'var(--success-color)',
                    fontSize: '8px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '8px', zIndex: 10
                  }}>
                    {callingState === 'connected' ? 'SECURE CONNECTION P2P' : 'ROUTING SECURE LINE...'}
                  </div>

                  {callingState === 'ringing' ? (
                    <div className="flex flex-col items-center justify-center text-center gap-sm text-white" style={{ animation: 'pulse 1s infinite alternate' }}>
                      <Users size={48} className="text-primary" style={{ color: 'var(--primary-color)' }} />
                      <div>
                        <span className="font-bold text-xs block">{selectedReq.clientName}</span>
                        <span className="text-xxs text-muted block mt-xxs">Connecting prison cell video dock...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center gap-md text-white">
                      
                      {/* Client Styled Profile Icon placeholder representation */}
                      <div style={{
                        width: '72px', height: '72px', borderRadius: '50%',
                        border: '3px solid var(--success-color)',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--text-primary)',
                        display: 'flex', alignItems: 'center', justify: 'center',
                        fontSize: '1.5rem', fontWeight: '800',
                        boxShadow: '0 0 15px var(--success-color)'
                      }}>
                        {selectedReq.clientName.charAt(9)}
                      </div>

                      <div>
                        <span className="font-extrabold text-sm block">{selectedReq.clientName}</span>
                        <span className="badge badge-success mt-xs" style={{ fontSize: '8px', backgroundColor: 'var(--success-color)', color: 'white' }}>
                          LIVE FEED ACTIVE
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Timer display */}
                  {callingState === 'connected' && (
                    <div style={{
                      position: 'absolute', bottom: '10px', right: '10px',
                      backgroundColor: 'rgba(0,0,0,0.6)', color: 'white',
                      fontSize: '9px', fontWeight: 'bold', padding: '3px 6px', borderRadius: '4px'
                    }}>
                      Timer: {formatTime(elapsedTime)}
                    </div>
                  )}

                </div>

                {/* Control switches row */}
                <div className="flex justify-center gap-md mt-sm" style={{ padding: '5px' }}>
                  <button 
                    onClick={() => setMicMuted(prev => !prev)}
                    style={{
                      padding: '10px', borderRadius: '50%',
                      backgroundColor: micMuted ? 'var(--danger-color)' : 'var(--bg-secondary)',
                      color: micMuted ? 'white' : 'var(--text-primary)',
                      border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    {micMuted ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>

                  <button 
                    onClick={() => setCamOff(prev => !prev)}
                    style={{
                      padding: '10px', borderRadius: '50%',
                      backgroundColor: camOff ? 'var(--danger-color)' : 'var(--bg-secondary)',
                      color: camOff ? 'white' : 'var(--text-primary)',
                      border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    {camOff ? <VideoOff size={16} /> : <Video size={16} />}
                  </button>

                  <button 
                    onClick={handleHangUp}
                    style={{
                      padding: '10px 18px', borderRadius: '24px',
                      backgroundColor: 'var(--danger-color)',
                      color: 'white', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', fontSize: '10px'
                    }}
                  >
                    <PhoneOff size={12} /> End Call
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(59, 50, 40, 0.45)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
        }}>
          <div className="card p-md flex flex-col gap-sm" style={{ width: '450px', backgroundColor: 'var(--bg-card)' }}>
            <div className="flex justify-between items-center border-b pb-xs" style={{ borderBottomColor: 'var(--border-color)' }}>
              <span className="font-bold text-xs text-primary">Auditing: {previewDoc.name}</span>
              <button 
                onClick={() => setPreviewDoc(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '900', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Mock document description display */}
            <div style={{
              backgroundColor: '#faf7f2', border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-sm)', padding: '16px', minHeight: '120px', fontSize: '11px', color: 'var(--text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                <FileText size={14} /> CERTIFIED DOCUMENT ({previewDoc.type.toUpperCase()})
              </div>
              <p style={{ margin: 0, lineHeight: '1.4' }}>
                This certified registry manifest represents mock file content for the uploaded <strong>{previewDoc.name}</strong>. In production, this view links to the secure encrypted state digital locker (DLSA Cloud).
              </p>
              <div style={{ marginTop: '12px', fontSize: '9px', color: 'var(--text-muted)' }}>
                Verification ID: VFY-${Math.floor(100000 + Math.random() * 900000)} | Status: Valid
              </div>
            </div>

            <div className="flex gap-sm justify-end mt-xs">
              <button className="btn btn-outline text-xxs" onClick={() => setPreviewDoc(null)}>Close</button>
              <button className="btn btn-primary text-xxs"><Download size={10} className="mr-xs" /> Download Document</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LawyerRequests;
