import React, { useState } from 'react';
import { FileText, Send, CheckCircle2, Download, Scale, Clock, AlertCircle } from 'lucide-react';

const mockPetitions = [
  {
    id: "PET-2026-081",
    client: "Ramesh Kumar (INM-1092)",
    petitionType: "Section 436A CrPC Speedy Bail Petition",
    court: "District Court Room 4",
    status: "Drafted",
    dateCreated: "2026-08-14",
    content: "MAY IT PLEASE YOUR HONOUR: The applicant has been held in judicial custody for a period exceeding 50% of the maximum imprisonment prescribed under Sec 379 IPC without chargesheet finalization. Praying for immediate release on personal bond."
  },
  {
    id: "PET-2026-042",
    client: "Suresh Patil (INM-4081)",
    petitionType: "Regular Bail Petition",
    court: "High Court Bench B",
    status: "Submitted to Court",
    dateCreated: "2026-08-11",
    content: "APPLICATION FOR BAIL UNDER SEC 439 CrPC: Subject is sole breadwinner of family with no risk of tampering with evidence. Cooperative with investigating officer."
  }
];

const LawyerPetitions = () => {
  const [petitions, setPetitions] = useState(mockPetitions);
  const [selectedPet, setSelectedPet] = useState(mockPetitions[0]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // New Petition Form State
  const [clientName, setClientName] = useState('');
  const [petitionType, setPetitionType] = useState('Section 436A CrPC Speedy Bail Petition');
  const [courtName, setCourtName] = useState('District Court Room 4');
  const [draftContent, setDraftContent] = useState('');

  const handleCreatePetition = (e) => {
    e.preventDefault();
    if (!clientName || !draftContent) return;

    const newPet = {
      id: `PET-2026-${Math.floor(100 + Math.random() * 900)}`,
      client: clientName,
      petitionType: petitionType,
      court: courtName,
      status: "Drafted",
      dateCreated: new Date().toISOString().split('T')[0],
      content: draftContent
    };

    setPetitions(prev => [newPet, ...prev]);
    setSelectedPet(newPet);
    setClientName('');
    setDraftContent('');
    setShowNewModal(false);
    setToastMessage(`Court petition ${newPet.id} created successfully!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleFilePetition = (id) => {
    setPetitions(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: 'Submitted to Court' };
      }
      return p;
    }));
    setSelectedPet(prev => ({ ...prev, status: 'Submitted to Court' }));
    setToastMessage(`Petition ${id} submitted to Registrar Court!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleDownloadDraft = (pet) => {
    const draftText = `
===================================================
      IN THE HIGH COURT OF JUDICATURE AT STATE
===================================================
Petition Registration No: ${pet.id}
Filing Date             : ${pet.dateCreated}
Assigned Court Bench    : ${pet.court}
Applicant / Inmate      : ${pet.client}
Petition Nature         : ${pet.petitionType}
===================================================

PETITION BRIEF:
${pet.content}

PRAYER:
Wherefore, it is respectfully prayed that this Hon'ble Court may be pleased to grant bail/release orders in the interest of justice.

Advocate Signature: Adv. S. Nair (Enrolment No: MAH/2018/9012)
    `;

    const blob = new Blob([draftText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Legal_Petition_${pet.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`Petition draft ${pet.id} exported for court filing!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Court Petition Filing Workspace</h1>
          <p className="text-muted text-sm mt-xs">Draft legal petitions, review statutory provisions, and submit bail applications to the Registrar Court.</p>
        </div>
        <button className="btn btn-primary text-xs" onClick={() => setShowNewModal(true)}>
          <FileText size={14} className="mr-xs" /> Draft New Petition
        </button>
      </div>

      {toastMessage && (
        <div className="toast-banner toast-success">
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* Grid: Petitions Directory (Left) & Active Draft Editor (Right) */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left: Petitions Queue */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Scale size={16} className="text-primary" /> Active Petition Filings</h3>
          </div>
          <div className="card-body p-0">
            <div className="flex flex-col">
              {petitions.map((pet, idx) => (
                <div 
                  key={pet.id}
                  onClick={() => setSelectedPet(pet)}
                  style={{
                    padding: '16px',
                    borderBottom: idx === petitions.length - 1 ? 'none' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    backgroundColor: selectedPet.id === pet.id ? 'var(--primary-light)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  className="table-row-hover flex justify-between items-center"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-primary">{pet.client}</span>
                      <span className={`badge ${pet.status === 'Submitted to Court' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '8px', padding: '2px 6px' }}>
                        {pet.status}
                      </span>
                    </div>
                    <span className="text-xxs text-secondary block mt-xs">{pet.petitionType}</span>
                    <span className="text-xxs text-muted block mt-xxs"><Clock size={10} className="inline mr-xs" /> Created: {pet.dateCreated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Petition Inspector & Draft Editor */}
        <div className="card" style={{ flex: 1.3 }}>
          <div className="card-header border-b flex justify-between items-center" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><FileText size={16} className="text-primary" /> Draft Inspector: {selectedPet.id}</h3>
            <span className="badge badge-primary" style={{ fontSize: '8px' }}>{selectedPet.court}</span>
          </div>

          <div className="card-body flex flex-col gap-md">
            <div>
              <span className="text-xxs text-muted font-bold block uppercase">Client / Applicant</span>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                {selectedPet.client}
              </h3>
              <span className="text-xs font-bold text-primary block mt-xs">{selectedPet.petitionType}</span>
            </div>

            <div>
              <span className="text-xxs text-muted font-bold block uppercase mb-xs">Legal Brief & Grounds</span>
              <div style={{ backgroundColor: '#faf7f2', border: '1px solid var(--border-color)', padding: '16px', borderRadius: 'var(--border-radius-sm)', fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.6', minHeight: '140px' }}>
                {selectedPet.content}
              </div>
            </div>

            <div className="flex gap-sm border-t pt-md" style={{ borderTopColor: 'var(--border-color)' }}>
              <button className="btn btn-outline text-xs w-full" onClick={() => handleDownloadDraft(selectedPet)}>
                <Download size={14} className="mr-xs" /> Export Petition PDF/Text
              </button>
              {selectedPet.status === 'Drafted' ? (
                <button className="btn btn-primary text-xs w-full" onClick={() => handleFilePetition(selectedPet.id)}>
                  <Send size={14} className="mr-xs" /> Submit Petition to Registrar
                </button>
              ) : (
                <div className="toast-banner toast-success text-center justify-center w-full">
                  ✔ Submitted to Registrar Court (Hearing Scheduled)
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* MODAL: Draft New Petition */}
      {showNewModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(59, 50, 40, 0.45)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="card p-lg" style={{ width: '480px', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '15px', textAlign: 'center' }}>
              Draft New Court Petition
            </h3>

            <form onSubmit={handleCreatePetition} className="flex flex-col gap-md">
              <div className="form-group mb-0">
                <label className="form-label">Client Name & Inmate ID</label>
                <input 
                  type="text" 
                  className="form-control text-xs" 
                  placeholder="e.g. Ramesh Kumar (INM-1092)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Petition Provision Type</label>
                <select 
                  className="form-control text-xs"
                  value={petitionType}
                  onChange={(e) => setPetitionType(e.target.value)}
                >
                  <option value="Section 436A CrPC Speedy Bail Petition">Section 436A CrPC (Speedy Bail Petition)</option>
                  <option value="Regular Bail Petition (Sec 439 CrPC)">Regular Bail Petition (Sec 439 CrPC)</option>
                  <option value="Parole Extension Request">Parole Extension Request</option>
                  <option value="Medical Plea Extension">Medical Emergency Plea Extension</option>
                </select>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Assigned Court Bench</label>
                <input 
                  type="text" 
                  className="form-control text-xs"
                  value={courtName}
                  onChange={(e) => setCourtName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Legal Arguments & Brief Summary</label>
                <textarea 
                  className="form-control text-xs" 
                  rows="4"
                  placeholder="State ground for bail, time served ratio, good behavior credits..."
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  style={{ resize: 'none' }}
                  required
                />
              </div>

              <div className="flex gap-sm mt-xs">
                <button type="button" className="btn btn-outline w-full text-xs" onClick={() => setShowNewModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full text-xs">
                  Create Petition Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default LawyerPetitions;
