import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRights, mockHelplines } from '../data/mockData';
import { BookOpen, Phone, Info, Download, Search, CheckCircle } from 'lucide-react';

const KnowYourRights = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const filteredRights = mockRights.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inmateRights = filteredRights.filter(r => r.category === 'Inmate Rights');
  const familyRights = filteredRights.filter(r => r.category === 'Family Rights');
  const caseLaws = filteredRights.filter(r => r.category === 'Case Laws');

  const handleDownloadHandbook = () => {
    const handbookContent = `
===================================================
       STATE LEGAL AID & CITIZEN RIGHTS HANDBOOK
===================================================
Document Reference: HBK-RIGHTS-2026
Generated Date    : ${new Date().toISOString().split('T')[0]}
Jurisdiction      : State Judiciary & Constitutional Provisions
===================================================

1. RIGHTS OF THE INMATE:
---------------------------------------------------
- Right to Legal Counsel: Free legal assistance under Section 304 CrPC & Article 39A.
- Right Against Handcuffing: Handcuffing is prohibited unless explicit judicial authorization is granted (Prem Shankar Shukla v. Delhi Administration).
- Speedy Trial Guarantee: Under Section 436A CrPC, under-trials who served 50% max penalty qualify for bail.
- Medical & Sanitary Care: Guaranteed access to prison medical officers and sanitary facilities.

2. RIGHTS OF THE FAMILY:
---------------------------------------------------
- Right to Immediate Arrest Notification: Police must inform family/relatives immediately upon arrest (D.K. Basu Guidelines).
- Visitation Rights (Mulakat): Right to physical or virtual visitation twice a week.
- Access to Case Documents: Family members can request certified copies of FIR, remand orders, and charge sheets.

3. EMERGENCY HELPLINES:
---------------------------------------------------
- National Legal Services Authority (NALSA): 15100
- State Human Rights Commission: 1800-11-4430
- Police Emergency Control Room: 112
- Women & Children Legal Cell: 1091

===================================================
This document serves as an official citizen handbook.
    `;

    const blob = new Blob([handbookContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Legal_Rights_Handbook_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Legal Rights Handbook downloaded successfully!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-between items-center mb-sm">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Know Your Rights</h1>
          <p className="text-muted text-sm mt-xs">A comprehensive guide to legal rights, laws, and emergency helplines.</p>
        </div>
        <button className="btn btn-primary text-xs" onClick={handleDownloadHandbook}>
          <Download size={14} /> Download Rights Handbook
        </button>
      </div>

      {toastMessage && (
        <div className="toast-banner toast-success">
          <CheckCircle size={18} />
          {toastMessage}
        </div>
      )}

      {/* Search Input */}
      <div className="card p-sm flex items-center gap-sm">
        <Search size={16} className="text-muted ml-xs" />
        <input 
          type="text" 
          className="form-control text-xs" 
          placeholder="Search legal rights, laws, or constitutional clauses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ border: 'none', boxShadow: 'none' }}
        />
      </div>

      <div className="grid grid-cols-3 gap-md">
        {/* Main Content Area - 2 Columns */}
        <div className="flex flex-col gap-md" style={{ gridColumn: 'span 2' }}>
          
          <div className="card">
            <div className="card-header bg-primary-light">
              <h3 className="card-title text-primary"><BookOpen size={18}/> Inmate & Family Rights</h3>
            </div>
            <div className="card-body grid grid-cols-2 gap-md">
              <div>
                <h4 className="font-semibold mb-sm border-b pb-xs">Rights of the Inmate</h4>
                <div className="flex flex-col gap-sm mt-sm">
                  {inmateRights.map(right => (
                    <div key={right.id} className="p-sm bg-secondary rounded" style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)' }}>
                      <p className="font-semibold text-sm">{right.title}</p>
                      <p className="text-xs text-muted mt-xs">{right.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-sm border-b pb-xs">Rights of the Family</h4>
                <div className="flex flex-col gap-sm mt-sm">
                  {familyRights.map(right => (
                    <div key={right.id} className="p-sm bg-secondary rounded" style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)' }}>
                      <p className="font-semibold text-sm">{right.title}</p>
                      <p className="text-xs text-muted mt-xs">{right.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title"><Info size={18}/> Relevant Case Laws & Articles</h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-2 gap-md">
                {caseLaws.map(law => (
                  <div key={law.id} className="flex gap-sm p-sm border rounded" style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)' }}>
                    <div className="text-primary font-bold text-lg mt-xs">{law.title.split(' ')[1]}</div>
                    <div>
                      <p className="font-semibold text-sm">{law.title}</p>
                      <p className="text-xs text-muted mt-xs">{law.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="card bg-warning-light" style={{ backgroundColor: 'var(--warning-light)', border: '1px solid var(--warning-color)' }}>
            <div className="card-body">
              <h4 className="font-semibold text-warning" style={{ color: 'var(--warning-color)' }}>Important Notice</h4>
              <p className="text-sm mt-xs">The rights and laws listed above are general guidelines. The specific application may vary depending on the nature of the case, the jurisdiction, and recent judicial rulings. Always consult with a qualified legal professional for advice tailored to your exact situation.</p>
            </div>
          </div>

        </div>

        {/* Sidebar - Helplines */}
        <div className="flex flex-col gap-md" style={{ gridColumn: 'span 1' }}>
          <div className="card" style={{ height: '100%' }}>
            <div className="card-header" style={{ backgroundColor: '#fef2f2' }}>
              <h3 className="card-title" style={{ color: 'var(--danger-color)' }}><Phone size={18}/> Emergency Helplines</h3>
            </div>
            <div className="card-body flex flex-col gap-md">
              <p className="text-sm text-muted">Directly contact these authorities in case of rights violations or emergencies.</p>
              
              {mockHelplines.map((helpline, idx) => (
                <div key={idx} className="flex justify-between items-center p-sm border-b pb-sm" style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{helpline.name}</span>
                    <span className="text-xs text-muted">24/7 Available</span>
                  </div>
                  <a href={`tel:${helpline.number}`} className="btn btn-outline text-primary font-bold border-primary" style={{ padding: '4px 12px', borderColor: 'var(--primary-color)' }}>
                    {helpline.number}
                  </a>
                </div>
              ))}

              <div className="mt-md p-md bg-secondary rounded" style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', textAlign: 'center' }}>
                <p className="font-semibold text-sm mb-xs">Need Legal Representation?</p>
                <p className="text-xs text-muted mb-sm">Check your eligibility for free legal aid or connect with top lawyers.</p>
                <button className="btn btn-primary w-full text-xs" onClick={() => navigate('/family/lawyer-connect')}>Go to Lawyer Connect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowYourRights;
