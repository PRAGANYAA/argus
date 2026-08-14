import React, { useState } from 'react';
import { initialJailerNotifications } from '../../data/jailerMockData';
import { Bell, UserPlus, FileText, CheckCircle, Info, Calendar, Clock, AlertTriangle, Filter, CheckSquare, MessageSquare, Send, RefreshCw } from 'lucide-react';

const JailerNotifications = () => {
  const [notifications, setNotifications] = useState(initialJailerNotifications);
  const [selectedNote, setSelectedNote] = useState(initialJailerNotifications[0]);
  const [activeTab, setActiveTab] = useState('all'); // all, action, task_info
  
  // Dynamic action loading states
  const [resolvingId, setResolvingId] = useState(null);
  
  // Custom user interactions states
  const [dlsaComments, setDlsaComments] = useState('');
  const [blockCCheckbox, setBlockCCheckbox] = useState({
    shiftVerified: false,
    timesheetSigned: false,
    multiplierChecked: false
  });

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id && n.status === 'unread') {
        return { ...n, status: 'read' };
      }
      return n;
    }));
    
    // Sync current selection view
    if (selectedNote.id === id && selectedNote.status === 'unread') {
      setSelectedNote(prev => ({ ...prev, status: 'read' }));
    }
  };

  const [toastMessage, setToastMessage] = useState('');

  // Simulate dynamic registration delay
  const handleResolveAction = (note) => {
    if (note.type !== 'action') return;
    setResolvingId(note.id);

    setTimeout(() => {
      setNotifications(prev => prev.map(n => {
        if (n.id === note.id) {
          return { ...n, status: 'completed', desc: `RESOLVED: Inmate ${note.actionPayload.name} successfully registered to cell block.` };
        }
        return n;
      }));

      setSelectedNote(prev => ({
        ...prev,
        status: 'completed',
        desc: `RESOLVED: Inmate ${note.actionPayload.name} successfully registered to cell block.`
      }));

      setResolvingId(null);
      setToastMessage(`Successfully registered ${note.actionPayload.name} into Cell Registry!`);
      setTimeout(() => setToastMessage(''), 4500);
    }, 1200);
  };

  // Resolve DLSA audit directive
  const handleResolveAudit = (e) => {
    e.preventDefault();
    if (!dlsaComments.trim()) return;

    setNotifications(prev => prev.map(n => {
      if (n.id === 'J-NOTE-2') {
        return { ...n, status: 'completed', desc: `RESOLVED: Verification logs dispatched to DLSA. Remarks: "${dlsaComments}"` };
      }
      return n;
    }));

    setSelectedNote(prev => ({
      ...prev,
      status: 'completed',
      desc: `RESOLVED: Verification logs dispatched to DLSA. Remarks: "${dlsaComments}"`
    }));

    setDlsaComments('');
  };

  // Resolve Block C task compliance
  const handleResolveBlockC = () => {
    setNotifications(prev => prev.map(n => {
      if (n.id === 'J-NOTE-3') {
        return { ...n, status: 'completed', desc: "RESOLVED: Block C compliance logs certified and countersigned by Warden." };
      }
      return n;
    }));

    setSelectedNote(prev => ({
      ...prev,
      status: 'completed',
      desc: "RESOLVED: Block C compliance logs certified and countersigned by Warden."
    }));
  };

  // Filters
  const filteredNotes = notifications.filter(note => {
    if (activeTab === 'all') return true;
    if (activeTab === 'action') return note.type === 'action';
    if (activeTab === 'task_info') return note.type === 'task' || note.type === 'info';
    return true;
  });

  const pendingActionsCount = notifications.filter(n => n.type === 'action' && n.status !== 'completed').length;

  return (
    <div className="flex flex-col gap-md" style={{ width: '100%' }}>
      
      {/* Title Header with dynamic pending badge */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Warden Requests & Alerts</h1>
          <p className="text-muted text-sm mt-xs">
            Manage incoming court mandates, DLSA audits, and registry tasks. 
            {pendingActionsCount > 0 && (
              <span className="font-bold text-danger ml-xs" style={{ color: 'var(--danger-color)' }}>
                ({pendingActionsCount} Actions Pending)
              </span>
            )}
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="toast-banner toast-success">
          <CheckCircle size={18} />
          {toastMessage}
        </div>
      )}

      {/* Split grid */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Side: Notification Feed Card with filter tabs */}
        <div className="card">
          
          {/* Header & Filter Tabs */}
          <div className="card-header border-b flex flex-col gap-sm items-start" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm"><Bell size={16} className="text-primary" /> Alerts Registry Queue</h3>
            
            {/* Filter buttons tab bar */}
            <div className="flex gap-xs mt-xs" style={{ width: '100%' }}>
              <button 
                className={`btn text-xxs ${activeTab === 'all' ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '6px 10px', borderRadius: '20px' }}
                onClick={() => setActiveTab('all')}
              >
                All ({notifications.length})
              </button>
              <button 
                className={`btn text-xxs ${activeTab === 'action' ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '6px 10px', borderRadius: '20px' }}
                onClick={() => setActiveTab('action')}
              >
                Action Required ({notifications.filter(n => n.type === 'action').length})
              </button>
              <button 
                className={`btn text-xxs ${activeTab === 'task_info' ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '6px 10px', borderRadius: '20px' }}
                onClick={() => setActiveTab('task_info')}
              >
                Directives & Tasks ({notifications.filter(n => n.type === 'task' || n.type === 'info').length})
              </button>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="flex flex-col">
              {filteredNotes.map((note, idx) => (
                <div 
                  key={note.id}
                  onClick={() => { setSelectedNote(note); markAsRead(note.id); }}
                  style={{
                    padding: '16px',
                    borderBottom: idx === filteredNotes.length - 1 ? 'none' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    backgroundColor: selectedNote.id === note.id ? 'var(--primary-light)' : 'transparent',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                  className="table-row-hover flex gap-sm"
                >
                  {/* Unread dot */}
                  {note.status === 'unread' && (
                    <div style={{
                      position: 'absolute',
                      left: '6px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-color)'
                    }}></div>
                  )}

                  {/* Node Type icon */}
                  <div style={{
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: 
                      note.type === 'action' ? 'var(--warning-light)' : 
                      note.type === 'task' ? 'var(--danger-light)' : 'var(--primary-light)',
                    color: 
                      note.type === 'action' ? 'var(--warning-color)' : 
                      note.type === 'task' ? 'var(--danger-color)' : 'var(--primary-color)',
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {note.type === 'action' ? <UserPlus size={16} /> : <FileText size={16} />}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-xs text-primary">{note.title}</span>
                      <span className={`badge ${
                        note.status === 'completed' ? 'badge-success' :
                        note.type === 'action' ? 'badge-warning' : 'badge-primary'
                      }`} style={{ fontSize: '9px', padding: '2px 6px' }}>
                        {note.status === 'completed' ? 'Resolved' : note.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xxs text-secondary mt-xs" style={{ lineClamp: 1, WebkitLineClamp: 1, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', lineHeight: '1.4' }}>
                      {note.desc}
                    </p>
                  </div>

                </div>
              ))}
              
              {filteredNotes.length === 0 && (
                <div className="p-lg text-center text-sm text-muted">No alerts found in this category.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Action Details Console */}
        <div className="card">
          <div className="card-header border-b" style={{ borderBottomColor: 'var(--border-color)', padding: '16px' }}>
            <h3 className="card-title text-sm">Action Console</h3>
          </div>
          <div className="card-body">
            {selectedNote ? (
              <div className="flex flex-col gap-md" style={{ lineHeight: '1.5' }}>
                <div>
                  <h3 className="font-semibold text-sm text-primary" style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.1rem' }}>{selectedNote.title}</h3>
                  <span className="text-xxs text-muted font-bold block uppercase mt-xs">Reference: {selectedNote.id}</span>
                </div>
                
                <p className="text-xs text-secondary" style={{ lineHeight: '1.5' }}>{selectedNote.desc}</p>
                
                {/* INTERACTIVE FORM 1: Add Prisoner Action */}
                {selectedNote.type === 'action' && selectedNote.actionPayload && (
                  <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '15px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }} className="flex flex-col gap-sm">
                    <span className="text-xxs text-muted uppercase font-bold block border-b pb-xs" style={{ borderBottomColor: 'var(--border-color)' }}>Warrant Details</span>
                    <div className="grid grid-cols-2 gap-sm text-xs">
                      <div>
                        <span className="text-muted block">Inmate Name</span>
                        <span className="font-semibold block text-primary">{selectedNote.actionPayload.name}</span>
                      </div>
                      <div>
                        <span className="text-muted block">Charge</span>
                        <span className="font-semibold block text-primary">{selectedNote.actionPayload.crime}</span>
                      </div>
                      <div>
                        <span className="text-muted block">Sentence</span>
                        <span className="font-semibold block text-secondary">{selectedNote.actionPayload.sentence}</span>
                      </div>
                      <div>
                        <span className="text-muted block">Cell Block</span>
                        <span className="font-semibold block text-secondary">{selectedNote.actionPayload.block}</span>
                      </div>
                    </div>

                    <div className="text-xxs text-secondary mt-xs" style={{ lineHeight: '1.4' }}>
                      <strong>Officer comments:</strong> {selectedNote.actionPayload.caseSummary}
                    </div>

                    {selectedNote.status !== 'completed' && (
                      <button 
                        className="btn btn-primary w-full mt-sm text-xs" 
                        onClick={() => handleResolveAction(selectedNote)}
                        disabled={resolvingId === selectedNote.id}
                      >
                        {resolvingId === selectedNote.id ? (
                          <>
                            <RefreshCw size={14} className="spin mr-xs" /> Syncing Cell Registry...
                          </>
                        ) : (
                          <>
                            <UserPlus size={14} className="mr-xs" /> Register Inmate to Registry
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* INTERACTIVE FORM 2: DLSA Parole Audit Directives */}
                {selectedNote.id === 'J-NOTE-2' && selectedNote.status !== 'completed' && (
                  <form onSubmit={handleResolveAudit} className="flex flex-col gap-sm" style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: 'var(--border-radius-sm)' }}>
                    <span className="text-xxs text-muted uppercase font-bold block mb-xs"><Info size={12} className="inline mr-xs text-primary" /> Dispatch Audit Logs</span>
                    
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '10px' }}>Verification Comments</label>
                      <textarea 
                        className="form-control" 
                        placeholder="Log carpentry hours status, conduct compliance ratio..."
                        value={dlsaComments}
                        onChange={(e) => setDlsaComments(e.target.value)}
                        rows="3"
                        style={{ resize: 'none', fontSize: '11px' }}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full text-xs">
                      <Send size={12} className="mr-xs" /> Dispatch Logs & Resolve
                    </button>
                  </form>
                )}

                {/* INTERACTIVE FORM 3: Warden Signatures Checkboard */}
                {selectedNote.id === 'J-NOTE-3' && selectedNote.status !== 'completed' && (
                  <div className="flex flex-col gap-sm" style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: 'var(--border-radius-sm)' }}>
                    <span className="text-xxs text-muted uppercase font-bold block border-b pb-xs" style={{ borderBottomColor: 'var(--border-color)' }}><AlertTriangle size={12} className="inline mr-xs text-danger" style={{ color: 'var(--danger-color)' }} /> Compliance Verification checklist</span>
                    
                    <div className="flex flex-col gap-xs mt-xs text-xs">
                      <label className="flex items-center gap-sm cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={blockCCheckbox.shiftVerified}
                          onChange={(e) => setBlockCCheckbox(prev => ({ ...prev, shiftVerified: e.target.checked }))}
                          style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color)' }}
                        />
                        <span className="text-secondary">Verify carpentry workshop logs</span>
                      </label>
                      
                      <label className="flex items-center gap-sm cursor-pointer mt-xs">
                        <input 
                          type="checkbox" 
                          checked={blockCCheckbox.timesheetSigned}
                          onChange={(e) => setBlockCCheckbox(prev => ({ ...prev, timesheetSigned: e.target.checked }))}
                          style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color)' }}
                        />
                        <span className="text-secondary">Countersign timesheets for July</span>
                      </label>

                      <label className="flex items-center gap-sm cursor-pointer mt-xs">
                        <input 
                          type="checkbox" 
                          checked={blockCCheckbox.multiplierChecked}
                          onChange={(e) => setBlockCCheckbox(prev => ({ ...prev, multiplierChecked: e.target.checked }))}
                          style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color)' }}
                        />
                        <span className="text-secondary">Audit behavior credit multipliers</span>
                      </label>
                    </div>

                    <button 
                      className={`btn w-full text-xs mt-sm ${
                        blockCCheckbox.shiftVerified && blockCCheckbox.timesheetSigned && blockCCheckbox.multiplierChecked
                          ? 'btn-primary'
                          : 'btn-outline'
                      }`}
                      disabled={!(blockCCheckbox.shiftVerified && blockCCheckbox.timesheetSigned && blockCCheckbox.multiplierChecked)}
                      onClick={handleResolveBlockC}
                    >
                      Certify & Sign Block Logs
                    </button>
                  </div>
                )}

                {/* Resolved Banner */}
                {selectedNote.status === 'completed' && (
                  <div style={{ backgroundColor: 'var(--success-light)', color: 'var(--success-color)', padding: '12px', borderRadius: 'var(--border-radius-sm)', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    ✔ Resolved & Synced with Database
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center p-lg text-sm text-muted">
                Select an alert to process.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default JailerNotifications;
