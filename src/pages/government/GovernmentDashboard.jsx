import React, { useState } from 'react';
import { TrendingUp, Award, DollarSign, ShieldAlert, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const prisonOccupancyData = [
  { name: 'Central Jail', occupancy: 850, capacity: 1000 },
  { name: 'District Jail A', occupancy: 420, capacity: 500 },
  { name: 'Sub-Jail B', occupancy: 180, capacity: 200 },
  { name: 'Special Jail C', occupancy: 120, capacity: 150 },
];

const GovernmentDashboard = () => {
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [allocatedBudgets, setAllocatedBudgets] = useState({
    'Central Jail': 250000,
    'District Jail A': 120000,
    'Sub-Jail B': 50000,
    'Special Jail C': 30000,
  });

  const [targetPrison, setTargetPrison] = useState('Central Jail');
  const [fundingAmount, setFundingAmount] = useState('');
  const [fundingProgram, setFundingProgram] = useState('Rehabilitation & Labor');

  const handleAllocation = (e) => {
    e.preventDefault();
    if (!fundingAmount) return;

    setAllocatedBudgets(prev => ({
      ...prev,
      [targetPrison]: prev[targetPrison] + parseInt(fundingAmount)
    }));

    alert(`Successfully allocated ₹${fundingAmount} to ${targetPrison} for ${fundingProgram}!`);
    setFundingAmount('');
    setShowAllocateModal(false);
  };

  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Statewide Judicial Analytics</h1>
          <p className="text-muted text-sm mt-xs">Monitor prison capacity limits, manage funding allocations, and oversee policy reforms.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAllocateModal(true)}><DollarSign size={16} /> Allocate Legal Aid Funding</button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-md">
        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">State Facilities</p>
              <h2 className="h2" style={{ margin: 0 }}>4</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', color: 'var(--primary-color)' }}>
              <TrendingUp />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Total Inmate Population</p>
              <h2 className="h2" style={{ margin: 0 }}>1,570</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--warning-light)', borderRadius: '50%', color: 'var(--warning-color)' }}>
              <BarChart3 />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Parole Reviews Pending</p>
              <h2 className="h2" style={{ margin: 0 }}>38</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--danger-light)', borderRadius: '50%', color: 'var(--danger-color)' }}>
              <ShieldAlert />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Budget Allocated</p>
              <h2 className="h2" style={{ margin: 0 }}>₹4.5L</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--success-light)', borderRadius: '50%', color: 'var(--success-color)' }}>
              <DollarSign />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Chart & Allocation Directory */}
      <div className="grid grid-cols-3 gap-md mt-sm">
        {/* Occupancy vs Capacity chart */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <h3 className="card-title">Facility Occupancy vs Capacity</h3>
          </div>
          <div className="card-body" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prisonOccupancyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--border-radius-sm)', border: 'none', boxShadow: 'var(--shadow-md)' }}
                />
                <Bar dataKey="occupancy" name="Occupancy" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="capacity" name="Total Capacity" fill="var(--primary-light)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Allocation Directory */}
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <div className="card-header">
            <h3 className="card-title">State Funding Log</h3>
          </div>
          <div className="card-body flex flex-col justify-center gap-md">
            {Object.keys(allocatedBudgets).map(facility => (
              <div key={facility} className="flex justify-between items-center border-b pb-xs" style={{ borderBottomColor: 'var(--border-color)' }}>
                <span className="text-xs font-semibold text-secondary">{facility}</span>
                <span className="font-bold text-sm text-primary">₹{allocatedBudgets[facility].toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL: Allocate Funding */}
      {showAllocateModal && (
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
              Allocate State Legal Aid Funding
            </h3>
            
            <form onSubmit={handleAllocation} className="flex flex-col gap-md">
              <div className="form-group">
                <label className="form-label">Target Prison Facility</label>
                <select 
                  className="form-control"
                  value={targetPrison}
                  onChange={(e) => setTargetPrison(e.target.value)}
                >
                  {Object.keys(allocatedBudgets).map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Funding Category / Program</label>
                <select 
                  className="form-control"
                  value={fundingProgram}
                  onChange={(e) => setFundingProgram(e.target.value)}
                >
                  <option value="Rehabilitation & Labor">Rehabilitation & Inmate Labor Wages</option>
                  <option value="Free Legal Aid representation">Pro Bono Attorney Reimbursement</option>
                  <option value="Prison Facility Library & Literacy">Warden Library & Literacy programs</option>
                  <option value="Medical & Psychiatric Care">Mental/Medical Care Allocations</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Funding Amount (₹)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="e.g. 50000"
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(e.target.value)}
                  min="1000"
                  required
                />
              </div>

              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => setShowAllocateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full">
                  Authorize Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default GovernmentDashboard;
