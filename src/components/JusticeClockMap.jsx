import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ShieldAlert, CheckCircle, AlertTriangle, ArrowRight, Activity, MapPin, Eye } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const stateData = [
  { id: 'DEL', name: 'Delhi NCR', code: 'DL', compliance: 58, status: 'Critical Surge', color: '#cc786e', lightColor: '#f5dcd9', inmates: 18900, capacity: 12000, undertrialsPct: 78, pendingBails: 4120, lat: 28.6139, lng: 77.2090 },
  { id: 'MAH', name: 'Maharashtra', code: 'MH', compliance: 92, status: 'Exemplary', color: '#8c9e78', lightColor: '#e6edd8', inmates: 14200, capacity: 16000, undertrialsPct: 42, pendingBails: 890, lat: 19.7515, lng: 75.7139 },
  { id: 'UP', name: 'Uttar Pradesh', code: 'UP', compliance: 46, status: 'Critical Surge', color: '#cc786e', lightColor: '#f5dcd9', inmates: 27500, capacity: 18000, undertrialsPct: 84, pendingBails: 6850, lat: 26.8467, lng: 80.9462 },
  { id: 'TN', name: 'Tamil Nadu', code: 'TN', compliance: 88, status: 'Compliant', color: '#8c9e78', lightColor: '#e6edd8', inmates: 11400, capacity: 13500, undertrialsPct: 39, pendingBails: 620, lat: 11.1271, lng: 78.6569 },
  { id: 'KAR', name: 'Karnataka', code: 'KA', compliance: 76, status: 'Moderate Review', color: '#d99e52', lightColor: '#fae9d1', inmates: 9800, capacity: 11000, undertrialsPct: 56, pendingBails: 1450, lat: 15.3173, lng: 75.7139 },
  { id: 'GUJ', name: 'Gujarat', code: 'GJ', compliance: 82, status: 'Compliant', color: '#8c9e78', lightColor: '#e6edd8', inmates: 8900, capacity: 10500, undertrialsPct: 48, pendingBails: 980, lat: 22.2587, lng: 71.1924 },
  { id: 'WB', name: 'West Bengal', code: 'WB', compliance: 64, status: 'Moderate Review', color: '#d99e52', lightColor: '#fae9d1', inmates: 12100, capacity: 13000, undertrialsPct: 62, pendingBails: 2310, lat: 22.9868, lng: 87.8550 },
  { id: 'KER', name: 'Kerala', code: 'KL', compliance: 95, status: 'Exemplary', color: '#8c9e78', lightColor: '#e6edd8', inmates: 4200, capacity: 5500, undertrialsPct: 29, pendingBails: 310, lat: 10.8505, lng: 76.2711 },
  { id: 'RAJ', name: 'Rajasthan', code: 'RJ', compliance: 71, status: 'Moderate Review', color: '#d99e52', lightColor: '#fae9d1', inmates: 10500, capacity: 12000, undertrialsPct: 59, pendingBails: 1890, lat: 27.0238, lng: 74.2179 },
  { id: 'BIH', name: 'Bihar', code: 'BR', compliance: 52, status: 'Critical Surge', color: '#cc786e', lightColor: '#f5dcd9', inmates: 21300, capacity: 15000, undertrialsPct: 81, pendingBails: 5410, lat: 25.0961, lng: 85.3131 },
  { id: 'TEL', name: 'Telangana', code: 'TS', compliance: 85, status: 'Compliant', color: '#8c9e78', lightColor: '#e6edd8', inmates: 7600, capacity: 9000, undertrialsPct: 44, pendingBails: 720, lat: 18.1124, lng: 79.0193 },
  { id: 'MP', name: 'Madhya Pradesh', code: 'MP', compliance: 68, status: 'Moderate Review', color: '#d99e52', lightColor: '#fae9d1', inmates: 13400, capacity: 14000, undertrialsPct: 65, pendingBails: 2890, lat: 22.9734, lng: 78.6569 }
];

