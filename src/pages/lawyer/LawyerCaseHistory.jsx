import React, { useState } from 'react';
import { History, User, Calendar, Clock, FileText, Scale, CheckCircle2, Search, PlusCircle, ShieldCheck, Download } from 'lucide-react';

const mockClientHistories = [
  {
    clientId: "CLI-1092",
    clientName: "Ramesh Kumar",
    inmateId: "INM-1092",
    crime: "Theft (Under Trial)",
    facility: "Central Jail, Block A",
    sentenceTotal: "36 Months",
    timeServed: "18 Months (50%)",
    status: "Bail Review Pending",
    timeline: [
      {
        id: "EVT-01",
        date: "14 Aug 2026",
        title: "Video Consultation & Bail Strategy",
        type: "Consultation",
        author: "Adv. S. Nair",
        desc: "Reviewed Sec 436A CrPC eligibility. Client has served 18 out of 36 months under-trial without chargesheet resolution. Drafted bail petition for District Court Room 4."
      },
      {
        id: "EVT-02",
        date: "02 Jul 2026",
        title: "Warden Conduct Log Received",
        type: "Official Log",
        author: "Warden Control",
        desc: "Received certified conduct report. 120 vocational carpentry hours logged with 0 disciplinary infractions. Behavior index: 92/100."
      },
      {
        id: "EVT-03",
        date: "15 May 2026",
        title: "Initial Legal Counsel Intake",
        type: "Intake",
        author: "DLSA Helpdesk",
        desc: "Initial intake interview conducted at Central Jail video dock. Client assigned pro-bono counsel under State Legal Aid Scheme."
      }
    ]
  },
  {
    clientId: "CLI-4081",
    clientName: "Suresh Patil",
    inmateId: "INM-4081",
    crime: "Financial Fraud (Under Trial)",
    facility: "District Jail A, Block B",
    sentenceTotal: "60 Months",
    timeServed: "24 Months (40%)",
    status: "Hearing Scheduled",
    timeline: [
      {
        id: "EVT-11",
        date: "11 Aug 2026",
        title: "High Court Bail Application Submission",
        type: "Court Filing",
        author: "Adv. S. Nair",
        desc: "Filed regular bail application under Sec 439 CrPC in High Court Bench B. Hearing fixed for Sept 12."
      },
      {
        id: "EVT-12",
        date: "20 Jun 2026",
        title: "In-Person Prison Consultation",
        type: "Consultation",
        author: "Adv. S. Nair",
        desc: "Discussed bank statement evidence audit and family financial hardship declaration."
      }
    ]
  },
  {
    clientId: "CLI-5510",
    clientName: "Vikram Roy",
    inmateId: "INM-5510",
    crime: "Assault (Convicted)",
    facility: "Sub-Jail B, Block C",
    sentenceTotal: "24 Months",
    timeServed: "16 Months (66%)",
    status: "Parole Eligible",
    timeline: [
      {
        id: "EVT-21",
        date: "08 Aug 2026",
        title: "Parole Recommendation Dispatch",
        type: "Parole Review",
        author: "Jailer Officer",
        desc: "Parole board recommendation sent to Directorate of Justice for early release consideration."
      }
    ]
  }
];

