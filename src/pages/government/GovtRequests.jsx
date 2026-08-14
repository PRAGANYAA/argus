import React, { useState } from 'react';
import { mockJailerRequests } from '../../data/govtMockData';
import { ShieldCheck, XCircle, FileText, CheckCircle2, ChevronRight, Award, User, RefreshCw, Scale, Sliders, ShieldAlert, Download } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const GovtRequests = () => {
  const [requests, setRequests] = useState(mockJailerRequests);
  const [selectedReq, setSelectedReq] = useState(mockJailerRequests[0]);
  const [signing, setSigning] = useState(false);
  const [signedStamp, setSignedStamp] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Dynamic simulation multipliers/weights
  const [conductWeight, setConductWeight] = useState(80);
  const [rehabWeight, setRehabWeight] = useState(75);
  const [termWeight, setTermWeight] = useState(85);

  const selectRequest = (req) => {
    setSelectedReq(req);
    setSignedStamp(null);
    setShowResetConfirm(false);
    // Reset coefficient sliders for fresh evaluation of selected request
    setConductWeight(80);
    setRehabWeight(75);
    setTermWeight(85);
  };

  // Calculate dynamic radar datasets based on request parameters and slider values
  const getRadarData = (req) => {
    // Generate distinct bases per request ID
    let conductBase = req.id === 'REQ-081' ? 90 : req.id === 'REQ-082' ? 95 : 85;
    let rehabBase = req.id === 'REQ-081' ? 82 : req.id === 'REQ-082' ? 91 : 78;
    let termBase = req.id === 'REQ-081' ? 70 : req.id === 'REQ-082' ? 88 : 92;

    // Apply interactive slider multipliers
    const finalConduct = Math.min(100, Math.round((conductBase * conductWeight) / 80));
    const finalRehab = Math.min(100, Math.round((rehabBase * rehabWeight) / 75));
    const finalTerm = Math.min(100, Math.round((termBase * termWeight) / 85));

    return [
      { subject: 'Conduct', value: finalConduct },
      { subject: 'Rehab Hours', value: finalRehab },
      { subject: 'Served Ratio', value: finalTerm },
      { subject: 'Welfare fit', value: req.id === 'REQ-082' ? 90 : 80 },
      { subject: 'Legal Fit', value: req.id === 'REQ-081' ? 92 : req.id === 'REQ-082' ? 96 : 89 }
    ];
  };

  // Calculate dynamic average suitability score based on active sliders
  const radarData = getRadarData(selectedReq);
  const rawSum = radarData.reduce((acc, curr) => acc + curr.value, 0);
  const dynamicScore = Math.round(rawSum / radarData.length);

  const handleAction = (id, newStatus) => {
    if (newStatus === 'Approved') {
      setSigning(true);
      setTimeout(() => {
        setRequests(prev => prev.map(r => {
          if (r.id === id) {
            return { ...r, status: newStatus, aiScore: dynamicScore };
          }
          return r;
        }));
        setSelectedReq(prev => ({ ...prev, status: newStatus, aiScore: dynamicScore }));
        setSignedStamp(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString());
        setSigning(false);
      }, 1500);
    } else {
      setRequests(prev => prev.map(r => {
        if (r.id === id) {
          return { ...r, status: newStatus };
        }
        return r;
      }));
      setSelectedReq(prev => ({ ...prev, status: newStatus }));
      setSignedStamp(null);
    }
  };

  // Trigger browser clearance certificate download
  const handleDownloadWarrant = () => {
    const warrantContent = `
===================================================
       GOVERNMENT OF STATE JUDICIAL DEPARTMENT
===================================================
WARRANT ID        : WRNT-${selectedReq.id}
RELEASE RECOMMEND : APPROVED
RELEASE TARGET    : ${selectedReq.inmateName}
INMATE ID         : ${selectedReq.inmateId}
DECISION STAMP    : ${signedStamp || new Date().toISOString()}
AI RATING COMPLY  : ${dynamicScore}% Fit Score
AUTHORIZATION KEY : KEY-JURY-993248-SHA
===================================================
This document serves as legal authorization for immediate
census removal and physical release of custody.
    `;

    const blob = new Blob([warrantContent], { type: 'text/plain' });
    const encodedUri = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `judicial_warrant_${selectedReq.inmateId}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      
      {/* Title */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Warden Requests & Approvals</h1>
          <p className="text-muted text-sm mt-xs">Deciding authority review portal for prisoner releases, parole recommendations, and fast-track petitions.</p>
        </div>
      </div>

      {/* Grid: Requests Queue Left, Action Console/Warrant Right */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Card: Requests Queue */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><FileText size={16} className="text-primary" /> Pending Review Board</h3>
          </div>
          <div className="card-body p-0">
            <div className="flex flex-col">
              {requests.map((req, idx) => (
                <div 
                  key={req.id}
                  onClick={() => selectRequest(req)}
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
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-xs text-primary">{req.inmateName}</span>
                      <span className={`badge ${req.status === 'Approved' ? 'badge-success' : req.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '9px', padding: '2px 6px' }}>
                        {req.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-xs">
                      <span className="text-xxs text-secondary">{req.proposalType}</span>
                      <span className="text-xxs text-muted font-bold">Argus AI score: {req.id === selectedReq.id ? dynamicScore : req.aiScore}%</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-muted ml-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Authority Action Console (Radar chart + sliders) */}
        <div className="card" style={{ flex: 1.3 }}>
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Scale size={16} className="text-primary" /> Authority Action Console</h3>
          </div>
          <div className="card-body">
            {selectedReq ? (
              <div className="flex flex-col gap-md">
                
                {/* Request Header */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                    {selectedReq.proposalType}
                  </h3>
                  <span className="text-xxs text-muted font-bold block uppercase mt-xs">Warrant Ref: {selectedReq.id} | Inmate: {selectedReq.inmateId}</span>
                </div>

                {/* Split grid: Radar Chart (Left) & Controls (Right) */}
                <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '15px', alignItems: 'center' }}>
                  
                  {/* Radar Chart */}
                  <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="var(--border-color)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 8 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 7 }} />
                        <Radar name="Suitability" dataKey="value" stroke="var(--primary-color)" fill="var(--primary-color)" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Weight range sliders simulating deciding factor tweaks */}
                  <div className="flex flex-col gap-sm" style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '15px' }}>
                    <span className="text-xxs uppercase tracking-wider font-extrabold text-muted block mb-xs flex items-center gap-xs">
                      <Sliders size={10} /> Tuning Coefficients
                    </span>

                    <div className="form-group">
                      <div className="flex justify-between items-center mb-xxs">
                        <label className="text-xxs font-bold text-secondary">Conduct weight</label>
                        <span className="text-xxs font-extrabold text-primary">{conductWeight}%</span>
                      </div>
                      <input 
                        type="range" min="40" max="100" value={conductWeight} 
                        onChange={(e) => setConductWeight(parseInt(e.target.value))} 
                        style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                      />
                    </div>

                    <div className="form-group">
                      <div className="flex justify-between items-center mb-xxs">
                        <label className="text-xxs font-bold text-secondary">Rehab weight</label>
                        <span className="text-xxs font-extrabold text-primary">{rehabWeight}%</span>
                      </div>
                      <input 
                        type="range" min="40" max="100" value={rehabWeight} 
                        onChange={(e) => setRehabWeight(parseInt(e.target.value))} 
                        style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                      />
                    </div>

                    <div className="form-group">
                      <div className="flex justify-between items-center mb-xxs">
                        <label className="text-xxs font-bold text-secondary">Served weight</label>
                        <span className="text-xxs font-extrabold text-primary">{termWeight}%</span>
                      </div>
                      <input 
                        type="range" min="40" max="100" value={termWeight} 
                        onChange={(e) => setTermWeight(parseInt(e.target.value))} 
                        style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                      />
                    </div>
                  </div>

                </div>

                {/* Score bar */}
                <div style={{ border: '1px solid var(--border-color)', padding: '12px', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="flex justify-between items-center mb-xs text-xs">
                    <span className="text-secondary font-bold">Dynamic Suitability Predictor</span>
                    <span className="font-extrabold text-success" style={{ color: dynamicScore >= 85 ? 'var(--success-color)' : 'var(--warning-color)' }}>
                      {dynamicScore}% Rating
                    </span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${dynamicScore}%`, backgroundColor: dynamicScore >= 85 ? 'var(--success-color)' : 'var(--warning-color)', transition: 'width 0.3s' }}></div>
                  </div>
                </div>

                {/* Warden notes */}
                <div style={{ borderLeft: '3px solid var(--primary-color)', paddingLeft: '12px' }}>
                  <span className="text-xxs uppercase tracking-wider font-extrabold text-muted block mb-xs">Warden Recommendation Assessment</span>
                  <p className="text-xs text-secondary" style={{ lineHeight: '1.5', margin: 0 }}>"{selectedReq.wardenNotes}"</p>
                </div>

                {/* Decision Actions / Certificates */}
                {selectedReq.status === 'Pending' ? (
                  <div className="flex gap-sm mt-sm">
                    <button
                      className="btn btn-outline flex-1 text-xs"
                      style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)' }}
                      onClick={() => handleAction(selectedReq.id, 'Rejected')}
                      disabled={signing}
                    >
                      <XCircle size={14} className="mr-xs" /> Reject Petition
                    </button>

                    <button
                      className="btn btn-primary flex-1 text-xs"
                      style={{ backgroundColor: 'var(--success-color)', borderColor: 'var(--success-color)' }}
                      onClick={() => handleAction(selectedReq.id, 'Approved')}
                      disabled={signing}
                    >
                      {signing ? (
                        <>
                          <RefreshCw size={14} className="spin mr-xs" /> Signing Warrant...
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={14} className="mr-xs" /> Approve Release
                        </>
                      )}
                    </button>
                  </div>
                ) : selectedReq.status === 'Approved' ? (
                  
                  /* Legal signed warrant certificate layout */
                  <div
                    style={{
                      border: '2px double #c49a6c',
                      padding: '20px',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: '#FAF7F2',
                      boxShadow: 'var(--shadow-sm)',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: 'fadeIn 0.5s ease-out'
                    }}
                    className="flex flex-col items-center text-center gap-xs"
                  >
                    <div style={{
                      position: 'absolute', opacity: 0.04, transform: 'rotate(-30deg)',
                      fontSize: '6rem', fontWeight: 'bold', color: 'var(--text-primary)', pointerEvents: 'none', zIndex: 0
                    }}>
                      APPROVED
                    </div>

                    <div style={{ color: '#c49a6c', zIndex: 1 }} className="mb-xs">
                      <Scale size={28} />
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '0.85rem', color: '#3b3228', textTransform: 'uppercase', letterSpacing: '1px', margin: 0, zIndex: 1 }}>
                      Ministry of Justice & Judiciary
                    </h4>
                    <span style={{ fontSize: '7px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', zIndex: 1 }}>
                      State Clearance Board Warrant
                    </span>

                    <div style={{ height: '1px', width: '80%', backgroundColor: 'var(--border-color)', margin: '8px 0', zIndex: 1 }} />

                    <p style={{ fontSize: '10px', color: 'var(--text-secondary)', lineHeight: '1.4', margin: '4px 0', zIndex: 1 }}>
                      This certifies that the petition for <strong>{selectedReq.proposalType}</strong> relating to inmate <strong>{selectedReq.inmateName}</strong> ({selectedReq.inmateId}) has been officially reviewed, certified, and cleared for release with rating of {dynamicScore}%.
                    </p>

                    <div style={{ height: '1px', width: '80%', backgroundColor: 'var(--border-color)', margin: '8px 0', zIndex: 1 }} />

                    <div style={{ zIndex: 1 }} className="flex justify-between items-center w-full px-sm mt-xs">
                      <div className="text-left">
                        <span style={{ fontSize: '7px', color: 'var(--text-muted)', display: 'block' }}>JUDICIAL TIMESTEP</span>
                        <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{signedStamp || "2026-08-14 17:30"}</span>
                      </div>
                      <div className="text-right">
                        <span style={{ fontSize: '7px', color: 'var(--text-muted)', display: 'block' }}>BOARD CERTIFICATE</span>
                        <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--success-color)', textTransform: 'uppercase' }}>✔ ISSUED & SIGNED</span>
                      </div>
                    </div>

                    <div className="flex gap-sm w-full mt-md" style={{ zIndex: 1 }}>
                      <button 
                        className="btn btn-outline text-xxs flex-1"
                        style={{ padding: '6px' }}
                        onClick={() => handleAction(selectedReq.id, 'Pending')}
                      >
                        Reset Decision Status
                      </button>
                      <button 
                        className="btn btn-primary text-xxs flex-1"
                        style={{ padding: '6px' }}
                        onClick={handleDownloadWarrant}
                      >
                        <Download size={10} className="mr-xs" /> Download Warrant
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger-color)', padding: '15px', borderRadius: 'var(--border-radius-sm)', textAlign: 'center' }}>
                    <span className="font-bold text-xs block">✘ Petition Refused & Returned</span>
                    <p style={{ fontSize: '10px', margin: '4px 0 0 0' }}>The recommendation has been denied. Warden logs have been requested to update behavioral diagnostics.</p>
                    <button
                      className="btn btn-outline text-xxs mt-sm"
                      style={{ padding: '4px 8px', borderRadius: '4px' }}
                      onClick={() => handleAction(selectedReq.id, 'Pending')}
                    >
                      Reset Decision Status
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center p-lg text-sm text-muted">
                Select a recommendation request to evaluate.
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  );
};

export default GovtRequests;
