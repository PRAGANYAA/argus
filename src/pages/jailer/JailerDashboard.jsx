import React, { useState } from 'react';
import { initialPrisoners, monthlyAnalytics } from '../../data/jailerMockData';
import { ClipboardList, Users, ShieldAlert, Award, FileText, CheckCircle, HelpCircle, X, Percent } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Sector } from 'recharts';

const COLORS = ['#566e58', '#8f7743', '#9e564d', '#745680', '#5b6459'];

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
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={innerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.5}
      />
    </g>
  );
};

const JailerDashboard = () => {
  const [prisoners, setPrisoners] = useState(initialPrisoners);
  const [selectedPrisoner, setSelectedPrisoner] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Chart interactivity states
  const [activePieIndex, setActivePieIndex] = useState(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const filteredPrisoners = prisoners.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.crime.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.eligibilityStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Compute metrics
  const totalInmates = prisoners.length;
  const eligibleCount = prisoners.filter(p => p.eligibilityStatus !== "Ineligible").length;
  const releaseEligibleCount = prisoners.filter(p => p.eligibilityStatus === "Eligible for Release").length;
  const avgEligibilityScore = Math.round(prisoners.reduce((acc, curr) => acc + curr.eligibilityScore, 0) / totalInmates);

  const openDetails = (prisoner) => {
    setSelectedPrisoner(prisoner);
    setShowDetailModal(true);
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      
      {/* Page Title */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Warden Dashboard</h1>
          <p className="text-muted text-sm mt-xs">AI-powered prisoner eligibility audits, monthly analysis metrics, and prison diagnostics.</p>
        </div>
      </div>

      {/* Stats row - Grid with auto-fit for responsive wrapping */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="card">
          <div className="card-body flex items-center justify-between" style={{ padding: '20px' }}>
            <div>
              <p className="text-muted text-xs font-bold uppercase tracking-wider mb-xs">Active Registry</p>
              <h2 className="h2" style={{ margin: 0 }}>{totalInmates} Inmates</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#e2e6df', borderRadius: '50%', color: '#566e58', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between" style={{ padding: '20px' }}>
            <div>
              <p className="text-muted text-xs font-bold uppercase tracking-wider mb-xs">Eligible for Review</p>
              <h2 className="h2" style={{ margin: 0 }}>{eligibleCount} Inmates</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f5eedb', borderRadius: '50%', color: '#8f7743', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between" style={{ padding: '20px' }}>
            <div>
              <p className="text-muted text-xs font-bold uppercase tracking-wider mb-xs">Ready for Release</p>
              <h2 className="h2" style={{ margin: 0 }}>{releaseEligibleCount} Inmates</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f7e8e5', borderRadius: '50%', color: '#9e564d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between" style={{ padding: '20px' }}>
            <div>
              <p className="text-muted text-xs font-bold uppercase tracking-wider mb-xs">Average Release Index</p>
              <h2 className="h2" style={{ margin: 0 }}>{avgEligibilityScore}%</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#eae5ed', borderRadius: '50%', color: '#745680', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Percent size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Section Title: Monthly Analysis Report */}
      <div className="mt-xs">
        <h2 className="h2" style={{ fontFamily: 'var(--font-family-serif)', marginBottom: '5px' }}>Monthly Analysis & Reports</h2>
        <p className="text-xs text-muted">Aggregated analytics indicating general reform statistics and inmate behavior metrics.</p>
      </div>

      {/* Grid of Analytics Charts - Auto-fits/wraps to next line if screen shrinks */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
        
        {/* Pie Chart: Eligibility Breakdown (Slices pop out on hover/touch) */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '15px 20px' }}>
            <h3 className="card-title text-sm">Eligibility Model Output</h3>
          </div>
          <div className="card-body flex flex-col items-center justify-center" style={{ height: '280px', position: 'relative', padding: '15px' }}>
            <ResponsiveContainer width="100%" height="75%">
              <PieChart>
                <Pie
                  activeIndex={activePieIndex}
                  activeShape={renderActiveShape}
                  data={monthlyAnalytics.eligibilityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActivePieIndex(index)}
                  onMouseLeave={() => setActivePieIndex(null)}
                >
                  {monthlyAnalytics.eligibilityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--border-radius-sm)', border: 'none', boxShadow: 'var(--shadow-md)', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-xs mt-sm" style={{ width: '100%' }}>
              {monthlyAnalytics.eligibilityDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-xs text-xxs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span style={{ color: activePieIndex === index ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: activePieIndex === index ? 'bold' : 'normal' }}>
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart: Crime Category Counts (Bars expand on hover/touch) */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '15px 20px' }}>
            <h3 className="card-title text-sm">Offense Classification</h3>
          </div>
          <div className="card-body" style={{ height: '280px', padding: '20px 15px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAnalytics.crimeBreakdown} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(181, 163, 142, 0.08)' }}
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--border-radius-sm)', border: 'none', boxShadow: 'var(--shadow-md)', fontSize: '11px' }}
                />
                <Bar 
                  dataKey="count" 
                  onMouseEnter={(_, index) => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {monthlyAnalytics.crimeBreakdown.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={hoveredBarIndex === index ? 'var(--primary-hover)' : 'var(--primary-color)'} 
                      style={{ 
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        transform: hoveredBarIndex === index ? 'scaleY(1.04)' : 'scaleY(1)',
                        transformOrigin: 'bottom'
                      }} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart: Behavior Score Trend (Dots expand on hover/touch) */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '15px 20px' }}>
            <h3 className="card-title text-sm">Avg Inmate Conduct Score Trend</h3>
          </div>
          <div className="card-body" style={{ height: '280px', padding: '20px 15px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAnalytics.behaviorTrend} margin={{ top: 15, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--border-radius-sm)', border: 'none', boxShadow: 'var(--shadow-md)', fontSize: '11px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgScore" 
                  name="Avg Conduct Index" 
                  stroke="#566e58" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#566e58', strokeWidth: 0 }} 
                  activeDot={{ r: 8, fill: 'var(--success-color)', stroke: '#fff', strokeWidth: 2, style: { filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' } }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Inmate Registry Table - Fixed with overflow scroll for small viewports */}
      <div className="card mt-sm">
        <div className="card-header flex justify-between items-center" style={{ borderBottom: '1px solid var(--border-color)', padding: '15px 20px' }}>
          <div>
            <h3 className="card-title">Prisoner Legal Eligibility List</h3>
            <span className="text-xxs uppercase tracking-wider font-bold text-muted block mt-xxs">Click an inmate record to inspect detailed AI predictions</span>
          </div>
          <input 
            type="text" 
            className="form-control text-xs" 
            placeholder="Search by ID, name, crime or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '260px', padding: '6px 12px' }}
          />
        </div>
        <div className="card-body p-0" style={{ padding: 0, overflowX: 'auto', width: '100%' }}>
          <table className="w-full text-left" style={{ borderCollapse: 'collapse', minWidth: '850px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th className="p-md text-sm font-semibold text-secondary">Inmate ID</th>
                <th className="p-md text-sm font-semibold text-secondary">Prisoner Name</th>
                <th className="p-md text-sm font-semibold text-secondary">Offense / Charge</th>
                <th className="p-md text-sm font-semibold text-secondary">Total Sentence</th>
                <th className="p-md text-sm font-semibold text-secondary">Time Served</th>
                <th className="p-md text-sm font-semibold text-secondary">AI Prediction Score</th>
                <th className="p-md text-sm font-semibold text-secondary">Audited Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrisoners.map((prisoner, idx) => (
                <tr 
                  key={prisoner.id} 
                  style={{ borderBottom: idx === prisoners.length - 1 ? 'none' : '1px solid var(--border-color)', cursor: 'pointer' }}
                  className="table-row-hover"
                  onClick={() => openDetails(prisoner)}
                >
                  <td className="p-md text-sm font-bold text-primary">{prisoner.id}</td>
                  <td className="p-md text-sm font-semibold">{prisoner.name}</td>
                  <td className="p-md text-sm">{prisoner.crime}</td>
                  <td className="p-md text-sm text-secondary">{prisoner.sentence}</td>
                  <td className="p-md text-sm font-semibold">{prisoner.timeServedMonths} Mos ({prisoner.timeServedDays} Days)</td>
                  <td className="p-md text-sm">
                    <div className="flex items-center gap-xs">
                      <div style={{ flex: 1, height: '6px', width: '60px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${prisoner.eligibilityScore}%`, 
                          backgroundColor: prisoner.eligibilityScore > 80 ? 'var(--success-color)' : prisoner.eligibilityScore > 60 ? 'var(--warning-color)' : 'var(--danger-color)'
                        }}></div>
                      </div>
                      <span className="font-bold text-xs">{prisoner.eligibilityScore}%</span>
                    </div>
                  </td>
                  <td className="p-md text-sm">
                    <span className={`badge ${
                      prisoner.eligibilityStatus === 'Eligible for Release' ? 'badge-success' :
                      prisoner.eligibilityStatus === 'Eligible for Parole' ? 'badge-primary' :
                      prisoner.eligibilityStatus === 'Eligible for Bail' ? 'badge-warning' :
                      prisoner.eligibilityStatus === 'Under Review' ? 'badge-accent' : 'badge-danger'
                    }`}>
                      {prisoner.eligibilityStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL: Eligibility Metrics Inspection */}
      {showDetailModal && selectedPrisoner && (
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
          <div className="card p-lg" style={{ width: '550px', backgroundColor: 'var(--bg-card)', border: 'none' }}>
            <div className="flex justify-between items-center mb-md border-b pb-sm" style={{ borderBottomColor: 'var(--border-color)' }}>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>
                Eligibility Prediction Audit: {selectedPrisoner.id}
              </h3>
              <button onClick={() => setShowDetailModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-md">
              <div className="flex justify-between items-center bg-secondary p-sm rounded" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)' }}>
                <div>
                  <span className="text-xxs uppercase tracking-wider font-bold text-muted block">Inmate Name</span>
                  <span className="font-bold text-base text-primary">{selectedPrisoner.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xxs uppercase tracking-wider font-bold text-muted block">AI Fit Index</span>
                  <span className="font-extrabold text-xl text-success" style={{ color: selectedPrisoner.eligibilityScore > 80 ? 'var(--success-color)' : selectedPrisoner.eligibilityScore > 60 ? 'var(--warning-color)' : 'var(--danger-color)' }}>
                    {selectedPrisoner.eligibilityScore}%
                  </span>
                </div>
              </div>

              {/* Progress and behavior credits info */}
              <div className="grid grid-cols-2 gap-sm text-sm">
                <div style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: 'var(--border-radius-sm)' }}>
                  <span className="text-xxs text-muted uppercase font-bold block">Sentence Completed</span>
                  <span className="font-semibold block mt-xs">{Math.round((selectedPrisoner.timeServedDays / (parseInt(selectedPrisoner.sentence.split(' ')[0]) * 365)) * 100)}%</span>
                  <span className="text-xs text-secondary mt-xs block">({selectedPrisoner.timeServedDays} / {parseInt(selectedPrisoner.sentence.split(' ')[0]) * 365} Days Served)</span>
                </div>
                <div style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: 'var(--border-radius-sm)' }}>
                  <span className="text-xxs text-muted uppercase font-bold block">Warden Behavior Credits</span>
                  <span className="font-semibold text-success block mt-xs" style={{ color: 'var(--success-color)' }}>{selectedPrisoner.behaviorCreditsDays} Days Earned</span>
                  <span className="text-xs text-secondary mt-xs block">Via prison rehabilitation works</span>
                </div>
              </div>

              {/* Factors */}
              <div>
                <span className="text-xxs text-muted uppercase font-bold block mb-xs">Decision Factors & Weights</span>
                <div className="flex flex-col gap-xs mt-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-secondary">Mandatory Min. Term Served Ratio</span>
                    <span className="font-semibold text-success" style={{ color: 'var(--success-color)' }}>Positive Weight (+45)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-secondary">Prison Conduct & Program Work Hours</span>
                    <span className="font-semibold text-success" style={{ color: 'var(--success-color)' }}>High Weight (+30)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-secondary">Nature of Offense & Gravity Checklist</span>
                    <span className="font-semibold" style={{ color: selectedPrisoner.crime === 'Financial Fraud' || selectedPrisoner.crime === 'Assault (Affray)' ? 'var(--danger-color)' : 'var(--success-color)' }}>
                      {selectedPrisoner.crime === 'Financial Fraud' || selectedPrisoner.crime === 'Assault (Affray)' ? 'Negative Weight (-25)' : 'Neutral / Non-Violent (+15)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Case details summary */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                <span className="text-xxs text-muted uppercase font-bold block mb-xs">Dossier Overview Summary</span>
                <p className="text-xs text-secondary mt-xs" style={{ lineHeight: '1.5' }}>{selectedPrisoner.caseSummary}</p>
              </div>

              <div className="flex gap-sm mt-sm">
                <button className="btn btn-primary w-full" onClick={() => setShowDetailModal(false)}>
                  Close Audit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JailerDashboard;
