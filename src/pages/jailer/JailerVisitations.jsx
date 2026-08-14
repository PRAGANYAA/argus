import React, { useState } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';

const initialVisitations = [
  { id: "VIS-101", inmateName: "Ramesh Kumar", visitorName: "Priya Kumar", relationship: "Sister", date: "2026-08-15", time: "10:30 AM", status: "Pending" },
  { id: "VIS-102", inmateName: "Suresh Patil", visitorName: "Vikram Patil", relationship: "Brother", date: "2026-08-16", time: "02:00 PM", status: "Pending" },
  { id: "VIS-103", inmateName: "Amit Shah", visitorName: "Kirti Shah", relationship: "Wife", date: "2026-08-17", time: "11:00 AM", status: "Approved" },
];

const JailerVisitations = () => {
  const [visitations, setVisitations] = useState(initialVisitations);

  const handleUpdateStatus = (id, newStatus) => {
    setVisitations(prev => prev.map(vis => {
      if (vis.id === id) {
        return { ...vis, status: newStatus };
      }
      return vis;
    }));
  };

  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Visitation Management</h1>
          <p className="text-muted text-sm mt-xs">Approve or reject visitor requests submitted by family members.</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Calendar size={18} /> Visitor Schedule Requests</h3>
        </div>
        <div className="card-body p-0" style={{ padding: 0 }}>
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th className="p-md text-sm font-semibold text-secondary">Request ID</th>
                <th className="p-md text-sm font-semibold text-secondary">Inmate Name</th>
                <th className="p-md text-sm font-semibold text-secondary">Visitor Name (Relation)</th>
                <th className="p-md text-sm font-semibold text-secondary">Requested Date</th>
                <th className="p-md text-sm font-semibold text-secondary">Time Slot</th>
                <th className="p-md text-sm font-semibold text-secondary">Status</th>
                <th className="p-md text-sm font-semibold text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitations.map((vis, idx) => (
                <tr key={vis.id} style={{ borderBottom: idx === visitations.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  <td className="p-md text-sm font-bold">{vis.id}</td>
                  <td className="p-md text-sm font-semibold">{vis.inmateName}</td>
                  <td className="p-md text-sm">{vis.visitorName} ({vis.relationship})</td>
                  <td className="p-md text-sm">{vis.date}</td>
                  <td className="p-md text-sm">{vis.time}</td>
                  <td className="p-md text-sm">
                    <span className={`badge ${
                      vis.status === 'Approved' ? 'badge-success' : 
                      vis.status === 'Rejected' ? 'badge-danger' : 
                      'badge-warning'
                    }`}>
                      {vis.status}
                    </span>
                  </td>
                  <td className="p-md text-sm text-right">
                    {vis.status === 'Pending' ? (
                      <div className="flex justify-end gap-sm">
                        <button 
                          className="btn btn-outline text-success" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem', borderColor: 'var(--success-color)' }}
                          onClick={() => handleUpdateStatus(vis.id, 'Approved')}
                        >
                          <CheckCircle2 size={14} className="mr-xs" /> Approve
                        </button>
                        <button 
                          className="btn btn-outline text-danger" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem', borderColor: 'var(--danger-color)' }}
                          onClick={() => handleUpdateStatus(vis.id, 'Rejected')}
                        >
                          <XCircle size={14} className="mr-xs" /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted font-semibold">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JailerVisitations;
