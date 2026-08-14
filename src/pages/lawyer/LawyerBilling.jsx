import React, { useState } from 'react';
import { 
  Coins, Calendar, Clock, CreditCard, ChevronRight, CheckCircle, RefreshCw, 
  Send, Users, Award, TrendingUp, AlertCircle 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock billing records
const mockBillingTransactions = [
  { id: "INV-992", client: "Patil (Prisoner 2)", amount: "₹1,500", date: "2026-08-14", status: "Unpaid" },
  { id: "INV-974", client: "Vikram (Prisoner 5)", amount: "₹2,500", date: "2026-08-11", status: "Cleared" },
  { id: "INV-941", client: "Gupta (Prisoner 6)", amount: "₹1,800", date: "2026-08-08", status: "Cleared" }
];

// Mock scheduled appointments
const mockAppointments = [
  { id: "APP-01", client: "Prisoner 1", type: "Free Aid Counsel", dateTime: "15 Aug 2026, 10:00 AM", status: "Scheduled" },
  { id: "APP-02", client: "Prisoner 2", type: "Charged Hearing Prep", dateTime: "16 Aug 2026, 02:30 PM", status: "Scheduled" },
  { id: "APP-03", client: "Prisoner 3", type: "Free Aid Reform Evaluation", dateTime: "17 Aug 2026, 11:30 AM", status: "Completed" }
];

const LawyerBilling = () => {
  const [invoices, setInvoices] = useState(mockBillingTransactions);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [requestingId, setRequestingId] = useState(null);

  // Revenue analytics data
  const revenueData = [
    { month: 'May', earnings: 4200 },
    { month: 'Jun', earnings: 7800 },
    { month: 'Jul', earnings: 6200 },
    { month: 'Aug', earnings: 9500 }
  ];

  // Request payment release animation
  const handleRequestRelease = (invId) => {
    setRequestingId(invId);
    setTimeout(() => {
      setInvoices(prev => prev.map(inv => {
        if (inv.id === invId) {
          return { ...inv, status: 'Requested' };
        }
        return inv;
      }));
      setRequestingId(null);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      
      {/* Title */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Billing, Fees & Schedule</h1>
          <p className="text-muted text-sm mt-xs">Audit court-certified consultation fee logs, appointments schedules, and dispatch legal aid clearance claims.</p>
        </div>
      </div>

      {/* Grid: Stats row */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
        <div className="card">
          <div className="card-body flex items-center justify-between" style={{ padding: '20px' }}>
            <div>
              <span className="text-xxs text-muted uppercase font-bold tracking-wider block">Total Earnings</span>
              <h2 className="h2 mt-xs" style={{ margin: 0 }}>₹13,800</h2>
              <span className="text-xxs text-secondary block mt-xs">Including cleared aid claims</span>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--success-light)', borderRadius: '50%', color: 'var(--success-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between" style={{ padding: '20px' }}>
            <div>
              <span className="text-xxs text-muted uppercase font-bold tracking-wider block">Unpaid Invoices</span>
              <h2 className="h2 mt-xs" style={{ margin: 0, color: 'var(--warning-color)' }}>₹1,500</h2>
              <span className="text-xxs text-secondary block mt-xs">1 invoice pending release</span>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--warning-light)', borderRadius: '50%', color: 'var(--warning-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between" style={{ padding: '20px' }}>
            <div>
              <span className="text-xxs text-muted uppercase font-bold tracking-wider block">Free Aid Handled</span>
              <h2 className="h2 mt-xs" style={{ margin: 0 }}>18 Cases</h2>
              <span className="text-xxs text-secondary block mt-xs">State compensated ledger</span>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Appointments (Left) & Revenue / Invoices (Right) */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Card: Appointments Calendar */}
        <div className="card" style={{ flex: 1 }}>
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Calendar size={16} className="text-primary" /> Scheduled Appointments</h3>
          </div>
          <div className="card-body p-0" style={{ minHeight: '260px' }}>
            <div className="flex flex-col">
              {appointments.map((app, idx) => (
                <div 
                  key={app.id}
                  style={{
                    padding: '16px',
                    borderBottom: idx === appointments.length - 1 ? 'none' : '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'between',
                    alignItems: 'center'
                  }}
                  className="table-row-hover text-xxs"
                >
                  <div className="flex-1">
                    <span className="font-bold text-primary block">{app.client} ({app.type})</span>
                    <span className="text-muted block mt-xxs flex items-center gap-xs">
                      <Clock size={10} /> {app.dateTime}
                    </span>
                  </div>
                  <div>
                    <span className={`badge ${app.status === 'Completed' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '7px', padding: '1px 5px' }}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Earnings Revenue chart & invoices */}
        <div className="card" style={{ flex: 1.3 }}>
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><TrendingUp size={16} className="text-primary" /> Monthly Revenue Trend (INR)</h3>
          </div>
          <div className="card-body flex flex-col gap-md" style={{ padding: '15px' }}>
            
            {/* Recharts Area Chart */}
            <div style={{ height: '120px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lawyerRevenueColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 9 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: '9px', border: 'none' }} />
                  <Area type="monotone" dataKey="earnings" name="Revenue" stroke="var(--primary-color)" fillOpacity={1} fill="url(#lawyerRevenueColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Invoices ledger */}
            <div style={{ overflowX: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
              <table className="w-full text-left" style={{ borderCollapse: 'collapse', minWidth: '400px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th className="p-sm text-xxs font-bold text-secondary uppercase tracking-wider">Invoice ID</th>
                    <th className="p-sm text-xxs font-bold text-secondary uppercase tracking-wider">Client</th>
                    <th className="p-sm text-xxs font-bold text-secondary uppercase tracking-wider">Amount</th>
                    <th className="p-sm text-xxs font-bold text-secondary uppercase tracking-wider">Status/Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, idx) => (
                    <tr key={inv.id} style={{ borderBottom: idx === invoices.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                      <td className="p-sm text-xxs font-bold text-primary">{inv.id}</td>
                      <td className="p-sm text-xxs text-secondary">{inv.client}</td>
                      <td className="p-sm text-xxs font-semibold text-primary">{inv.amount}</td>
                      <td className="p-sm text-xxs">
                        {inv.status === 'Cleared' ? (
                          <span className="badge badge-success" style={{ fontSize: '7px', padding: '1px 5px' }}>Cleared</span>
                        ) : inv.status === 'Requested' ? (
                          <span className="badge badge-warning animate-pulse" style={{ fontSize: '7px', padding: '1px 5px', color: 'var(--warning-color)' }}>Requested</span>
                        ) : (
                          <button 
                            className="btn flex items-center gap-xs"
                            style={{ 
                              padding: '2px 6px', 
                              fontSize: '7px', 
                              borderRadius: '4px', 
                              border: '1px solid var(--warning-color)', 
                              backgroundColor: 'var(--warning-light)',
                              color: 'var(--warning-color)',
                              fontWeight: 'bold',
                              cursor: 'pointer' 
                            }}
                            onClick={() => handleRequestRelease(inv.id)}
                            disabled={requestingId === inv.id}
                          >
                            {requestingId === inv.id ? (
                              <>
                                <RefreshCw size={8} className="spin" /> Sending...
                              </>
                            ) : (
                              <>
                                <Send size={8} /> Request Fee
                              </>
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
      `}</style>

    </div>
  );
};

export default LawyerBilling;
