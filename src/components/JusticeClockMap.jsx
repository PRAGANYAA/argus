import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ShieldAlert, CheckCircle, AlertTriangle, ArrowRight, Activity, MapPin, Eye } from 'lucide-react';

const stateData = [
  { id: 'DEL', name: 'Delhi NCR', code: 'DL', compliance: 58, status: 'Critical Surge', color: 'var(--danger-color)', lightColor: 'var(--danger-light)', inmates: 18900, capacity: 12000, undertrialsPct: 78, pendingBails: 4120, lat: '28.61', lng: '77.20', cx: 210, cy: 150 },
  { id: 'MAH', name: 'Maharashtra', code: 'MH', compliance: 92, status: 'Exemplary', color: 'var(--success-color)', lightColor: 'var(--success-light)', inmates: 14200, capacity: 16000, undertrialsPct: 42, pendingBails: 890, lat: '19.75', lng: '75.71', cx: 170, cy: 290 },
  { id: 'UP', name: 'Uttar Pradesh', code: 'UP', compliance: 46, status: 'Critical Surge', color: 'var(--danger-color)', lightColor: 'var(--danger-light)', inmates: 27500, capacity: 18000, undertrialsPct: 84, pendingBails: 6850, lat: '26.84', lng: '80.94', cx: 270, cy: 170 },
  { id: 'TN', name: 'Tamil Nadu', code: 'TN', compliance: 88, status: 'Compliant', color: 'var(--success-color)', lightColor: 'var(--success-light)', inmates: 11400, capacity: 13500, undertrialsPct: 39, pendingBails: 620, lat: '11.12', lng: '78.65', cx: 210, cy: 420 },
  { id: 'KAR', name: 'Karnataka', code: 'KA', compliance: 76, status: 'Moderate Review', color: 'var(--warning-color)', lightColor: 'var(--warning-light)', inmates: 9800, capacity: 11000, undertrialsPct: 56, pendingBails: 1450, lat: '15.31', lng: '75.71', cx: 180, cy: 370 },
  { id: 'GUJ', name: 'Gujarat', code: 'GJ', compliance: 82, status: 'Compliant', color: 'var(--success-color)', lightColor: 'var(--success-light)', inmates: 8900, capacity: 10500, undertrialsPct: 48, pendingBails: 980, lat: '22.25', lng: '71.19', cx: 120, cy: 230 },
  { id: 'WB', name: 'West Bengal', code: 'WB', compliance: 64, status: 'Moderate Review', color: 'var(--warning-color)', lightColor: 'var(--warning-light)', inmates: 12100, capacity: 13000, undertrialsPct: 62, pendingBails: 2310, lat: '22.98', lng: '87.85', cx: 360, cy: 240 },
  { id: 'KER', name: 'Kerala', code: 'KL', compliance: 95, status: 'Exemplary', color: 'var(--success-color)', lightColor: 'var(--success-light)', inmates: 4200, capacity: 5500, undertrialsPct: 29, pendingBails: 310, lat: '10.85', lng: '76.27', cx: 175, cy: 450 },
  { id: 'RAJ', name: 'Rajasthan', code: 'RJ', compliance: 71, status: 'Moderate Review', color: 'var(--warning-color)', lightColor: 'var(--warning-light)', inmates: 10500, capacity: 12000, undertrialsPct: 59, pendingBails: 1890, lat: '27.02', lng: '74.21', cx: 150, cy: 170 },
  { id: 'BIH', name: 'Bihar', code: 'BR', compliance: 52, status: 'Critical Surge', color: 'var(--danger-color)', lightColor: 'var(--danger-light)', inmates: 21300, capacity: 15000, undertrialsPct: 81, pendingBails: 5410, lat: '25.09', lng: '85.31', cx: 320, cy: 200 },
];

