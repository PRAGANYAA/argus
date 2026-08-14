import React, { useState } from 'react';
import { mockFreeLawyers, mockPaidLawyers } from '../data/mockData';
import { Scale, Users, Mail, Phone, UploadCloud, CheckCircle, Send, X, PhoneCall } from 'lucide-react';

const expandedDirectory = [
  { id: 1, name: "Lawyer 1", specialty: "Criminal Defense (Pro Bono)", contact: "lawyer1@legalaid.org", experience: "8 Years", fees: "₹0 (Pro Bono)" },
  { id: 2, name: "Lawyer 2", specialty: "Parole & Bail (Pro Bono)", contact: "lawyer2@legalaid.org", experience: "12 Years", fees: "₹0 (Pro Bono)" },
  { id: 3, name: "Lawyer 3", specialty: "Human Rights (Pro Bono)", contact: "lawyer3@legalaid.org", experience: "5 Years", fees: "₹0 (Pro Bono)" },
  { id: 4, name: "Lawyer 4", specialty: "Senior Criminal Defense", contact: "lawyer4@legalaid.org", experience: "20 Years", fees: "₹5000/Consultation" },
  { id: 5, name: "Lawyer 5", specialty: "High Court Appeals", contact: "lawyer5@legalaid.org", experience: "15 Years", fees: "₹4000/Consultation" },
  { id: 6, name: "Lawyer 6", specialty: "Criminal Trials & Bail", contact: "lawyer6@legalaid.org", experience: "10 Years", fees: "₹3500/Consultation" },
  { id: 7, name: "Lawyer 7", specialty: "Juvenile Justice (Pro Bono)", contact: "lawyer7@legalaid.org", experience: "6 Years", fees: "₹0 (Pro Bono)" },
  { id: 8, name: "Lawyer 8", specialty: "Women Rights Advocacy", contact: "lawyer8@legalaid.org", experience: "9 Years", fees: "₹4500/Consultation" },
];

