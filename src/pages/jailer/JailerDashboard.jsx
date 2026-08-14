import React, { useState } from 'react';
import { ClipboardList, Users, Clock, PlusCircle, ShieldAlert } from 'lucide-react';

const initialInmates = [
  { id: "INM-98234", name: "Ramesh Kumar", block: "Block B", job: "Carpentry", hours: 120, credits: "5 Days" },
  { id: "INM-91043", name: "Suresh Patil", block: "Block A", job: "Kitchen Duty", hours: 85, credits: "3 Days" },
  { id: "INM-88341", name: "Amit Shah", block: "Block C", job: "Tailoring", hours: 60, credits: "2 Days" },
];

const JailerDashboard = () => {
  const [inmates, setInmates] = useState(initialInmates);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Log work states
  const [selectedInmateId, setSelectedInmateId] = useState(initialInmates[0].id);
  const [hoursToAdd, setHoursToAdd] = useState('');
  
  // Register inmate states
  const [newInmateName, setNewInmateName] = useState('');
  const [newInmateBlock, setNewInmateBlock] = useState('Block A');
  const [newInmateJob, setNewInmateJob] = useState('Carpentry');

  const handleLogWork = (e) => {
    e.preventDefault();
    if (!hoursToAdd) return;
    
    setInmates(prev => prev.map(inmate => {
      if (inmate.id === selectedInmateId) {
        const updatedHours = inmate.hours + parseInt(hoursToAdd);
        const computedCredits = `${Math.floor(updatedHours / 25)} Days`; // 1 day per 25 hours
        return {
          ...inmate,
          hours: updatedHours,
          credits: computedCredits
        };
      }
      return inmate;
    }));

    setHoursToAdd('');
    setShowLogModal(false);
  };

  const handleAddInmate = (e) => {
    e.preventDefault();
    if (!newInmateName) return;

    const newId = `INM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEntry = {
      id: newId,
      name: newInmateName,
      block: newInmateBlock,
      job: newInmateJob,
      hours: 0,
      credits: '0 Days'
    };

    setInmates(prev => [...prev, newEntry]);
    setNewInmateName('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Warden Portal</h1>
          <p className="text-muted text-sm mt-xs">Log prison labor, manage inmate records, and oversee schedules.</p>
        </div>
        <div className="flex gap-sm">
          <button className="btn btn-outline" onClick={() => setShowLogModal(true)}><Clock size={16} /> Log Labor Hours</button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}><PlusCircle size={16} /> Register Inmate</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-md">
        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Active Inmates</p>
              <h2 className="h2" style={{ margin: 0 }}>{inmates.length}</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', color: 'var(--primary-color)' }}>
              <Users />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Labor Program Active</p>
              <h2 className="h2" style={{ margin: 0 }}>84%</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--success-light)', borderRadius: '50%', color: 'var(--success-color)' }}>
              <ClipboardList />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Total Hours Today</p>
              <h2 className="h2" style={{ margin: 0 }}>45 hrs</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--warning-light)', borderRadius: '50%', color: 'var(--warning-color)' }}>
              <Clock />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Incidents Reported</p>
              <h2 className="h2" style={{ margin: 0 }}>0</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--danger-light)', borderRadius: '50%', color: 'var(--danger-color)' }}>
              <ShieldAlert />
            </div>
          </div>
        </div>
      </div>

      {/* Inmate Directory Table */}
      <div className="card mt-sm">
        <div className="card-header">
          <h3 className="card-title">Inmate Labor Directory</h3>
        </div>
        <div className="card-body p-0" style={{ padding: 0 }}>
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th className="p-md text-sm font-semibold text-secondary">Inmate ID</th>
                <th className="p-md text-sm font-semibold text-secondary">Full Name</th>
                <th className="p-md text-sm font-semibold text-secondary">Assigned Block</th>
                <th className="p-md text-sm font-semibold text-secondary">Assigned Program</th>
                <th className="p-md text-sm font-semibold text-secondary">Hours Logged</th>
                <th className="p-md text-sm font-semibold text-secondary">Behavior Credit Status</th>
              </tr>
            </thead>
            <tbody>
              {inmates.map((inmate, idx) => (
                <tr key={inmate.id} style={{ borderBottom: idx === inmates.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  <td className="p-md text-sm font-bold">{inmate.id}</td>
                  <td className="p-md text-sm font-semibold">{inmate.name}</td>
                  <td className="p-md text-sm">{inmate.block}</td>
                  <td className="p-md text-sm"><span className="badge badge-primary">{inmate.job}</span></td>
                  <td className="p-md text-sm font-semibold">{inmate.hours} hrs</td>
                  <td className="p-md text-sm font-semibold text-success" style={{ color: 'var(--success-color)' }}>{inmate.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Log Labor Hours */}
      {showLogModal && (
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
              Log Labor Hours
            </h3>
            
            <form onSubmit={handleLogWork} className="flex flex-col gap-md">
              <div className="form-group">
                <label className="form-label">Select Inmate</label>
                <select 
                  className="form-control"
                  value={selectedInmateId}
                  onChange={(e) => setSelectedInmateId(e.target.value)}
                >
                  {inmates.map(i => (
                    <option key={i.id} value={i.id}>{i.name} ({i.id})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Labor Hours to Add</label>
                <input 
                  type="number" 
                  className="form-control"
                  placeholder="e.g. 8"
                  value={hoursToAdd}
                  onChange={(e) => setHoursToAdd(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => setShowLogModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full">
                  Log Hours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Register Inmate */}
      {showAddModal && (
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
              Register New Inmate
            </h3>
            
            <form onSubmit={handleAddInmate} className="flex flex-col gap-md">
              <div className="form-group">
                <label className="form-label">Inmate Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Haris Khan"
                  value={newInmateName}
                  onChange={(e) => setNewInmateName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assign Block</label>
                <select 
                  className="form-control"
                  value={newInmateBlock}
                  onChange={(e) => setNewInmateBlock(e.target.value)}
                >
                  <option value="Block A">Block A</option>
                  <option value="Block B">Block B</option>
                  <option value="Block C">Block C</option>
                  <option value="Block D">Block D</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Assign Work Program</label>
                <select 
                  className="form-control"
                  value={newInmateJob}
                  onChange={(e) => setNewInmateJob(e.target.value)}
                >
                  <option value="Carpentry">Carpentry</option>
                  <option value="Tailoring">Tailoring</option>
                  <option value="Kitchen Duty">Kitchen Duty</option>
                  <option value="Library Assistant">Library Assistant</option>
                </select>
              </div>

              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full">
                  Register Inmate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default JailerDashboard;