const LawyerCaseHistory = () => {
  const [clients, setClients] = useState(mockClientHistories);
  const [selectedClient, setSelectedClient] = useState(mockClientHistories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogModal, setShowLogModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // New Log Event Form
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('Consultation');
  const [eventDesc, setEventDesc] = useState('');

  const filteredClients = clients.filter(c => 
    c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.inmateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.crime.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddLogEvent = (e) => {
    e.preventDefault();
    if (!eventTitle || !eventDesc) return;

    const newEvt = {
      id: `EVT-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: eventTitle,
      type: eventType,
      author: "Adv. S. Nair",
      desc: eventDesc
    };

    const updatedTimeline = [newEvt, ...selectedClient.timeline];
    const updatedClient = { ...selectedClient, timeline: updatedTimeline };

    setClients(prev => prev.map(c => c.clientId === selectedClient.clientId ? updatedClient : c));
    setSelectedClient(updatedClient);

    setEventTitle('');
    setEventDesc('');
    setShowLogModal(false);
    setToastMessage(`Timeline entry added for ${selectedClient.clientName}!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleExportHistory = (client) => {
    const reportText = `
===================================================
      ATTORNEY CLIENT CASE HISTORY & TIMELINE
===================================================
Client Name     : ${client.clientName}
Inmate ID       : ${client.inmateId}
Offense / Charge: ${client.crime}
Detention Block : ${client.facility}
Time Served     : ${client.timeServed} / ${client.sentenceTotal}
Legal Status    : ${client.status}
Generated Date  : ${new Date().toISOString().split('T')[0]}
===================================================

CHRONOLOGICAL CASE EVENTS:
---------------------------------------------------
${client.timeline.map(e => `
[${e.date}] - ${e.title} (${e.type})
Logged By: ${e.author}
Notes    : ${e.desc}
---------------------------------------------------`).join('')}

Certified by Advocate S. Nair (State Legal Aid Representative)
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Case_History_${client.inmateId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`Case history for ${client.clientName} exported!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      
      {/* Title Header */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Client Case History & Timelines</h1>
          <p className="text-muted text-sm mt-xs">Inspect past consultations, court filings, and historical progress logs for each inmate client.</p>
        </div>
        <button className="btn btn-primary text-xs" onClick={() => setShowLogModal(true)}>
          <PlusCircle size={14} className="mr-xs" /> Log New Case Event
        </button>
      </div>

      {toastMessage && (
        <div className="toast-banner toast-success">
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* Grid: Client Roster Left (35%) & Case History Timeline Right (65%) */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* Left: Client Roster Card */}
        <div className="card">
          <div className="card-header border-b flex flex-col gap-xs items-start" style={{ borderBottomColor: 'var(--border-color)', padding: '16px 20px' }}>
            <h3 className="card-title text-sm"><User size={16} className="text-primary" /> Representation Roster</h3>
            <div className="w-full flex items-center gap-sm mt-xs">
              <Search size={14} className="text-muted" />
              <input 
                type="text" 
                className="form-control text-xs" 
                placeholder="Search by client name, crime or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '6px 12px' }}
              />
            </div>
          </div>

          <div className="card-body p-0">
            <div className="flex flex-col">
              {filteredClients.map((client, idx) => (
                <div 
                  key={client.clientId}
                  onClick={() => setSelectedClient(client)}
                  style={{
                    padding: '16px 20px',
                    borderBottom: idx === filteredClients.length - 1 ? 'none' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    backgroundColor: selectedClient.clientId === client.clientId ? 'var(--primary-light)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  className="table-row-hover flex justify-between items-center"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-primary">{client.clientName}</span>
                      <span className="badge badge-primary" style={{ fontSize: '8px', padding: '2px 6px' }}>{client.inmateId}</span>
                    </div>
                    <span className="text-xxs text-secondary block mt-xs">{client.crime}</span>
                    <span className="text-xxs text-muted block mt-xxs">Events Logged: {client.timeline.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Client Case Timeline Inspector */}
        <div className="card" style={{ flex: 1.4 }}>
          <div className="card-header border-b flex justify-between items-center" style={{ borderBottomColor: 'var(--border-color)', padding: '16px 20px' }}>
            <div className="flex items-center gap-sm">
              <History size={18} className="text-primary" />
              <div>
                <h3 className="card-title text-sm" style={{ margin: 0 }}>Timeline: {selectedClient.clientName}</h3>
                <span className="text-xxs text-muted block mt-xxs">{selectedClient.facility} • {selectedClient.inmateId}</span>
              </div>
            </div>
            <button className="btn btn-outline text-xxs" onClick={() => handleExportHistory(selectedClient)}>
              <Download size={12} className="mr-xs" /> Export Timeline Text
            </button>
          </div>

          <div className="card-body flex flex-col gap-md" style={{ padding: '24px' }}>
            
            {/* Client Summary Header Banner */}
            <div className="grid grid-cols-3 gap-sm p-sm text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
              <div>
                <span className="text-xxs text-muted font-bold uppercase block">Time Served</span>
                <span className="font-bold text-xs text-primary block mt-xxs">{selectedClient.timeServed}</span>
              </div>
              <div>
                <span className="text-xxs text-muted font-bold uppercase block">Total Term</span>
                <span className="font-bold text-xs text-secondary block mt-xxs">{selectedClient.sentenceTotal}</span>
              </div>
              <div>
                <span className="text-xxs text-muted font-bold uppercase block">Legal Status</span>
                <span className="font-bold text-xs text-success block mt-xxs">{selectedClient.status}</span>
              </div>
            </div>

            {/* Vertical Interactive Timeline */}
            <div>
              <span className="text-xxs text-muted font-bold uppercase block mb-md">Chronological Activity Log ({selectedClient.timeline.length} Events)</span>
              
              <div className="flex flex-col gap-md relative" style={{ borderLeft: '2px solid var(--primary-color)', paddingLeft: '20px', marginLeft: '10px' }}>
                {selectedClient.timeline.map((evt) => (
                  <div key={evt.id} className="relative flex flex-col gap-xs" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                    
                    {/* Timeline Bullet Node */}
                    <div style={{
                      position: 'absolute',
                      left: '-27px',
                      top: '2px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-color)',
                      border: '2px solid var(--bg-card)'
                    }} />

                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-primary">{evt.title}</span>
                      <span className="text-xxs text-muted flex items-center gap-xs"><Clock size={10} /> {evt.date}</span>
                    </div>

                    <div className="flex items-center gap-xs">
                      <span className="badge badge-primary text-xxs" style={{ fontSize: '8px', padding: '1px 6px' }}>{evt.type}</span>
                      <span className="text-xxs text-muted">Logged by: {evt.author}</span>
                    </div>

                    <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--border-radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '4px' }}>
                      {evt.desc}
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* MODAL: Log New Case Event */}
      {showLogModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(59, 50, 40, 0.45)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="card p-lg" style={{ width: '480px', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '15px', textAlign: 'center' }}>
              Log Event for {selectedClient.clientName}
            </h3>

            <form onSubmit={handleAddLogEvent} className="flex flex-col gap-md">
              <div className="form-group mb-0">
                <label className="form-label">Event Headline</label>
                <input 
                  type="text" 
                  className="form-control text-xs" 
                  placeholder="e.g. Virtual Hearing Prep & Witness Evidence Review"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Event Category</label>
                <select 
                  className="form-control text-xs"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="Consultation">Consultation Session</option>
                  <option value="Court Filing">Court Filing / Petition</option>
                  <option value="Warden Log">Warden Conduct Verification</option>
                  <option value="Bail Review">Bail Motion Review</option>
                </select>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Detailed Notes & Observations</label>
                <textarea 
                  className="form-control text-xs" 
                  rows="4"
                  placeholder="Detail consultation topics, client instructions, or hearing outcomes..."
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  style={{ resize: 'none' }}
                  required
                />
              </div>

              <div className="flex gap-sm mt-xs">
                <button type="button" className="btn btn-outline w-full text-xs" onClick={() => setShowLogModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full text-xs">
                  Save Timeline Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default LawyerCaseHistory;