const JusticeClockMap = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState(stateData[0]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [clockTime, setClockTime] = useState(new Date());

  // Real-time ticking clock effect for the Justice Clock ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setClockTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredStates = stateData.filter(s => {
    if (filterStatus === 'CRITICAL') return s.compliance < 60;
    if (filterStatus === 'MODERATE') return s.compliance >= 60 && s.compliance < 80;
    if (filterStatus === 'COMPLIANT') return s.compliance >= 80;
    return true;
  });

  return (
    <div className="card w-full" style={{ border: '1px solid var(--primary-color)' }}>
      {/* Live Justice Clock Header */}
      <div className="card-header border-b flex flex-wrap justify-between items-center" style={{ borderBottomColor: 'var(--border-color)', backgroundColor: 'var(--primary-light)', padding: '16px 24px' }}>
        <div className="flex items-center gap-sm">
          <div style={{ padding: '8px', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} className="spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="flex items-center gap-xs">
              <h2 className="card-title text-primary" style={{ margin: 0, fontFamily: 'var(--font-family-serif)', fontSize: '1.2rem' }}>NATIONAL JUSTICE CLOCK</h2>
              <span className="badge badge-danger text-xxs animate-pulse" style={{ padding: '2px 8px', fontSize: '8px' }}>LIVE COMPLIANCE FEED</span>
            </div>
            <p className="text-xxs text-muted mt-xxs">Real-time state & district judicial compliance monitoring across Indian prisons & courts.</p>
          </div>
        </div>

        {/* Digital Ticker Clock */}
        <div className="flex items-center gap-md">
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '8px 16px', borderRadius: 'var(--border-radius-sm)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', textAlign: 'right' }}>
            <span className="text-xxs text-muted uppercase font-bold block">Live Audit Ticker</span>
            <span className="font-extrabold text-sm text-primary" style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>
              {clockTime.toLocaleTimeString()} IST
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-xs">
            <button 
              className={`btn text-xxs ${filterStatus === 'ALL' ? 'btn-primary' : 'btn-outline'}`} 
              style={{ padding: '4px 10px', borderRadius: '15px' }}
              onClick={() => setFilterStatus('ALL')}
            >
              All ({stateData.length})
            </button>
            <button 
              className={`btn text-xxs ${filterStatus === 'CRITICAL' ? 'btn-primary' : 'btn-outline'}`} 
              style={{ padding: '4px 10px', borderRadius: '15px', color: filterStatus !== 'CRITICAL' ? 'var(--danger-color)' : '' }}
              onClick={() => setFilterStatus('CRITICAL')}
            >
              Red (&lt;60%)
            </button>
            <button 
              className={`btn text-xxs ${filterStatus === 'MODERATE' ? 'btn-primary' : 'btn-outline'}`} 
              style={{ padding: '4px 10px', borderRadius: '15px', color: filterStatus !== 'MODERATE' ? 'var(--warning-color)' : '' }}
              onClick={() => setFilterStatus('MODERATE')}
            >
              Yellow (60-80%)
            </button>
            <button 
              className={`btn text-xxs ${filterStatus === 'COMPLIANT' ? 'btn-primary' : 'btn-outline'}`} 
              style={{ padding: '4px 10px', borderRadius: '15px', color: filterStatus !== 'COMPLIANT' ? 'var(--success-color)' : '' }}
              onClick={() => setFilterStatus('COMPLIANT')}
            >
              Green (&gt;80%)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map SVG Left (60%) & State Detail Inspector Right (40%) */}
      <div className="card-body grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', padding: '24px' }}>
        
        {/* Left Column: Interactive Vector Choropleth SVG Map of India */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)', padding: '20px', border: '1px solid var(--border-color)', position: 'relative', minHeight: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ position: 'absolute', top: '12px', left: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={14} className="text-primary" />
            <span className="text-xxs font-bold text-muted uppercase tracking-wider">Choropleth Heatmap — Click State node to inspect</span>
          </div>

          {/* SVG Map Container */}
          <div style={{ width: '100%', maxWidth: '440px', height: '340px', position: 'relative', marginTop: '20px' }}>
            <svg viewBox="0 0 440 500" style={{ width: '100%', height: '100%' }}>
              
              {/* Stylized India Land Silhouette Background Outline */}
              <path 
                d="M 180,60 L 220,50 L 260,70 L 280,100 L 320,120 L 360,170 L 390,210 L 380,250 L 340,280 L 300,310 L 260,350 L 230,420 L 210,480 L 170,430 L 160,380 L 120,320 L 90,260 L 80,210 L 110,170 L 130,130 L 160,90 Z" 
                fill="#e6ded3" 
                stroke="var(--border-color)" 
                strokeWidth="2" 
                strokeDasharray="4"
              />

              {/* Connecting Mesh Lines between Regional Legal Authorities */}
              {stateData.map((s, idx) => {
                if (idx === stateData.length - 1) return null;
                const next = stateData[idx + 1];
                return (
                  <line 
                    key={`line-${idx}`}
                    x1={s.cx} y1={s.cy}
                    x2={next.cx} y2={next.cy}
                    stroke="var(--border-color)"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                );
              })}

              {/* State Interactive Nodes */}
              {filteredStates.map((st) => {
                const isSelected = selectedState.id === st.id;
                return (
                  <g key={st.id} onClick={() => setSelectedState(st)} style={{ cursor: 'pointer' }}>
                    
                    {/* Outer Pulsing Ring for Critical / Moderate states */}
                    <circle 
                      cx={st.cx} cy={st.cy} r={isSelected ? 26 : 18}
                      fill={st.color}
                      opacity={isSelected ? "0.35" : "0.2"}
                      className="animate-ping"
                      style={{ animationDuration: st.compliance < 60 ? '1.5s' : '3s' }}
                    />

                    {/* Outer Ring */}
                    <circle 
                      cx={st.cx} cy={st.cy} r={isSelected ? 20 : 14}
                      fill={st.lightColor}
                      stroke={st.color}
                      strokeWidth={isSelected ? "3" : "2"}
                      style={{ transition: 'all 0.3s' }}
                    />

                    {/* Inner Node Circle */}
                    <circle 
                      cx={st.cx} cy={st.cy} r={isSelected ? 10 : 7}
                      fill={st.color}
                    />

                    {/* State Code Label */}
                    <text 
                      x={st.cx} y={st.cy + 4} 
                      fill="white" 
                      fontSize={isSelected ? "9px" : "7px"} 
                      fontWeight="bold" 
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {st.code}
                    </text>

                    {/* State Name Callout Text below node */}
                    <text 
                      x={st.cx} y={st.cy + (isSelected ? 30 : 24)} 
                      fill="var(--text-primary)" 
                      fontSize="9px" 
                      fontWeight={isSelected ? "bold" : "600"}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {st.name} ({st.compliance}%)
                    </text>

                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="flex gap-md justify-center items-center mt-sm border-t pt-xs w-full" style={{ borderTopColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-xs text-xxs text-secondary">
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--danger-color)', display: 'inline-block' }}></span>
              <span>Red: Critical Risk (&lt;60%)</span>
            </div>
            <div className="flex items-center gap-xs text-xxs text-secondary">
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--warning-color)', display: 'inline-block' }}></span>
              <span>Yellow: Moderate Review (60-80%)</span>
            </div>
            <div className="flex items-center gap-xs text-xxs text-secondary">
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--success-color)', display: 'inline-block' }}></span>
              <span>Green: Compliant (&gt;80%)</span>
            </div>
          </div>

        </div>

        {/* Right Column: Selected State / District Compliance Detail Inspector */}
        <div className="card p-md flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          
          <div>
            <div className="flex justify-between items-start border-b pb-sm mb-sm" style={{ borderBottomColor: 'var(--border-color)' }}>
              <div>
                <span className="text-xxs text-muted font-bold uppercase tracking-wider block">Selected Jurisdiction</span>
                <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', margin: '2px 0 0 0' }}>
                  {selectedState.name} ({selectedState.code})
                </h3>
              </div>
              <span 
                className="badge" 
                style={{ 
                  backgroundColor: selectedState.lightColor, 
                  color: selectedState.color, 
                  border: `1px solid ${selectedState.color}`,
                  fontSize: '9px', padding: '4px 10px'
                }}
              >
                {selectedState.status.toUpperCase()}
              </span>
            </div>

            {/* Metric Scorecard */}
            <div className="grid grid-cols-2 gap-sm my-md">
              
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                <span className="text-xxs text-muted uppercase font-bold block">Compliance Score</span>
                <span className="font-extrabold text-xl block mt-xs" style={{ color: selectedState.color }}>
                  {selectedState.compliance}/100
                </span>
                <span className="text-xxs text-secondary block mt-xxs">Automated Audit Index</span>
              </div>

              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                <span className="text-xxs text-muted uppercase font-bold block">Inmate Population</span>
                <span className="font-extrabold text-xl text-primary block mt-xs">
                  {selectedState.inmates.toLocaleString()}
                </span>
                <span className="text-xxs text-secondary block mt-xxs">Capacity: {selectedState.capacity.toLocaleString()}</span>
              </div>

              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                <span className="text-xxs text-muted uppercase font-bold block">Undertrial Ratio</span>
                <span className="font-extrabold text-lg text-primary block mt-xs">
                  {selectedState.undertrialsPct}%
                </span>
                <span className="text-xxs text-secondary block mt-xxs">Awaiting Charge Clearance</span>
              </div>

              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                <span className="text-xxs text-muted uppercase font-bold block">Pending Bail Pleas</span>
                <span className="font-extrabold text-lg text-danger block mt-xs" style={{ color: 'var(--danger-color)' }}>
                  {selectedState.pendingBails.toLocaleString()}
                </span>
                <span className="text-xxs text-secondary block mt-xxs">Queued in District Courts</span>
              </div>

            </div>

            {/* Diagnostic Commentary */}
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <strong className="block text-primary text-xs mb-xxs">Judicial Audit Diagnosis:</strong>
              {selectedState.compliance < 60 ? (
                <span>⚠️ Critical overcrowding & undertrial delay flagged in {selectedState.name}. Immediate release recommendation dispatch and DLSA legal aid assignment recommended under Sec 436A CrPC.</span>
              ) : selectedState.compliance < 80 ? (
                <span>⚡ Moderate compliance logged. Facilities operational with manageable caseload. Continuous monitoring active.</span>
              ) : (
                <span>✔ Exemplary judicial compliance! Undertrial release ratio exceeds target benchmarks with active vocational labor credits.</span>
              )}
            </div>
          </div>

          {/* Drill-down Button linking directly to Statewide Prisons View */}
          <div className="mt-md border-t pt-sm" style={{ borderTopColor: 'var(--border-color)' }}>
            <button 
              className="btn btn-primary w-full text-xs"
              onClick={() => navigate('/government/prisons')}
            >
              <Eye size={14} className="mr-xs" /> Drill Down to {selectedState.name} Prisons View <ArrowRight size={14} className="ml-xs" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default JusticeClockMap;
