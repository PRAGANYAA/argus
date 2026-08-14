import React, { useState } from 'react';
import { mockInmate, mockWorkDone } from '../data/mockData';
import { Clock, AlertTriangle, Shield, Download, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EligibilityEngine = () => {
  const [showParoleModal, setShowParoleModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const totalDays = 3 * 365; // 3 years
  const servedDays = 180; // 6 months
  const creditDays = parseInt(mockInmate.goodBehaviorCredits.split(' ')[0]);
  const effectiveServed = servedDays + creditDays;
  const progressPercent = Math.min(100, Math.round((effectiveServed / totalDays) * 100));

  const handleDownloadReport = () => {
    const reportContent = `
===================================================
     ARGUS AI SENTENCE & ELIGIBILITY DIAGNOSTIC
===================================================
Report Reference   : RPT-ELIG-993201
Inmate Name        : ${mockInmate.name}
Inmate ID          : ${mockInmate.id}
Generated Timestamp: ${new Date().toISOString()}
===================================================

1. SENTENCE & TIME SERVED ANALYSIS:
- Total Sanctioned Sentence: ${mockInmate.sentenceTotal}
- Time Served (Physical)   : ${mockInmate.timeServed} (${servedDays} Days)
- Good Behavior Credits    : ${mockInmate.goodBehaviorCredits}
- Effective Time Counted   : ${effectiveServed} Days (${progressPercent}%)

2. ELIGIBILITY VERDICT & TRAJECTORY:
- Parole Review Eligibility: On track for review in 12 Months
- Minimum Mandate Served   : Compliant (Passed 50% Rule threshold for bail review)
- Warden Behavior Score    : 92/100 (Exemplary Conduct)

===================================================
Certified by State Judicial Analytics Platform
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Eligibility_Diagnostic_Report_${mockInmate.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Eligibility Diagnostic Report downloaded successfully!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="flex flex-col gap-md h-full">
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Release Eligibility Engine</h1>
          <p className="text-muted text-sm mt-xs">Track sentence progress, good behavior credits, and release eligibility.</p>
        </div>
        <button className="btn btn-primary text-xs" onClick={handleDownloadReport}>
          <Download size={14} /> Download Diagnostic Report
        </button>
      </div>

      {toastMessage && (
        <div className="toast-banner toast-success">
          <CheckCircle size={18} />
          {toastMessage}
        </div>
      )}

      <div className="grid grid-cols-3 gap-md">
        
        {/* Early Release Overview */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header bg-primary-light" style={{ backgroundColor: 'var(--primary-light)' }}>
             <h2 className="card-title text-primary">Early Release Analysis</h2>
          </div>
          <div className="card-body">
            <div className="flex justify-between items-end mb-md">
              <p className="text-sm text-secondary max-w-md">Based on current trajectory and earned credits, the inmate is on track for standard release. Eligibility for early parole review is approaching.</p>
              <div className="badge badge-success" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
                Review in 12 Months
              </div>
            </div>
            
            <div className="mt-lg">
              <div className="flex justify-between text-sm font-semibold mb-sm">
                <span>Sentence Progress (incl. Credits)</span>
                <span className="text-primary text-lg">{progressPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '16px', backgroundColor: 'var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--primary-color)', borderRadius: '8px' }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted mt-sm font-semibold">
                <span>Admission: {mockInmate.admissionDate}</span>
                <span>Expected Release: {mockInmate.expectedRelease}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <div className="card-header">
            <h3 className="card-title"><Clock size={18}/> Time Breakdown</h3>
          </div>
          <div className="card-body flex flex-col justify-center gap-md">
            <div className="flex justify-between items-center border-b pb-sm" style={{ borderBottomColor: 'var(--border-color)' }}>
              <span className="text-sm text-muted">Total Sentence</span>
              <span className="font-bold text-lg">{mockInmate.sentenceTotal}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-sm" style={{ borderBottomColor: 'var(--border-color)' }}>
              <span className="text-sm text-muted">Time Served</span>
              <span className="font-bold text-lg">{mockInmate.timeServed}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-sm" style={{ borderBottomColor: 'var(--border-color)' }}>
              <span className="text-sm text-muted">Earned Credits</span>
              <span className="font-bold text-lg text-success" style={{ color: 'var(--success-color)' }}>+{mockInmate.goodBehaviorCredits}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted">Remaining (Approx)</span>
              <span className="font-bold text-lg text-primary">2 Yrs, 5 Mos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-md mt-sm">
        {/* Work & Rehabilitation Bar Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title"><Shield size={18}/> Work Hours Logged</h3>
          </div>
          <div className="card-body" style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockWorkDone} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--border-radius-sm)', border: 'none', boxShadow: 'var(--shadow-md)' }}
                  cursor={{ fill: 'var(--bg-secondary)' }}
                />
                <Bar dataKey="hours" fill="var(--primary-color)" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-md">
           <div className="card border-warning" style={{ border: '1px solid var(--warning-color)', flex: 1 }}>
            <div className="card-body flex gap-md items-start">
              <AlertTriangle size={28} className="text-warning flex-shrink-0" style={{ color: 'var(--warning-color)' }} />
              <div>
                <h3 className="font-semibold text-lg mb-xs" style={{ color: 'var(--warning-color)' }}>Parole Eligibility Notice</h3>
                <p className="text-sm text-secondary mt-xs" style={{ lineHeight: '1.6' }}>
                  Under current guidelines, the inmate may be eligible to apply for standard parole after serving 1/3rd of the total sentence (12 months). Consistent good behavior and participation in rehabilitation programs will positively impact the Parole Board's decision.
                </p>
                <button className="btn btn-outline mt-md text-xs" onClick={() => setShowParoleModal(true)}>View Parole Procedures</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parole Procedures Modal */}
      {showParoleModal && (
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
          <div className="card p-lg" style={{ width: '500px', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '15px', textAlign: 'center' }}>
              Standard Parole Procedures
            </h3>
            
            <div className="flex flex-col gap-sm text-sm text-secondary" style={{ lineHeight: '1.5', padding: '10px 0' }}>
              <p>To request parole for an eligible inmate, please complete the following steps:</p>
              
              <div style={{ paddingLeft: '15px' }}>
                <p><strong>Step 1: Obtain Good Conduct Certificate</strong><br />Request the Prison Superintendent / Warden to issue a Conduct Log verifying labor hours and behavior credits.</p>
                <p className="mt-xs"><strong>Step 2: Submit Parole Application</strong><br />Fill out the parole request petition (available in the <em>Legal Documents</em> section) and file it in court.</p>
                <p className="mt-xs"><strong>Step 3: State Board Evaluation</strong><br />The District Legal Services Authority and the Parole Board will inspect warden logs, case history, and family status.</p>
                <p className="mt-xs"><strong>Step 4: Release Authorization</strong><br />If approved, the court issues a release order to be executed by prison administration.</p>
              </div>
            </div>

            <div className="flex gap-sm mt-md">
              <button className="btn btn-primary w-full" onClick={() => setShowParoleModal(false)}>
                Acknowledge Guidelines
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityEngine;
