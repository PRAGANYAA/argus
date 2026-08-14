import React, { useState } from 'react';
import { BookOpen, PlusCircle, CheckCircle2, ShieldCheck, Download, Search, FileText } from 'lucide-react';

const mockPolicies = [
  {
    id: "POL-2026-01",
    title: "Mandatory Under-Trial 50% Term Audit Circular",
    category: "Prison Reform Directive",
    dateEnacted: "2026-07-01",
    status: "Enacted",
    summary: "All state facility wardens are mandated to perform monthly automated audits of under-trials who have served 50% or more of maximum penalty under Section 436A CrPC."
  },
  {
    id: "POL-2026-02",
    title: "State Legal Aid Fund Subsidization Guidelines",
    category: "Judicial Welfare Directive",
    dateEnacted: "2026-08-10",
    status: "Enacted",
    summary: "Annual income threshold for 100% free legal counsel representation is fixed at ₹1,50,000 per annum across all district legal services authorities."
  },
  {
    id: "POL-2026-03",
    title: "Vocational Skill Accreditation & Behavior Credits Multiplier",
    category: "Rehabilitation Policy",
    dateEnacted: "Drafting",
    status: "Under Review",
    summary: "Proposal to grant 1.5x behavior credit multipliers for inmates completing certified carpentry, computer literacy, and vocational manufacturing hours."
  }
];

const GovtPolicies = () => {
  const [policies, setPolicies] = useState(mockPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState(mockPolicies[0]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Prison Reform Directive');
  const [newSummary, setNewSummary] = useState('');

  const filteredPolicies = policies.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePolicy = (e) => {
    e.preventDefault();
    if (!newTitle || !newSummary) return;

    const newPol = {
      id: `POL-2026-0${policies.length + 1}`,
      title: newTitle,
      category: newCategory,
      dateEnacted: new Date().toISOString().split('T')[0],
      status: "Enacted",
      summary: newSummary
    };

    setPolicies(prev => [newPol, ...prev]);
    setSelectedPolicy(newPol);
    setNewTitle('');
    setNewSummary('');
    setShowNewModal(false);
    setToastMessage(`Policy circular ${newPol.id} enacted successfully!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleDownloadCircular = (policy) => {
    const circularText = `
===================================================
   DEPARTMENT OF JUSTICE & PRISON ADMINISTRATION
===================================================
Official Directive Ref: ${policy.id}
Date of Issue         : ${policy.dateEnacted}
Category              : ${policy.category}
Status                : ${policy.status.toUpperCase()}
===================================================

DIRECTIVE TITLE:
${policy.title}

PROVISIONS & SUMMARY:
${policy.summary}

===================================================
BY ORDER OF DIRECTORATE OF PRISON REFORMS & JUDICIAL WELFARE
    `;

    const blob = new Blob([circularText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Govt_Policy_Circular_${policy.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`Policy directive ${policy.id} downloaded!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Policy & Reform Directives Center</h1>
          <p className="text-muted text-sm mt-xs">Draft statewide judicial policies, issue reform mandates to wardens, and audit enacted directives.</p>
        </div>
        <button className="btn btn-primary text-xs" onClick={() => setShowNewModal(true)}>
          <PlusCircle size={14} className="mr-xs" /> Issue New Directive Circular
        </button>
      </div>

      {toastMessage && (
        <div className="toast-banner toast-success">
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* Grid: Policy Directory Left & Active Policy Inspector Right */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left: Policy Feed */}
        <div className="card">
          <div className="card-header border-b flex flex-col gap-xs items-start" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><BookOpen size={16} className="text-primary" /> State Policy Register</h3>
            <div className="w-full flex items-center gap-sm mt-xs">
              <Search size={14} className="text-muted" />
              <input 
                type="text" 
                className="form-control text-xs" 
                placeholder="Search policy title or reference ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '6px 12px' }}
              />
            </div>
          </div>

          <div className="card-body p-0">
            <div className="flex flex-col">
              {filteredPolicies.map((policy, idx) => (
                <div 
                  key={policy.id}
                  onClick={() => setSelectedPolicy(policy)}
                  style={{
                    padding: '16px',
                    borderBottom: idx === filteredPolicies.length - 1 ? 'none' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    backgroundColor: selectedPolicy.id === policy.id ? 'var(--primary-light)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  className="table-row-hover flex justify-between items-center"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-primary">{policy.id}</span>
                      <span className={`badge ${policy.status === 'Enacted' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '8px', padding: '2px 6px' }}>
                        {policy.status}
                      </span>
                    </div>
                    <span className="text-xs font-semibold block mt-xs">{policy.title}</span>
                    <span className="text-xxs text-muted block mt-xxs">Category: {policy.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Policy Details */}
        <div className="card" style={{ flex: 1.3 }}>
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><ShieldCheck size={16} className="text-primary" /> Policy Directive Details: {selectedPolicy.id}</h3>
          </div>

          <div className="card-body flex flex-col gap-md">
            <div>
              <span className="text-xxs text-muted font-bold block uppercase">Directive Title</span>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                {selectedPolicy.title}
              </h3>
              <span className="badge badge-primary mt-xs" style={{ fontSize: '8px' }}>{selectedPolicy.category}</span>
            </div>

            <div>
              <span className="text-xxs text-muted font-bold block uppercase mb-xs">Mandate Provisions & Directive Text</span>
              <div style={{ backgroundColor: '#faf7f2', border: '1px solid var(--border-color)', padding: '16px', borderRadius: 'var(--border-radius-sm)', fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.6', minHeight: '130px' }}>
                {selectedPolicy.summary}
              </div>
            </div>

            <div className="flex gap-sm border-t pt-md" style={{ borderTopColor: 'var(--border-color)' }}>
              <button className="btn btn-primary text-xs w-full" onClick={() => handleDownloadCircular(selectedPolicy)}>
                <Download size={14} className="mr-xs" /> Export Official Circular (PDF/Text)
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* MODAL: Enact New Policy */}
      {showNewModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(59, 50, 40, 0.45)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="card p-lg" style={{ width: '480px', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '15px', textAlign: 'center' }}>
              Enact New Reform Directive
            </h3>

            <form onSubmit={handleCreatePolicy} className="flex flex-col gap-md">
              <div className="form-group mb-0">
                <label className="form-label">Policy Title</label>
                <input 
                  type="text" 
                  className="form-control text-xs" 
                  placeholder="e.g. Prison Health & Sanitation Standard Directive 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Directive Category</label>
                <select 
                  className="form-control text-xs"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="Prison Reform Directive">Prison Reform Directive</option>
                  <option value="Judicial Welfare Directive">Judicial Welfare Directive</option>
                  <option value="Rehabilitation Policy">Rehabilitation Policy</option>
                  <option value="Under-Trial Rights Mandate">Under-Trial Rights Mandate</option>
                </select>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Policy Directives & Guidelines</label>
                <textarea 
                  className="form-control text-xs" 
                  rows="4"
                  placeholder="Detail the mandatory guidelines and requirements for prison wardens..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  style={{ resize: 'none' }}
                  required
                />
              </div>

              <div className="flex gap-sm mt-xs">
                <button type="button" className="btn btn-outline w-full text-xs" onClick={() => setShowNewModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full text-xs">
                  Enact & Publish Circular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default GovtPolicies;