const JusticeClockMap = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  const [selectedState, setSelectedState] = useState(stateData[0]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [clockTime, setClockTime] = useState(new Date());

  // Real-time ticking clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setClockTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Real Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Create Leaflet Map Instance centered over India
    const map = L.map(mapContainerRef.current, {
      center: [21.5, 79.5],
      zoom: 4.8,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Add OpenStreetMap Tile Layer with warm styled tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap | ARGUS GIS',
      maxZoom: 18,
    }).addTo(map);

    // Invalidate map size after initial paint for crisp canvas rendering
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    // Clean up on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Leaflet Markers when filterStatus or selectedState changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => map.removeLayer(marker));
    markersRef.current = {};

    stateData.forEach(st => {
      // Filter logic
      if (filterStatus === 'CRITICAL' && st.compliance >= 60) return;
      if (filterStatus === 'MODERATE' && (st.compliance < 60 || st.compliance >= 80)) return;
      if (filterStatus === 'COMPLIANT' && st.compliance < 80) return;

      const isSelected = selectedState.id === st.id;

      // Custom Pulsing DivIcon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <div style="
              position: absolute;
              width: ${isSelected ? '38px' : '26px'};
              height: ${isSelected ? '38px' : '26px'};
              border-radius: 50%;
              background-color: ${st.color};
              opacity: 0.35;
              animation: pulse 1.5s infinite ease-in-out;
            "></div>
            <div style="
              position: relative;
              width: ${isSelected ? '24px' : '18px'};
              height: ${isSelected ? '24px' : '18px'};
              border-radius: 50%;
              background-color: ${st.color};
              border: 2px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 8px;
              font-weight: 800;
              font-family: var(--font-family);
            ">
              ${st.code}
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([st.lat, st.lng], { icon: customIcon }).addTo(map);

      // Popup HTML content
      const popupContent = `
        <div style="font-family: var(--font-family); padding: 4px; color: #3b3228;">
          <strong style="font-size: 13px; color: ${st.color}; display: block;">${st.name} (${st.code})</strong>
          <div style="font-size: 10px; margin-top: 4px; font-weight: 600;">
            Compliance Score: <span style="color: ${st.color}; font-weight: 800;">${st.compliance}% (${st.status})</span><br/>
            Inmate Census: <strong>${st.inmates.toLocaleString()}</strong> / ${st.capacity.toLocaleString()}<br/>
            Undertrial Ratio: <strong>${st.undertrialsPct}%</strong>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { offset: [0, -10] });

      marker.on('click', () => {
        setSelectedState(st);
      });

      markersRef.current[st.id] = marker;
    });

  }, [filterStatus, selectedState]);

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
              <span className="badge badge-danger text-xxs animate-pulse" style={{ padding: '2px 8px', fontSize: '8px' }}>REAL LEAFLET GIS FEED</span>
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

      {/* Main Grid: Real Leaflet Map Container Left (60%) & State Detail Inspector Right (40%) */}
      <div className="card-body grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', padding: '24px' }}>
        
        {/* Left Column: Real Leaflet Map Render Canvas */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)', padding: '12px', border: '1px solid var(--border-color)', position: 'relative', height: '420px', display: 'flex', flexDirection: 'column', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.03)' }}>
          
          <div style={{ padding: '0 4px 8px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
            <div className="flex items-center gap-xs">
              <MapPin size={14} className="text-primary" />
              <span className="text-xxs font-bold text-muted uppercase tracking-wider">OpenStreetMap GIS Choropleth Layer</span>
            </div>
            <span className="text-xxs text-primary font-bold">Interactive Zoom & Pan Enabled</span>
          </div>

          {/* Leaflet DOM Node */}
          <div 
            ref={mapContainerRef} 
            style={{ width: '100%', height: '100%', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', zIndex: 1, border: '1px solid var(--border-color)' }} 
          />

          {/* Map Legend */}
          <div className="flex gap-md justify-center items-center mt-xs pt-xs w-full">
            <div className="flex items-center gap-xs text-xxs text-secondary">
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--danger-color)', display: 'inline-block' }}></span>
              <span>Red: Critical (&lt;60%)</span>
            </div>
            <div className="flex items-center gap-xs text-xxs text-secondary">
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--warning-color)', display: 'inline-block' }}></span>
              <span>Yellow: Review (60-80%)</span>
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
            <div className="flex justify-between items-center border-b pb-sm mb-sm" style={{ borderBottomColor: 'var(--border-color)' }}>
              <div>
                <span className="text-xxs text-muted font-bold uppercase tracking-wider block">Selected GIS Jurisdiction</span>
                <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.35rem', color: 'var(--text-primary)', margin: '2px 0 0 0' }}>
                  {selectedState.name} ({selectedState.code})
                </h3>
              </div>
              <span 
                className="badge" 
                style={{ 
                  backgroundColor: selectedState.lightColor, 
                  color: selectedState.color, 
                  border: `1px solid ${selectedState.color}`,
                  fontSize: '9px',
                  padding: '4px 10px',
                  whiteSpace: 'nowrap',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                {selectedState.status.toUpperCase()}
              </span>
            </div>

            {/* Metric Scorecard */}
            <div className="grid grid-cols-2" style={{ gap: '16px', marginTop: '16px', marginBottom: '20px' }}>
              
              <div className="flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-secondary)', padding: '14px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', minHeight: '90px' }}>
                <span className="text-xxs text-muted uppercase font-bold block" style={{ marginBottom: '4px' }}>Compliance Score</span>
                <span className="font-extrabold text-xl block" style={{ color: selectedState.color, lineHeight: '1.2' }}>
                  {selectedState.compliance}/100
                </span>
                <span className="text-xxs text-secondary block" style={{ marginTop: '4px' }}>Automated Audit Index</span>
              </div>

              <div className="flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-secondary)', padding: '14px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', minHeight: '90px' }}>
                <span className="text-xxs text-muted uppercase font-bold block" style={{ marginBottom: '4px' }}>Inmate Population</span>
                <span className="font-extrabold text-xl text-primary block" style={{ lineHeight: '1.2' }}>
                  {selectedState.inmates.toLocaleString()}
                </span>
                <span className="text-xxs text-secondary block" style={{ marginTop: '4px' }}>Capacity: {selectedState.capacity.toLocaleString()}</span>
              </div>

              <div className="flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-secondary)', padding: '14px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', minHeight: '90px' }}>
                <span className="text-xxs text-muted uppercase font-bold block" style={{ marginBottom: '4px' }}>Undertrial Ratio</span>
                <span className="font-extrabold text-lg text-primary block" style={{ lineHeight: '1.2' }}>
                  {selectedState.undertrialsPct}%
                </span>
                <span className="text-xxs text-secondary block" style={{ marginTop: '4px' }}>Awaiting Charge Clearance</span>
              </div>

              <div className="flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-secondary)', padding: '14px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', minHeight: '90px' }}>
                <span className="text-xxs text-muted uppercase font-bold block" style={{ marginBottom: '4px' }}>Pending Bail Pleas</span>
                <span className="font-extrabold text-lg text-danger block" style={{ color: 'var(--danger-color)', lineHeight: '1.2' }}>
                  {selectedState.pendingBails.toLocaleString()}
                </span>
                <span className="text-xxs text-secondary block" style={{ marginTop: '4px' }}>Queued in District Courts</span>
              </div>

            </div>

            {/* Diagnostic Commentary */}
            <div style={{ padding: '14px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', border: '1px solid var(--border-color)', marginTop: '20px', marginBottom: '20px' }}>
              <strong className="block text-primary text-xs mb-xxs" style={{ marginBottom: '6px' }}>Judicial Audit Diagnosis:</strong>
              {selectedState.compliance < 60 ? (
                <span className="block">⚠️ Critical overcrowding & undertrial delay flagged in {selectedState.name}. Immediate release recommendation dispatch and DLSA legal aid assignment recommended under Sec 436A CrPC.</span>
              ) : selectedState.compliance < 80 ? (
                <span className="block">⚡ Moderate compliance logged. Facilities operational with manageable caseload. Continuous monitoring active.</span>
              ) : (
                <span className="block">✔ Exemplary judicial compliance! Undertrial release ratio exceeds target benchmarks with active vocational labor credits.</span>
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
