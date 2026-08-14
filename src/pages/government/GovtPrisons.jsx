import React, { useState } from 'react';
import { mockPrisonsList } from '../../data/govtMockData';
import { Building2, Users, ShieldAlert, Award, FileText, CheckCircle, HelpCircle, X, ChevronRight, BarChart3, Star, Layers, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line, Sector, ScatterChart, Scatter } from 'recharts';

// Theme-aligned curated color palettes matching index.css variables
const PIE_COLORS = ['#c49a6c', '#8c9e78', '#d1bdae']; // Primary, Success, Accent
const HIST_COLOR = '#c49a6c'; // Primary Color for Histogram Bars
const LINE_COLOR = '#8c9e78'; // Success Color for Compliance trend line

// Active shape renderer for the Pie chart (expands outer radius on hover/touch)
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.15))', transition: 'all 0.3s ease' }}
      />
    </g>
  );
};

const GovtPrisons = () => {
  const [prisons, setPrisons] = useState(mockPrisonsList);
  const [selectedPrison, setSelectedPrison] = useState(mockPrisonsList[0]);
  const [activePieIndex, setActivePieIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrisons = prisons.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.wardenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Highly contrasting Pie Chart Data representing completely different prisoner distributions
  const getClassificationData = (prison) => {
    switch (prison.id) {
      case 'PRIS-01': // Central Jail: Even distribution
        return [
          { name: 'Under-Trials', value: 450 },
          { name: 'Convicts', value: 320 },
          { name: 'Detainees', value: 80 }
        ];
      case 'PRIS-02': // District Jail A: Overwhelmingly Under-trials (85%)
        return [
          { name: 'Under-Trials', value: 360 },
          { name: 'Convicts', value: 40 },
          { name: 'Detainees', value: 20 }
        ];
      case 'PRIS-03': // Sub-Jail B: Overwhelmingly Convicts (70%)
        return [
          { name: 'Under-Trials', value: 30 },
          { name: 'Convicts', value: 135 },
          { name: 'Detainees', value: 15 }
        ];
      case 'PRIS-04': // Special Jail C: Overwhelmingly Detainees (65%)
        return [
          { name: 'Under-Trials', value: 20 },
          { name: 'Convicts', value: 22 },
          { name: 'Detainees', value: 78 }
        ];
      default:
        return [
          { name: 'Under-Trials', value: 100 },
          { name: 'Convicts', value: 100 },
          { name: 'Detainees', value: 100 }
        ];
    }
  };

  // Highly contrasting Histogram Data: Bars jump radically between left-loaded, uniform, and right-loaded
  const getSentenceHistogram = (prison) => {
    switch (prison.id) {
      case 'PRIS-01': // Central Jail: Normal Bell Curve
        return [
          { range: '0-2 Yrs', frequency: 120 },
          { range: '2-5 Yrs', frequency: 380 },
          { range: '5-10 Yrs', frequency: 260 },
          { range: '10+ Yrs', frequency: 90 }
        ];
      case 'PRIS-02': // District Jail A: Left-Loaded (Short-term prisoners)
        return [
          { range: '0-2 Yrs', frequency: 320 },
          { range: '2-5 Yrs', frequency: 70 },
          { range: '5-10 Yrs', frequency: 20 },
          { range: '10+ Yrs', frequency: 10 }
        ];
      case 'PRIS-03': // Sub-Jail B: Completely Uniform/Flat Distribution
        return [
          { range: '0-2 Yrs', frequency: 45 },
          { range: '2-5 Yrs', frequency: 47 },
          { range: '5-10 Yrs', frequency: 44 },
          { range: '10+ Yrs', frequency: 44 }
        ];
      case 'PRIS-04': // Special Jail C: Right-Loaded (Long-term Detainees)
        return [
          { range: '0-2 Yrs', frequency: 10 },
          { range: '2-5 Yrs', frequency: 15 },
          { range: '5-10 Yrs', frequency: 25 },
          { range: '10+ Yrs', frequency: 70 }
        ];
      default:
        return [];
    }
  };

  // Highly contrasting Line Chart Curves
  const getComplianceTrend = (prison) => {
    switch (prison.id) {
      case 'PRIS-01': // Central Jail: High & Steady
        return [
          { month: 'Jan', compliance: 92 },
          { month: 'Feb', compliance: 93 },
          { month: 'Mar', compliance: 92 },
          { month: 'Apr', compliance: 94 },
          { month: 'May', compliance: 95 }
        ];
      case 'PRIS-02': // District Jail A: Volatile drop then recovery
        return [
          { month: 'Jan', compliance: 88 },
          { month: 'Feb', compliance: 75 },
          { month: 'Mar', compliance: 82 },
          { month: 'Apr', compliance: 85 },
          { month: 'May', compliance: 89 }
        ];
      case 'PRIS-03': // Sub-Jail B: Steep climb upward
        return [
          { month: 'Jan', compliance: 78 },
          { month: 'Feb', compliance: 82 },
          { month: 'Mar', compliance: 87 },
          { month: 'Apr', compliance: 93 },
          { month: 'May', compliance: 98 }
        ];
      case 'PRIS-04': // Special Jail C: Rapid zig-zag fluctuation
        return [
          { month: 'Jan', compliance: 94 },
          { month: 'Feb', compliance: 82 },
          { month: 'Mar', compliance: 96 },
          { month: 'Apr', compliance: 84 },
          { month: 'May', compliance: 98 }
        ];
      default:
        return [];
    }
  };

  // Dynamic Scatter Plot data correlating Staff Strength (X) to incident rate (Y) across jails
  const scatterData = prisons.map(p => ({
    x: p.staffCount,
    y: p.incidentCount,
    name: p.name.split(',')[0]
  }));

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      
      {/* Title */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Statewide Prisons Directory</h1>
          <p className="text-muted text-sm mt-xs">Inspect occupancy metrics, correlation matrices, and compliance indicators across state detention facilities.</p>
        </div>
      </div>

      {/* Grid: Jails List Left, Analytics Console Right */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Card: Prisons List */}
        <div className="card">
          <div className="card-header border-b flex flex-col gap-xs items-start" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Building2 size={16} className="text-primary" /> Active Facilities ({filteredPrisons.length})</h3>
            <input 
              type="text" 
              className="form-control text-xs mt-xs" 
              placeholder="Search by prison name or warden..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '6px 12px' }}
            />
          </div>
          <div className="card-body p-0">
            <div className="flex flex-col">
              {filteredPrisons.map((prison, idx) => (
                <div 
                  key={prison.id}
                  onClick={() => setSelectedPrison(prison)}
                  style={{
                    padding: '16px',
                    borderBottom: idx === filteredPrisons.length - 1 ? 'none' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    backgroundColor: selectedPrison.id === prison.id ? 'var(--primary-light)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  className="table-row-hover flex justify-between items-center"
                >
                  <div>
                    <span className="font-semibold text-xs text-primary block">{prison.name}</span>
                    <span className="text-xxs text-secondary block mt-xs">Warden: {prison.wardenName}</span>
                    <span className="text-xxs text-muted block mt-xs">Occupancy: {prison.occupancy} / {prison.capacity} Inmates</span>
                  </div>
                  <ChevronRight size={14} className="text-muted" />
                </div>
              ))}
              {filteredPrisons.length === 0 && (
                <div className="p-md text-xs text-muted text-center">No matching facilities found.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Card: Multi-Chart Diagnostics Grid */}
        <div className="card" style={{ flex: 1.3 }}>
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><BarChart3 size={16} className="text-primary" /> {selectedPrison.name} Diagnostics Dashboard</h3>
          </div>
          <div className="card-body flex flex-col gap-md">
            
            {/* Minimal Stat Badges Row */}
            <div className="grid grid-cols-3 gap-sm text-center">
              <div style={{ padding: '8px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--bg-secondary)' }}>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Officers</span>
                <span className="font-bold text-xs text-primary block mt-xs">{selectedPrison.staffCount} Officers</span>
              </div>
              <div style={{ padding: '8px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--bg-secondary)' }}>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Incidents</span>
                <span className="font-bold text-xs text-primary block mt-xs">{selectedPrison.incidentCount} Logs</span>
              </div>
              <div style={{ padding: '8px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--bg-secondary)' }}>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Welfare Index</span>
                <span className="font-bold text-xs text-success block mt-xs" style={{ color: 'var(--success-color)' }}>{selectedPrison.releaseRate}%</span>
              </div>
            </div>

            {/* Row 1 Grid: Donut Pie Chart (Left) & Sentence Histogram (Right) */}
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              
              {/* Chart 1: Inmate Classification Donut Pie */}
              <div style={{ height: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', alignSelf: 'flex-start', marginBottom: '5px' }}>Classification</span>
                <ResponsiveContainer width="100%" height="70%">
                  <PieChart>
                    <Pie
                      activeIndex={activePieIndex}
                      activeShape={renderActiveShape}
                      data={getClassificationData(selectedPrison)}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={45}
                      paddingAngle={3}
                      dataKey="value"
                      onMouseEnter={(_, index) => setActivePieIndex(index)}
                      onMouseLeave={() => setActivePieIndex(null)}
                    >
                      {getClassificationData(selectedPrison).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} style={{ cursor: 'pointer' }} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Micro Legends */}
                <div className="flex gap-xs mt-xs justify-center" style={{ width: '100%' }}>
                  {getClassificationData(selectedPrison).map((item, index) => (
                    <div key={index} style={{ fontSize: '7px', display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                      <span style={{ fontWeight: activePieIndex === index ? 'bold' : 'normal', color: activePieIndex === index ? 'var(--text-primary)' : '' }}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: Sentence Length Histogram */}
              <div style={{ height: '180px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Sentence Length Histogram</span>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={getSentenceHistogram(selectedPrison)} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 8 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 8 }} />
                    <Tooltip contentStyle={{ fontSize: '9px' }} />
                    <Bar dataKey="frequency" name="Inmates" fill={HIST_COLOR} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Row 2 Grid: Staff/Incident Scatter Plot (Left) & Audit Compliance Line (Right) */}
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '15px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
              
              {/* Chart 3: Correlation Scatter Plot */}
              <div style={{ height: '180px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Scatter Plot: Staff vs Incidents</span>
                <ResponsiveContainer width="100%" height="85%">
                  <ScatterChart margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis type="number" dataKey="x" name="Staff" unit=" Staff" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 8 }} />
                    <YAxis type="number" dataKey="y" name="Incidents" unit=" Logs" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 8 }} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ fontSize: '9px' }} />
                    <Scatter name="Prisons" data={scatterData}>
                      {scatterData.map((entry, index) => {
                        const isSelected = selectedPrison.name.includes(entry.name);
                        return (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={isSelected ? 'var(--primary-color)' : 'var(--accent-color)'} 
                            r={isSelected ? 8 : 4.5} 
                            style={{ 
                              filter: isSelected ? 'drop-shadow(0 0 4px var(--primary-color))' : 'none',
                              transition: 'all 0.3s'
                            }}
                          />
                        );
                      })}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 4: Compliance Line Trend */}
              <div style={{ height: '180px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Audit Compliance Log</span>
                <ResponsiveContainer width="100%" height="85%">
                  <LineChart data={getComplianceTrend(selectedPrison)} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 8 }} />
                    <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 8 }} />
                    <Tooltip contentStyle={{ fontSize: '9px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="compliance" 
                      stroke={LINE_COLOR} 
                      strokeWidth={2.5} 
                      dot={{ r: 3, fill: LINE_COLOR }} 
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Dynamic Operational Status Check */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }} className="text-xxs">
              <span className="text-muted font-bold uppercase block mb-xs font-semibold">Operations Status Log: {selectedPrison.name}</span>
              <div style={{ display: 'flex', gap: '15px', color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-xs">
                  <CheckCircle size={10} style={{ color: selectedPrison.releaseRate >= 70 ? 'var(--success-color)' : 'var(--warning-color)' }} />
                  Rehab index: {selectedPrison.releaseRate}%
                </span>
                <span className="flex items-center gap-xs">
                  <CheckCircle size={10} style={{ color: selectedPrison.staffCount >= 100 ? 'var(--success-color)' : 'var(--warning-color)' }} />
                  Staffing: {selectedPrison.staffCount} officers
                </span>
                <span className="flex items-center gap-xs">
                  <CheckCircle size={10} style={{ color: selectedPrison.incidentCount <= 15 ? 'var(--success-color)' : 'var(--danger-color)' }} />
                  Incident rate: {selectedPrison.incidentCount} logs
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default GovtPrisons;
