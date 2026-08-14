import React, { useState } from 'react';
import { mockSubscription } from '../../data/govtMockData';
import { Calendar, ShieldAlert, Award, FileText, CheckCircle, CreditCard, Clock, RefreshCw, BarChart2, Download, Zap, ToggleLeft, ToggleRight } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const GovtSubscription = () => {
  const [sub, setSub] = useState(mockSubscription);
  const [daysLeft, setDaysLeft] = useState(14); 
  const [validUntil, setValidUntil] = useState("2026-08-28");
  const [billingList, setBillingList] = useState(mockSubscription.billingHistory);
  const [billingCycle, setBillingCycle] = useState('annual'); // annual, quarterly
  
  // Interactive loading/sync states
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [telemetrySyncing, setTelemetrySyncing] = useState(false);
  const [downloadingInvId, setDownloadingInvId] = useState(null);

  // Fluctuating compute usage data (goes up and down in more places)
  const initialUsageData = [
    { month: 'Jan', cpuUsage: 42, storage: 45 },
    { month: 'Feb', cpuUsage: 78, storage: 58 },
    { month: 'Mar', cpuUsage: 35, storage: 40 },
    { month: 'Apr', cpuUsage: 89, storage: 72 },
    { month: 'May', cpuUsage: 48, storage: 55 },
    { month: 'Jun', cpuUsage: 94, storage: 85 },
    { month: 'Jul', cpuUsage: 55, storage: 60 },
    { month: 'Aug', cpuUsage: 88, storage: 80 }
  ];

  const alternativeUsageData = [
    { month: 'Jan', cpuUsage: 65, storage: 52 },
    { month: 'Feb', cpuUsage: 38, storage: 45 },
    { month: 'Mar', cpuUsage: 85, storage: 70 },
    { month: 'Apr', cpuUsage: 42, storage: 49 },
    { month: 'May', cpuUsage: 91, storage: 82 },
    { month: 'Jun', cpuUsage: 50, storage: 58 },
    { month: 'Jul', cpuUsage: 78, storage: 73 },
    { month: 'Aug', cpuUsage: 60, storage: 68 }
  ];

  const [usageDataset, setUsageDataset] = useState(initialUsageData);

  // Trigger telemetry fluctuation sync
  const handleTelemetrySync = () => {
    setTelemetrySyncing(true);
    setTimeout(() => {
      // Toggle between datasets to show visual graph animation
      setUsageDataset(prev => prev[0].cpuUsage === 42 ? alternativeUsageData : initialUsageData);
      setTelemetrySyncing(false);
    }, 1200);
  };

  // Dynamic progress representation
  const validityPct = Math.min(100, Math.round((daysLeft / 365) * 100));
  
  const gaugeData = [
    {
      name: 'Validity',
      value: validityPct,
      fill: daysLeft <= 30 ? 'var(--warning-color)' : 'var(--success-color)'
    }
  ];

  const handleRenew = () => {
    setProcessing(true);
    setPaymentSuccess(false);

    setTimeout(() => {
      setDaysLeft(prev => prev + 365);
      setValidUntil("2027-08-28");
      
      const nextInvId = `INV-2026-RENEW-${Math.floor(100 + Math.random() * 900)}`;
      const rentAmount = billingCycle === 'annual' ? "₹1,80,000" : "₹45,000";
      const periodText = billingCycle === 'annual' ? "Aug 2026 - Aug 2027" : "Aug 2026 - Nov 2026";
      
      const newInvoice = {
        id: nextInvId,
        date: new Date().toISOString().split('T')[0],
        amount: rentAmount,
        period: periodText,
        status: "Paid"
      };

      setBillingList(prev => [newInvoice, ...prev]);
      setProcessing(false);
      setPaymentSuccess(true);

      setTimeout(() => {
        setPaymentSuccess(false);
      }, 4000);
    }, 1500);
  };

  // Trigger browser TXT invoice receipt download
  const handleDownloadInvoice = (invId, amount, period) => {
    setDownloadingInvId(invId);
    setTimeout(() => {
      const receiptContent = `
========================================
       ARGUS ENTERPRISE BILLING
========================================
Receipt Invoice ID: ${invId}
Payment Timestamp : ${new Date().toISOString()}
Rental Amount Paid: ${amount}
Lease Cover Period: ${period}
Payment Channel   : State Treasury Gateway
Clearance Index   : CLR-992384-MOJ
========================================
Status: CERTIFIED PAID
      `;
      
      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const encodedUri = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `receipt_${invId}.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadingInvId(null);
    }, 1000);
  };

  // Toggle Billing Cycle
  const toggleBillingCycle = () => {
    setBillingCycle(prev => prev === 'annual' ? 'quarterly' : 'annual');
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      
      {/* Title */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Subscription & Rentals Billing</h1>
          <p className="text-muted text-sm mt-xs">Inspect Argus platform rental contracts, active lease validities, and dispatch payment renewals.</p>
        </div>
      </div>

      {paymentSuccess && (
        <div style={{
          backgroundColor: 'var(--success-light)',
          border: '1px solid var(--success-color)',
          color: 'var(--success-color)',
          padding: '12px 16px',
          borderRadius: 'var(--border-radius-sm)',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <CheckCircle size={18} />
          Payment Successful! License validity extended. Invoice logs appended below.
        </div>
      )}

      {/* Grid: Console Left, History Right */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Side: Renewal Console */}
        <div className="card">
          <div className="card-header border-b flex justify-between items-center" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Clock size={16} className="text-primary" /> Active Lease Validity</h3>
            
            {/* Dynamic Button 1: Billing Cycle Toggle */}
            <button 
              onClick={toggleBillingCycle}
              className="flex items-center gap-xs text-xxs font-bold text-primary"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {billingCycle === 'annual' ? (
                <>
                  <ToggleRight size={18} className="text-success" /> Annual Plan
                </>
              ) : (
                <>
                  <ToggleLeft size={18} className="text-secondary" /> Quarterly Plan
                </>
              )}
            </button>
          </div>
          <div className="card-body flex flex-col gap-md">
            
            {/* Radial Gauge */}
            <div style={{ height: '180px', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="85%" barSize={12} data={gaugeData} startAngle={180} endAngle={-180}>
                  <RadialBar minAngle={15} background clockWise dataKey="value" />
                </RadialBarChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: daysLeft <= 30 ? 'var(--warning-color)' : 'var(--success-color)' }}>
                  {daysLeft}d
                </span>
                <span style={{ fontSize: '8px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Remaining
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-xs text-xs">
              <div className="flex justify-between border-b pb-xs" style={{ borderBottomColor: 'var(--border-color)' }}>
                <span className="text-secondary">Billing Option</span>
                <span className="font-semibold text-primary">{billingCycle === 'annual' ? "Annual Enterprise Platform Lease" : "Quarterly Platform Lease"}</span>
              </div>
              <div className="flex justify-between border-b py-xs" style={{ borderBottomColor: 'var(--border-color)' }}>
                <span className="text-secondary">Rental Rates Period</span>
                <span className="font-semibold text-primary">{billingCycle === 'annual' ? "₹1,80,000 / Year" : "₹45,000 / Quarter"}</span>
              </div>
              <div className="flex justify-between py-xs">
                <span className="text-secondary">Lease Ends</span>
                <span className="font-semibold text-primary">{validUntil}</span>
              </div>
            </div>

            {/* Renewal button */}
            <button 
              className="btn btn-primary w-full text-xs mt-xs"
              style={{ backgroundColor: daysLeft <= 30 ? 'var(--warning-color)' : '', borderColor: daysLeft <= 30 ? 'var(--warning-color)' : '' }}
              onClick={handleRenew}
              disabled={processing}
            >
              {processing ? (
                <>
                  <RefreshCw size={14} className="spin mr-xs" /> Processing Clearance Payment...
                </>
              ) : (
                <>
                  <CreditCard size={14} className="mr-xs" /> Renew Argus Lease ({billingCycle === 'annual' ? '12 Mos' : '3 Mos'})
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Side: Usage & Invoices */}
        <div className="card" style={{ flex: 1.3 }}>
          <div className="card-header border-b flex justify-between items-center" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><BarChart2 size={16} className="text-primary" /> Compute Usage & Billing Logs</h3>
            
            {/* Dynamic Button 2: Force Usage Re-Audit Sync */}
            <button 
              onClick={handleTelemetrySync} 
              disabled={telemetrySyncing}
              className="btn text-xxs font-bold flex items-center gap-xs"
              style={{ padding: '4px 8px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', cursor: 'pointer' }}
            >
              {telemetrySyncing ? (
                <>
                  <RefreshCw size={10} className="spin" /> Syncing...
                </>
              ) : (
                <>
                  <Zap size={10} className="text-warning" style={{ color: 'var(--warning-color)' }} /> Sync Telemetry
                </>
              )}
            </button>
          </div>
          <div className="card-body flex flex-col gap-md" style={{ padding: '15px' }}>
            
            {/* Fluctuating compute usage chart */}
            <div style={{ height: '140px', width: '100%' }}>
              <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Fluctuating Platform Resource Load (Down & Up metrics)
              </span>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageDataset} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 9 }} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: '9px', border: 'none' }} />
                  <Line type="monotone" dataKey="cpuUsage" name="Processor Load (%)" stroke="var(--primary-color)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="storage" name="Database Storage (TB)" stroke="var(--success-color)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Invoices list with Download Receipts buttons */}
            <div style={{ overflowX: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
              <table className="w-full text-left" style={{ borderCollapse: 'collapse', minWidth: '400px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th className="p-sm text-xxs font-bold text-secondary uppercase tracking-wider">Invoice ID</th>
                    <th className="p-sm text-xxs font-bold text-secondary uppercase tracking-wider">Billing Date</th>
                    <th className="p-sm text-xxs font-bold text-secondary uppercase tracking-wider">Amount</th>
                    <th className="p-sm text-xxs font-bold text-secondary uppercase tracking-wider">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {billingList.map((invoice, idx) => (
                    <tr key={invoice.id} style={{ borderBottom: idx === billingList.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                      <td className="p-sm text-xxs font-bold text-primary">{invoice.id}</td>
                      <td className="p-sm text-xxs text-secondary">{invoice.date}</td>
                      <td className="p-sm text-xxs font-semibold text-primary">{invoice.amount}</td>
                      <td className="p-sm text-xxs">
                        {/* Dynamic Button 3: Download invoice receipt */}
                        <button 
                          className="btn flex items-center gap-xs"
                          style={{ 
                            padding: '3px 6px', 
                            fontSize: '8px', 
                            borderRadius: '4px', 
                            border: '1px solid var(--success-color)', 
                            backgroundColor: 'var(--success-light)',
                            color: 'var(--success-color)',
                            fontWeight: 'bold',
                            cursor: 'pointer' 
                          }}
                          onClick={() => handleDownloadInvoice(invoice.id, invoice.amount, invoice.period)}
                          disabled={downloadingInvId === invoice.id}
                        >
                          {downloadingInvId === invoice.id ? (
                            <>
                              <RefreshCw size={8} className="spin" /> DL...
                            </>
                          ) : (
                            <>
                              <Download size={8} /> Download Receipt
                            </>
                          )}
                        </button>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5deg); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
};

export default GovtSubscription;
