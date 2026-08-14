import React, { useState } from 'react';
import { mockJudiciaryStats } from '../../data/govtMockData';
import { Database, ShieldAlert, Award, FileText, CheckCircle, Download, Network, Library, Coins, Play, RefreshCw, Layers, ShieldCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

const PIE_COLORS = ['#566e58', '#c49a6c', '#745680', '#cc786e'];

// Active shape renderer for the Pie chart (expands outer radius on hover/touch)
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8} // Grow outer radius by 8px
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.15))', transition: 'all 0.3s ease' }}
      />
    </g>
  );
};

const GovtDatabase = () => {
  // Configurable database tuning parameters
  const [stats, setStats] = useState(mockJudiciaryStats);
  const [totalCells, setTotalCells] = useState(600);
  const [totalInmates, setTotalInmates] = useState(1570);
  const [medicalCompliance, setMedicalCompliance] = useState(88);
  
  // Simulation states
  const [auditing, setAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [activePieIndex, setActivePieIndex] = useState(null);

  // Compute stats dynamically
  const cellsToInmateRatio = (totalInmates / totalCells).toFixed(1);
  const spacePerInmate = (totalCells * 11 / totalInmates).toFixed(1);
  
  // Calculate dynamic compliance score
  const spacingScore = Math.max(10, Math.min(45, Math.round((spacePerInmate / 5) * 45)));
  const staffScore = Math.max(10, Math.min(30, Math.round((medicalCompliance / 100) * 30)));
  const baseScore = spacingScore + staffScore + 25; 
  const complianceScore = Math.min(100, Math.max(0, baseScore));

  const systemCheckPassed = complianceScore >= 90;

  // Welfare budget allocation chart data (derived from inmates stats)
  const budgetData = [
    { name: 'Central Jail', value: Math.round(totalInmates * 0.01) },
    { name: 'District A', value: Math.round(totalInmates * 0.011) },
    { name: 'Sub-Jail B', value: Math.round(totalInmates * 0.005) },
    { name: 'Special C', value: Math.round(totalInmates * 0.0025) }
  ];

  const totalBudgetLakhs = budgetData.reduce((acc, curr) => acc + curr.value, 0);

  // Trigger Audit simulation
  const handleAudit = (e) => {
    e.preventDefault();
    setAuditing(true);
    setAuditComplete(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      if (current >= complianceScore) {
        setAnimatedScore(complianceScore);
        clearInterval(interval);
      } else {
        setAnimatedScore(current);
      }
    }, 30);

    setTimeout(() => {
      setAuditing(false);
      setAuditComplete(true);
      clearInterval(interval);
      setAnimatedScore(complianceScore);
    }, 1200);
  };

  // Browser CSV file downloader
  const handleDownloadCSV = () => {
    const csvRows = [
      ["Statewide Judiciary Prison Registry Report"],
      ["Generated Date", new Date().toISOString().split('T')[0]],
      [],
      ["Metric", "Value", "Target Threshold"],
      ["Total Inmate Census", totalInmates, "Cap: 1850"],
      ["Total Cells Count", totalCells, "N/A"],
      ["Cells-to-Inmate Density", `${cellsToInmateRatio} cellmates/cell`, "<2.5"],
      ["Space Per Inmate", `${spacePerInmate} sqm`, ">4.0 sqm"],
      ["Medical Staff Compliance", `${medicalCompliance}%`, ">85%"],
      ["Calculated System Compliance Score", `${complianceScore}%`, "Pass: 90%"]
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + csvRows.map(e => e.map(val => `"${val}"`).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `state_judiciary_audit_logs_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      
      {/* Title */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Judicial System Database</h1>
          <p className="text-muted text-sm mt-xs">Registry records for cells capacity, annual welfare budgets, and compliance reports.</p>
        </div>
      </div>

      {/* Grid: Stats Row */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
        <div className="card">
          <div className="card-body flex items-center justify-between" style={{ padding: '20px' }}>
            <div>
              <span className="text-xxs text-muted uppercase font-bold tracking-wider block">Total Active Cells</span>
              <h2 className="h2 mt-xs" style={{ margin: 0 }}>{totalCells} Cells</h2>
              <span className="text-xxs text-secondary block mt-xs">Ratio: {stats.spaceRatio}</span>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#e2e6df', borderRadius: '50%', color: '#566e58', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between" style={{ padding: '20px' }}>
            <div>
              <span className="text-xxs text-muted uppercase font-bold tracking-wider block">System Compliance</span>
              <h2 className="h2 mt-xs" style={{ margin: 0, color: 'var(--success-color)' }}>{stats.complianceScore}% Score</h2>
              <span className="text-xxs text-secondary block mt-xs">{stats.medicalRating}</span>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#e6edd8', borderRadius: '50%', color: 'var(--success-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between" style={{ padding: '20px' }}>
            <div>
              <span className="text-xxs text-muted uppercase font-bold tracking-wider block">Welfare Fund</span>
              <h2 className="h2 mt-xs" style={{ margin: 0 }}>{stats.welfareBudget}</h2>
              <span className="text-xxs text-secondary block mt-xs">Disbursed for rehabilitation</span>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#eae5ed', borderRadius: '50%', color: '#745680', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Tuning Sliders Left, Pictorial Pipeline Map Right */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Card: Database Tuning Sliders */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Layers size={16} className="text-primary" /> Database Tuning Parameters</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleAudit} className="flex flex-col gap-md">
              
              <div className="form-group">
                <div className="flex justify-between items-center mb-xs">
                  <label className="form-label mb-0">Total Active Cells</label>
                  <span className="font-bold text-xs text-primary">{totalCells} Cells</span>
                </div>
                <input 
                  type="range" 
                  min="400" 
                  max="1000" 
                  value={totalCells}
                  onChange={(e) => { setTotalCells(parseInt(e.target.value)); setAuditComplete(false); }}
                  style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                />
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-xs">
                  <label className="form-label mb-0">Inmate Census</label>
                  <span className="font-bold text-xs text-primary">{totalInmates} Inmates</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="2000" 
                  value={totalInmates}
                  onChange={(e) => { setTotalInmates(parseInt(e.target.value)); setAuditComplete(false); }}
                  style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                />
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-xs">
                  <label className="form-label mb-0">Medical Staff Compliance</label>
                  <span className="font-bold text-xs text-success" style={{ color: 'var(--success-color)' }}>{medicalCompliance}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  value={medicalCompliance}
                  onChange={(e) => { setMedicalCompliance(parseInt(e.target.value)); setAuditComplete(false); }}
                  style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-sm" disabled={auditing}>
                {auditing ? (
                  <>
                    <RefreshCw size={14} className="spin mr-xs" /> Performing System Audit...
                  </>
                ) : (
                  <>
                    <Play size={14} className="mr-xs" /> Run Compliance Audit
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Card: High-Fidelity Pictorial Flow Model */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Network size={16} className="text-primary" /> Pictorial Judicial Pipeline Flow</h3>
          </div>
          <div className="card-body" style={{ position: 'relative', overflowX: 'auto', padding: '24px' }}>
            
            {auditing && (
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

            {/* Visual network canvas */}
            <div style={{
              width: '560px',
              height: '330px',
              position: 'relative',
              margin: '0 auto',
              boxSizing: 'border-box'
            }}>
              
              {/* Connector Synapses */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                {/* Registries -> AI Engine */}
                <path 
                  d="M 170,42 C 210,42 210,165 240,165" 
                  stroke={auditing ? 'var(--primary-color)' : 'var(--success-color)'} 
                  strokeWidth="2.5" 
                  fill="none" 
                  className={auditing ? "flow-line" : ""}
                />
                
                {/* Cells -> AI Engine */}
                <path 
                  d="M 170,127 C 210,127 210,165 240,165" 
                  stroke={auditing ? 'var(--primary-color)' : cellsToInmateRatio <= 2.5 ? 'var(--success-color)' : 'var(--warning-color)'} 
                  strokeWidth="2.5" 
                  fill="none" 
                  className={auditing ? "flow-line" : ""}
                />
                
                {/* Medical -> AI Engine */}
                <path 
                  d="M 170,212 C 210,212 210,165 240,165" 
                  stroke={auditing ? 'var(--primary-color)' : medicalCompliance >= 85 ? 'var(--success-color)' : 'var(--danger-color)'} 
                  strokeWidth="2.5" 
                  fill="none" 
                  className={auditing ? "flow-line" : ""}
                />
                
                {/* Spacing -> AI Engine */}
                <path 
                  d="M 170,297 C 210,297 210,165 240,165" 
                  stroke={auditing ? 'var(--primary-color)' : spacePerInmate >= 4.0 ? 'var(--success-color)' : 'var(--danger-color)'} 
                  strokeWidth="2.5" 
                  fill="none" 
                  className={auditing ? "flow-line" : ""}
                />

                {/* AI Engine -> Clearance Gate */}
                <path 
                  d="M 360,165 L 410,165" 
                  stroke={auditing ? 'var(--primary-color)' : systemCheckPassed ? 'var(--success-color)' : 'var(--danger-color)'} 
                  strokeWidth="3.5" 
                  fill="none" 
                  className={auditing ? "flow-line" : ""}
                />
              </svg>

              {/* Node 1: Registries */}
              <div style={{
                position: 'absolute', left: '20px', top: '10px',
                width: '150px', height: '64px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1.5px solid var(--border-color)',
                borderRadius: '12px',
                padding: '6px 10px', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box'
              }}>
                <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inmate Census</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{totalInmates} Inmates</span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-secondary)' }}>Status: Active</span>
              </div>

              {/* Node 2: Cells */}
              <div style={{
                position: 'absolute', left: '20px', top: '95px',
                width: '150px', height: '64px',
                backgroundColor: 'var(--bg-secondary)',
                border: cellsToInmateRatio <= 2.5 ? '2.5px solid var(--success-color)' : '2.5px solid var(--warning-color)',
                borderRadius: '12px',
                padding: '6px 10px', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box'
              }}>
                <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Capacity Density</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{cellsToInmateRatio} Cellmates/Cell</span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: cellsToInmateRatio <= 2.5 ? 'var(--success-color)' : 'var(--warning-color)' }}>
                  {cellsToInmateRatio <= 2.5 ? 'Optimal' : 'Overcrowded'}
                </span>
              </div>

              {/* Node 3: Medical Compliance */}
              <div style={{
                position: 'absolute', left: '20px', top: '180px',
                width: '150px', height: '64px',
                backgroundColor: 'var(--bg-secondary)',
                border: medicalCompliance >= 85 ? '2.5px solid var(--success-color)' : '2.5px solid var(--danger-color)',
                borderRadius: '12px',
                padding: '6px 10px', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box'
              }}>
                <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Medical Staff</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{medicalCompliance}% Coverage</span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: medicalCompliance >= 85 ? 'var(--success-color)' : 'var(--danger-color)' }}>
                  {medicalCompliance >= 85 ? 'Compliant' : 'Short Staffed'}
                </span>
              </div>

              {/* Node 4: Space Rating */}
              <div style={{
                position: 'absolute', left: '20px', top: '265px',
                width: '150px', height: '64px',
                backgroundColor: 'var(--bg-secondary)',
                border: spacePerInmate >= 4.0 ? '2.5px solid var(--success-color)' : '2.5px solid var(--danger-color)',
                borderRadius: '12px',
                padding: '6px 10px', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box'
              }}>
                <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Welfare Spacing</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{spacePerInmate} sqm / Inmate</span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: spacePerInmate >= 4.0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
                  {spacePerInmate >= 4.0 ? 'Acceptable' : 'Deficient'}
                </span>
              </div>

              {/* Central Summation Node */}
              <div 
                className={auditing ? "neural-pulse" : ""}
                style={{
                  position: 'absolute', left: '240px', top: '105px',
                  width: '120px', height: '120px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '3px solid var(--primary-color)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxSizing: 'border-box', transition: 'all 0.3s'
                }}
              >
                <span style={{ fontSize: '8px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Compliance</span>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)', marginTop: '2px' }}>
                  {auditing ? animatedScore : complianceScore}%
                </span>
                <span style={{ fontSize: '8px', color: 'var(--text-secondary)' }}>State Audit</span>
              </div>

              {/* Final Seal Release Gate Node */}
              <div style={{
                position: 'absolute', left: '410px', top: '105px',
                width: '120px', height: '120px',
                borderRadius: '50%',
                backgroundColor: systemCheckPassed ? 'var(--success-light)' : 'var(--danger-light)',
                border: systemCheckPassed ? '3.5px solid var(--success-color)' : '3.5px solid var(--danger-color)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxSizing: 'border-box', transition: 'all 0.3s'
              }}>
                <span style={{ fontSize: '8px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>State Seal</span>
                <span style={{ fontSize: '14px', fontWeight: '900', color: systemCheckPassed ? 'var(--success-color)' : 'var(--danger-color)', marginTop: '4px' }}>
                  {systemCheckPassed ? "CERTIFIED" : "WARNING"}
                </span>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', marginTop: '2px' }}>Limit &gt;= 90%</span>
              </div>

            </div>

            {/* Audit complete report card */}
            {auditComplete && (
              <div style={{
                backgroundColor: systemCheckPassed ? 'var(--success-light)' : 'var(--danger-light)',
                border: systemCheckPassed ? '1px solid var(--success-color)' : '1px solid var(--danger-color)',
                borderRadius: 'var(--border-radius-md)',
                padding: '12px 15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'between',
                marginTop: '10px',
                animation: 'fadeIn 0.5s ease-out'
              }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>State Compliance Certificate</span>
                  <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.1rem', color: systemCheckPassed ? 'var(--success-color)' : 'var(--danger-color)', margin: '4px 0 0 0' }}>
                    {systemCheckPassed ? "Welfare Compliance Approved" : "Clearance Flags Refused"}
                  </h3>
                  <p style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px', margin: 0 }}>
                    Judiciary checks computed with rating of <strong>{complianceScore}%</strong>. (Density: {cellsToInmateRatio}, Space: {spacePerInmate} sqm).
                  </p>
                </div>
                <div style={{ marginLeft: '12px' }}>
                  {systemCheckPassed ? (
                    <div style={{ padding: '6px', backgroundColor: 'var(--success-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldCheck size={20} />
                    </div>
                  ) : (
                    <div style={{ padding: '6px', backgroundColor: 'var(--danger-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldAlert size={20} />
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Row 3 Layout: Budget Donut Left, Judicial Pipeline list Center, Exporter Right */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Welfare budget donut chart */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Coins size={16} className="text-primary" /> Budget Distribution</h3>
          </div>
          <div className="card-body flex justify-between items-center" style={{ height: '220px', padding: '15px' }}>
            
            {/* Visual Pie Donut Chart */}
            <div style={{ width: '50%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activePieIndex}
                    activeShape={renderActiveShape}
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={62}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActivePieIndex(index)}
                    onMouseLeave={() => setActivePieIndex(null)}
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Central text readout inside the Donut Chart hole */}
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {activePieIndex !== null ? `₹${budgetData[activePieIndex].value}L` : `₹${totalBudgetLakhs}L`}
                </span>
                <span style={{ fontSize: '6px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'center', maxWidth: '65px', marginTop: '1px' }}>
                  {activePieIndex !== null ? budgetData[activePieIndex].name.split(' ')[0] : 'Total'}
                </span>
              </div>
            </div>

            {/* Custom Pie Legend (interactive side panel) */}
            <div className="flex flex-col gap-xs justify-center" style={{ width: '48%' }}>
              {budgetData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-xs font-semibold animate-transition" 
                  style={{ 
                    fontSize: '9px', 
                    color: 'var(--text-secondary)',
                    backgroundColor: activePieIndex === index ? 'var(--bg-secondary)' : 'transparent',
                    padding: '3px 6px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setActivePieIndex(index)}
                  onMouseLeave={() => setActivePieIndex(null)}
                >
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                  <span style={{ color: activePieIndex === index ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: activePieIndex === index ? 'bold' : 'normal' }}>
                    {item.name.split(' ')[0]}: ₹{item.value}L
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Center Card: Pipeline descriptive list "like before" */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Network size={16} className="text-primary" /> Judicial Pipeline Stages</h3>
          </div>
          <div className="card-body flex flex-col gap-sm" style={{ height: '220px', padding: '15px', overflowY: 'auto' }}>
            <div className="flex flex-col gap-xs">
              <div className="flex gap-xs border-b pb-xs" style={{ borderBottomColor: 'var(--border-color)' }}>
                <span className="font-bold text-xxs text-primary" style={{ minWidth: '12px' }}>1</span>
                <div>
                  <span className="font-bold text-xxs text-primary block" style={{ fontSize: '10px' }}>Arrest Intake</span>
                  <span className="text-muted block mt-xxs" style={{ fontSize: '9px', lineHeight: '1.2' }}>Prisoner data logged from agency warrants.</span>
                </div>
              </div>

              <div className="flex gap-xs border-b py-xs" style={{ borderBottomColor: 'var(--border-color)' }}>
                <span className="font-bold text-xxs text-primary" style={{ minWidth: '12px' }}>2</span>
                <div>
                  <span className="font-bold text-xxs text-primary block" style={{ fontSize: '10px' }}>AI Predictive Scoring</span>
                  <span className="text-muted block mt-xxs" style={{ fontSize: '9px', lineHeight: '1.2' }}>Algorithms evaluate conduct reform ratings.</span>
                </div>
              </div>

              <div className="flex gap-xs border-b py-xs" style={{ borderBottomColor: 'var(--border-color)' }}>
                <span className="font-bold text-xxs text-primary" style={{ minWidth: '12px' }}>3</span>
                <div>
                  <span className="font-bold text-xxs text-primary block" style={{ fontSize: '10px' }}>Warden recommendation Board</span>
                  <span className="text-muted block mt-xxs" style={{ fontSize: '9px', lineHeight: '1.2' }}>Jailers dispatch release candidates.</span>
                </div>
              </div>

              <div className="flex gap-xs py-xs">
                <span className="font-bold text-xxs text-primary" style={{ minWidth: '12px' }}>4</span>
                <div>
                  <span className="font-bold text-xxs text-primary block" style={{ fontSize: '10px' }}>Judicial Release Seal</span>
                  <span className="text-muted block mt-xxs" style={{ fontSize: '9px', lineHeight: '1.2' }}>Government signs clearances.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Exporter console */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Library size={16} className="text-primary" /> Reports Exporter</h3>
          </div>
          <div className="card-body flex flex-col justify-center text-center" style={{ height: '220px', padding: '20px' }}>
            <p className="text-xxs text-secondary mb-sm" style={{ lineHeight: '1.4' }}>
              Export and download the fully compiled state compliance registers as a CSV spreadsheet.
            </p>
            
            <button 
              className="btn btn-primary"
              style={{ alignSelf: 'center', width: '100%' }}
              onClick={handleDownloadCSV}
            >
              <Download size={14} className="mr-xs" /> Export CSV
            </button>
            <span className="text-xxs text-muted block mt-sm">TLS 1.3 Secure Export</span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes scanner {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
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

export default GovtDatabase;
