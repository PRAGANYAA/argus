import React, { useState, useEffect } from 'react';
import { Cpu, Scale, CheckCircle, AlertTriangle, Play, RefreshCw, Layers, ShieldCheck, X } from 'lucide-react';

const JailerModelSimulator = () => {
  // Input states
  const [inmateName, setInmateName] = useState('Prisoner 7');
  const [isViolent, setIsViolent] = useState(false);
  const [sentenceMonths, setSentenceMonths] = useState(36);
  const [servedMonths, setServedMonths] = useState(12);
  const [behaviorCredits, setBehaviorCredits] = useState(15);
  const [violations, setViolations] = useState(0);

  // Simulation states
  const [predicting, setPredicting] = useState(false);
  const [predictionComplete, setPredictionComplete] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [savedToDossier, setSavedToDossier] = useState(false);

  // Calculations
  const termServedRatio = Math.round((servedMonths / sentenceMonths) * 100) || 0;
  const termWeight = termServedRatio >= 33 ? 45 : Math.round((termServedRatio / 33) * 45);
  const conductWeight = Math.min(25, behaviorCredits * 1.5);
  const gravityWeight = isViolent ? -35 : 15;
  const violationWeight = violations * -20;
  
  const rawScore = termWeight + conductWeight + gravityWeight + violationWeight;
  const finalScore = Math.max(0, Math.min(100, rawScore));

  const isEligible = finalScore >= 60;
  let eligibilityVerdict = "Ineligible (Detain)";
  if (isEligible) {
    if (finalScore >= 85) eligibilityVerdict = "Eligible for Release";
    else if (finalScore >= 70) eligibilityVerdict = "Eligible for Parole";
    else eligibilityVerdict = "Eligible for Bail";
  }

  // Handle Predict trigger
  const handlePredict = (e) => {
    e.preventDefault();
    setPredicting(true);
    setPredictionComplete(false);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      if (current >= finalScore) {
        setAnimatedScore(finalScore);
        clearInterval(interval);
      } else {
        setAnimatedScore(current);
      }
    }, 30);

    setTimeout(() => {
      setPredicting(false);
      setPredictionComplete(true);
      clearInterval(interval);
      setAnimatedScore(finalScore);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>AI Eligibility Engine Simulator</h1>
          <p className="text-muted text-sm mt-xs">Model weight simulation, neural input parameters, and release recommendation projections.</p>
        </div>
      </div>

      {/* Grid wrapper */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Parameters input form (Left) */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)' }}>
            <h3 className="card-title text-sm"><Layers size={16} className="text-primary" /> Parameters Input</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handlePredict} className="flex flex-col gap-md">
              <div className="form-group">
                <label className="form-label">Inmate Name</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={inmateName}
                  onChange={(e) => { setInmateName(e.target.value); setPredictionComplete(false); }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Offense Category</label>
                <select 
                  className="form-control"
                  value={isViolent ? "violent" : "non-violent"}
                  onChange={(e) => { setIsViolent(e.target.value === "violent"); setPredictionComplete(false); }}
                >
                  <option value="non-violent">Non-Violent (Theft, Trespassing, Tax)</option>
                  <option value="violent">Violent Offense (Affray, Assault, Arson)</option>
                </select>
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-xs">
                  <label className="form-label mb-0">Total Sentence Term</label>
                  <span className="font-bold text-xs text-primary">{sentenceMonths} Months</span>
                </div>
                <input 
                  type="range" 
                  min="6" 
                  max="120" 
                  value={sentenceMonths}
                  onChange={(e) => { 
                    const newSentence = parseInt(e.target.value); 
                    setSentenceMonths(newSentence); 
                    if (servedMonths > newSentence) setServedMonths(newSentence);
                    setPredictionComplete(false); 
                  }}
                  style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                />
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-xs">
                  <label className="form-label mb-0">Time Served Term</label>
                  <span className="font-bold text-xs text-primary">{servedMonths} Months</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={sentenceMonths} 
                  value={servedMonths}
                  onChange={(e) => { setServedMonths(parseInt(e.target.value)); setPredictionComplete(false); }}
                  style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                />
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-xs">
                  <label className="form-label mb-0">Behavior Credits</label>
                  <span className="font-bold text-xs text-success" style={{ color: 'var(--success-color)' }}>{behaviorCredits} Days</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="90" 
                  value={behaviorCredits}
                  onChange={(e) => { setBehaviorCredits(parseInt(e.target.value)); setPredictionComplete(false); }}
                  style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Disciplinary Violations</label>
                <input 
                  type="number" 
                  min="0" 
                  max="10" 
                  className="form-control"
                  value={violations}
                  onChange={(e) => { setViolations(parseInt(e.target.value) || 0); setPredictionComplete(false); }}
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-sm" disabled={predicting}>
                {predicting ? (
                  <>
                    <RefreshCw size={16} className="spin mr-xs" /> Calculating Neural Nodes...
                  </>
                ) : (
                  <>
                    <Play size={16} className="mr-xs" /> Run Prediction Simulator
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Pictorial representation (Right) */}
        <div className="card" style={{ flex: 1 }}>
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)' }}>
            <h3 className="card-title text-sm"><Cpu size={16} className="text-primary" /> Pictorial Model Weights Network</h3>
          </div>
          <div className="card-body" style={{ position: 'relative', overflowX: 'auto', padding: '24px' }}>
            
            {/* Simulation scanner bar */}
            {predicting && (
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '4px',
                backgroundColor: 'var(--primary-color)',
                boxShadow: '0 0 12px var(--primary-color)',
                animation: 'scanner 1.2s infinite ease-in-out',
                zIndex: 10
              }} />
            )}

            {/* Neural Net visualizer block with fixed coordinates for 100% accurate alignment */}
            <div style={{
              width: '560px',
              height: '350px',
              position: 'relative',
              margin: '0 auto',
              boxSizing: 'border-box'
            }}>
              
              {/* SVG lines overlay */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                {/* Path 1: Term Ratio */}
                <path 
                  d="M 170,42 C 210,42 210,165 240,165" 
                  stroke={predicting ? 'var(--primary-color)' : termServedRatio >= 33 ? 'var(--success-color)' : 'var(--text-muted)'} 
                  strokeWidth="2.5" 
                  fill="none" 
                  className={predicting ? "flow-line" : ""}
                  style={{ opacity: 0.85 }}
                />
                
                {/* Path 2: Conduct Credits */}
                <path 
                  d="M 170,127 C 210,127 210,165 240,165" 
                  stroke={predicting ? 'var(--primary-color)' : behaviorCredits >= 15 ? 'var(--success-color)' : 'var(--text-muted)'} 
                  strokeWidth="2.5" 
                  fill="none" 
                  className={predicting ? "flow-line" : ""}
                  style={{ opacity: 0.85 }}
                />
                
                {/* Path 3: Offense Gravity */}
                <path 
                  d="M 170,212 C 210,212 210,165 240,165" 
                  stroke={predicting ? 'var(--primary-color)' : isViolent ? 'var(--danger-color)' : 'var(--success-color)'} 
                  strokeWidth="2.5" 
                  fill="none" 
                  className={predicting ? "flow-line" : ""}
                  style={{ opacity: 0.85 }}
                />
                
                {/* Path 4: Violations */}
                <path 
                  d="M 170,297 C 210,297 210,165 240,165" 
                  stroke={predicting ? 'var(--primary-color)' : violations > 0 ? 'var(--danger-color)' : 'var(--text-muted)'} 
                  strokeWidth="2.5" 
                  fill="none" 
                  className={predicting ? "flow-line" : ""}
                  style={{ opacity: 0.85 }}
                />
                
                {/* Path 5: Summation to Gate */}
                <path 
                  d="M 360,165 L 410,165" 
                  stroke={predicting ? 'var(--primary-color)' : isEligible ? 'var(--success-color)' : 'var(--danger-color)'} 
                  strokeWidth="3" 
                  fill="none" 
                  className={predicting ? "flow-line" : ""}
                  style={{ opacity: 0.95 }}
                />
              </svg>

              {/* Layer 1 Nodes: Input Features (Left Column) */}
              {/* Node 1: Term served ratio */}
              <div style={{
                position: 'absolute',
                left: '20px', top: '10px',
                width: '150px', height: '64px',
                backgroundColor: 'var(--bg-secondary)',
                border: termServedRatio >= 33 ? '2.5px solid var(--success-color)' : '1.5px solid var(--border-color)',
                borderRadius: '12px',
                padding: '6px 10px',
                zIndex: 2,
                boxShadow: termServedRatio >= 33 ? '0 0 10px rgba(140, 158, 120, 0.15)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}>
                <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Term Ratio</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{termServedRatio}% Served</span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: termWeight >= 40 ? 'var(--success-color)' : 'var(--text-secondary)', marginTop: '1px' }}>Weight: +{termWeight}</span>
              </div>

              {/* Node 2: Behavior Credits */}
              <div style={{
                position: 'absolute',
                left: '20px', top: '95px',
                width: '150px', height: '64px',
                backgroundColor: 'var(--bg-secondary)',
                border: behaviorCredits >= 15 ? '2.5px solid var(--success-color)' : '1.5px solid var(--border-color)',
                borderRadius: '12px',
                padding: '6px 10px',
                zIndex: 2,
                boxShadow: behaviorCredits >= 15 ? '0 0 10px rgba(140, 158, 120, 0.15)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}>
                <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Conduct Credits</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{behaviorCredits} Days</span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--success-color)', marginTop: '1px' }}>Weight: +{Math.round(conductWeight)}</span>
              </div>

              {/* Node 3: Offense Gravity */}
              <div style={{
                position: 'absolute',
                left: '20px', top: '180px',
                width: '150px', height: '64px',
                backgroundColor: 'var(--bg-secondary)',
                border: isViolent ? '2.5px solid var(--danger-color)' : '2.5px solid var(--success-color)',
                borderRadius: '12px',
                padding: '6px 10px',
                zIndex: 2,
                boxShadow: isViolent ? '0 0 10px rgba(204, 120, 110, 0.15)' : '0 0 10px rgba(140, 158, 120, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}>
                <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Offense Severity</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{isViolent ? "Violent Case" : "Non-Violent Case"}</span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: isViolent ? 'var(--danger-color)' : 'var(--success-color)', marginTop: '1px' }}>
                  Weight: {gravityWeight >= 0 ? `+${gravityWeight}` : gravityWeight}
                </span>
              </div>

              {/* Node 4: Infractions */}
              <div style={{
                position: 'absolute',
                left: '20px', top: '265px',
                width: '150px', height: '64px',
                backgroundColor: 'var(--bg-secondary)',
                border: violations > 0 ? '2.5px solid var(--danger-color)' : '1.5px solid var(--border-color)',
                borderRadius: '12px',
                padding: '6px 10px',
                zIndex: 2,
                boxShadow: violations > 0 ? '0 0 10px rgba(204, 120, 110, 0.15)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}>
                <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Disciplinary Logs</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{violations} Incidents</span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: violations > 0 ? 'var(--danger-color)' : 'var(--text-secondary)', marginTop: '1px' }}>Weight: {violationWeight}</span>
              </div>

              {/* Layer 2 Nodes: Summation & Activation (Center/Right Columns) */}
              {/* Summation center circle */}
              <div 
                className={predicting ? "neural-pulse" : ""}
                style={{
                  position: 'absolute',
                  left: '240px', top: '105px',
                  width: '120px', height: '120px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '3px solid var(--primary-color)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  boxSizing: 'border-box',
                  transition: 'all 0.3s'
                }}
              >
                <span style={{ fontSize: '8px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Summation</span>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)', marginTop: '2px' }}>
                  {predicting ? animatedScore : finalScore}
                </span>
                <span style={{ fontSize: '8px', color: 'var(--text-secondary)' }}>AI Scale Index</span>
              </div>

              {/* Threshold Release Gate circle */}
              <div style={{
                position: 'absolute',
                left: '410px', top: '105px',
                width: '120px', height: '120px',
                borderRadius: '50%',
                backgroundColor: isEligible ? 'var(--success-light)' : 'var(--danger-light)',
                border: isEligible ? '3.5px solid var(--success-color)' : '3.5px solid var(--danger-color)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}>
                <span style={{ fontSize: '8px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Release Gate</span>
                <span style={{ fontSize: '14px', fontWeight: '900', color: isEligible ? 'var(--success-color)' : 'var(--danger-color)', marginTop: '4px' }}>
                  {isEligible ? "PASSED" : "FAILED"}
                </span>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', marginTop: '2px' }}>Limit &gt;= 60</span>
              </div>

            </div>

            {/* Verdict scorecard overlay at the bottom */}
            {predictionComplete && (
              <div style={{
                backgroundColor: isEligible ? 'var(--success-light)' : 'var(--danger-light)',
                border: isEligible ? '1px solid var(--success-color)' : '1px solid var(--danger-color)',
                borderRadius: 'var(--border-radius-md)',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '15px',
                animation: 'fadeIn 0.5s ease-out'
              }}>
                <div className="flex items-center justify-between">
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI Predictive Diagnosis Report</span>
                    <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.25rem', color: isEligible ? 'var(--success-color)' : 'var(--danger-color)', margin: '4px 0 0 0' }}>
                      {inmateName} is: {eligibilityVerdict}
                    </h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
                      Decision criteria resolved with final coefficient of <strong>{finalScore}/100</strong>. Action logs dispatched.
                    </p>
                  </div>
                  <div style={{ marginLeft: '15px' }}>
                    {isEligible ? (
                      <div style={{ padding: '8px', backgroundColor: 'var(--success-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldCheck size={24} />
                      </div>
                    ) : (
                      <div style={{ padding: '8px', backgroundColor: 'var(--danger-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AlertTriangle size={24} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-xs">
                  <button 
                    type="button"
                    className="btn btn-primary text-xs"
                    onClick={() => {
                      setSavedToDossier(true);
                      setTimeout(() => setSavedToDossier(false), 4000);
                    }}
                  >
                    {savedToDossier ? "✔ Saved to Official Dossier Logs" : "Save Simulation to Inmate Dossier"}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* CSS overrides for interactive synapse flows and scanners */}
      <style>{`
        @keyframes scanner {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .neural-pulse {
          animation: pulse 0.8s infinite alternate;
        }
        @keyframes pulse {
          from { box-shadow: 0 0 5px var(--primary-color), -4px -4px 10px rgba(255,255,255,0.9); }
          to { box-shadow: 0 0 25px var(--primary-color), -4px -4px 10px rgba(255,255,255,0.9); }
        }
        .flow-line {
          stroke-dasharray: 8;
          animation: dash 1s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -16;
          }
        }
      `}</style>

    </div>
  );
};

export default JailerModelSimulator;