const LawyerConnect = () => {
  const [eligibilityStatus, setEligibilityStatus] = useState('pending'); // pending, checking, eligible, not_eligible
  const [income, setIncome] = useState('');
  
  // Modals state
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showDirectoryModal, setShowDirectoryModal] = useState(false);

  // Chat message states
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  
  // Directory search state
  const [searchQuery, setSearchQuery] = useState('');

  const handleVerify = () => {
    setEligibilityStatus('checking');
    setTimeout(() => {
      if (parseInt(income) < 300000) {
        setEligibilityStatus('eligible');
      } else {
        setEligibilityStatus('not_eligible');
      }
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const botMsg = { 
        sender: 'lawyer', 
        text: `Thank you for contacting me. I have received your request regarding inmate Ramesh Kumar's case. I will review the case files and get back to you shortly.` 
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const openChat = (lawyer) => {
    setSelectedLawyer(lawyer);
    setChatMessages([
      { sender: 'lawyer', text: `Hello, I am ${lawyer.name}. How can I assist you with your legal matters today?` }
    ]);
    setShowChatModal(true);
  };

  const openCall = (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowCallModal(true);
  };

  const filteredDirectory = expandedDirectory.filter(lawyer => 
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lawyer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-md h-full">
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Connect with Lawyers</h1>
          <p className="text-muted text-sm mt-xs">Find legal representation based on your eligibility and needs.</p>
        </div>
      </div>

      {eligibilityStatus === 'pending' || eligibilityStatus === 'checking' ? (
        <div className="flex flex-col items-center justify-center gap-md text-center" style={{ marginTop: '5vh' }}>
          <div className="card p-md" style={{ width: '500px', textAlign: 'left' }}>
            <h2 className="h2 mb-sm flex items-center gap-sm" style={{ fontFamily: 'var(--font-family-serif)' }}><Scale size={20} className="text-primary"/> Free Legal Aid Eligibility Check</h2>
            <p className="text-sm text-muted mb-md">To connect with pro bono (free) lawyers under the Legal Services Authorities Act, please verify your underprivileged status.</p>
            
            <div className="form-group">
              <label className="form-label">Annual Family Income (₹)</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="e.g. 250000" 
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            
            <div className="form-group mt-sm">
              <label className="form-label">Upload Community / Income Certificate</label>
              <div className="flex flex-col items-center gap-sm p-sm" style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--bg-secondary)' }}>
                <UploadCloud size={24} className="text-muted" />
                <span className="text-xs text-muted">Click or drag file here to upload</span>
              </div>
            </div>

            <button 
              className="btn btn-primary w-full mt-md" 
              onClick={handleVerify}
              disabled={eligibilityStatus === 'checking' || !income}
            >
              {eligibilityStatus === 'checking' ? 'Analyzing Credentials...' : 'Check Eligibility & Connect'}
            </button>
            
            <div className="mt-md text-center">
              <button className="btn btn-outline text-xs" onClick={() => setEligibilityStatus('not_eligible')}>
                Skip and view Paid Private Lawyers
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-md">
          <div className="flex justify-between items-center">
            <div className={`badge ${eligibilityStatus === 'eligible' ? 'badge-success' : 'badge-warning'} inline-block w-auto`} style={{ padding: '8px 16px', fontSize: '1rem' }}>
              {eligibilityStatus === 'eligible' ? 'Status: Eligible for Free Legal Aid' : 'Status: General Category (Paid Services)'}
            </div>
            <button className="btn btn-outline text-xs" onClick={() => setEligibilityStatus('pending')}>
              Recheck Eligibility
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-md">
            {(eligibilityStatus === 'eligible' ? mockFreeLawyers : mockPaidLawyers).map((lawyer, idx) => (
              <div key={idx} className="card">
                <div className="card-header bg-secondary" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <div className="flex items-center gap-sm">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: eligibilityStatus === 'eligible' ? 'var(--success-color)' : 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {lawyer.name.charAt(7) || 'L'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{lawyer.name}</h3>
                      <p className="text-xs text-muted">{lawyer.specialty}</p>
                    </div>
                  </div>
                </div>
                <div className="card-body flex flex-col gap-sm">
                  <div className="flex justify-between border-b pb-xs" style={{ borderBottomColor: 'var(--border-color)' }}>
                    <span className="text-xs text-muted">Experience</span>
                    <span className="text-xs font-semibold">{lawyer.experience}</span>
                  </div>
                  <div className="flex justify-between border-b pb-xs" style={{ borderBottomColor: 'var(--border-color)' }}>
                    <span className="text-xs text-muted">{eligibilityStatus === 'eligible' ? 'Fees' : 'Consultation Fee'}</span>
                    <span className={`text-xs font-semibold ${eligibilityStatus === 'eligible' ? 'text-success' : ''}`}>
                      {eligibilityStatus === 'eligible' ? '₹0 (Pro Bono)' : lawyer.fees}
                    </span>
                  </div>
                  
                  <div className="flex gap-sm mt-sm">
                    <button className="btn btn-primary w-full" style={{ padding: '8px', fontSize: '0.8rem' }} onClick={() => openChat(lawyer)}><Mail size={14} className="mr-xs"/> Message</button>
                    <button className="btn btn-outline w-full" style={{ padding: '8px', fontSize: '0.8rem' }} onClick={() => openCall(lawyer)}><Phone size={14} className="mr-xs"/> Call</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card mt-md bg-primary-light" style={{ border: '1px solid var(--primary-color)' }}>
             <div className="card-body flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary flex items-center gap-sm"><CheckCircle size={18}/> Need more options?</h3>
                  <p className="text-sm text-secondary">Our directory contains over 500 verified lawyers across various jurisdictions.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowDirectoryModal(true)}>Search Full Directory</button>
             </div>
          </div>
        </div>
      )}

      {/* MODAL: Chat Interface */}
      {showChatModal && selectedLawyer && (
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
          <div className="card" style={{ width: '400px', height: '500px', backgroundColor: 'var(--bg-card)', border: 'none' }}>
            <div className="card-header bg-primary" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
              <h3 className="card-title" style={{ color: 'white' }}>Chat with {selectedLawyer.name}</h3>
              <button onClick={() => setShowChatModal(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div className="card-body flex flex-col gap-sm" style={{ padding: '16px', overflow: 'hidden', height: 'calc(100% - 60px)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '5px' }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.sender === 'user' ? 'var(--primary-color)' : 'var(--bg-color)',
                    color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                    borderBottomRightRadius: msg.sender === 'user' ? '4px' : 'var(--border-radius-md)',
                    borderBottomLeftRadius: msg.sender === 'lawyer' ? '4px' : 'var(--border-radius-md)'
                  }}>
                    {msg.text}
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="flex gap-sm mt-sm pt-sm border-t" style={{ borderTopColor: 'var(--border-color)' }}>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Type a message..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{ padding: '8px 12px' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 12px' }}>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Call Dialing Interface */}
      {showCallModal && selectedLawyer && (
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
          <div className="card p-lg text-center items-center justify-between" style={{ width: '350px', height: '350px', backgroundColor: 'var(--bg-card)' }}>
            <div className="mt-md" style={{ padding: '24px', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}>
              <PhoneCall size={48} />
            </div>
            
            <div>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', margin: '10px 0 5px 0' }}>Calling {selectedLawyer.name}</h3>
              <p className="text-sm text-muted">Establishing secure connection...</p>
              <p className="text-xs text-secondary mt-xs" style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>Pro Bono Legal Line</p>
            </div>

            <button 
              className="btn btn-primary w-full mt-lg" 
              style={{ backgroundColor: 'var(--danger-color)', color: 'white' }}
              onClick={() => setShowCallModal(false)}
            >
              Cancel Call
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Search Full Directory */}
      {showDirectoryModal && (
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
          <div className="card" style={{ width: '650px', maxHeight: '500px', backgroundColor: 'var(--bg-card)', border: 'none' }}>
            <div className="card-header">
              <h3 className="card-title">Attorneys Directory</h3>
              <button onClick={() => setShowDirectoryModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div className="p-md border-b" style={{ borderBottomColor: 'var(--border-color)' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="card-body" style={{ overflowY: 'auto', padding: 0 }}>
              <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th className="p-md text-sm font-semibold text-secondary">Attorney</th>
                    <th className="p-md text-sm font-semibold text-secondary">Specialization</th>
                    <th className="p-md text-sm font-semibold text-secondary">Experience</th>
                    <th className="p-md text-sm font-semibold text-secondary">Fee Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDirectory.map(lawyer => (
                    <tr key={lawyer.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td className="p-md text-sm font-bold">{lawyer.name}</td>
                      <td className="p-md text-sm">{lawyer.specialty}</td>
                      <td className="p-md text-sm">{lawyer.experience}</td>
                      <td className="p-md text-sm font-semibold">{lawyer.fees}</td>
                    </tr>
                  ))}
                  {filteredDirectory.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-lg text-center text-sm text-muted">No lawyers match your query.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LawyerConnect;
