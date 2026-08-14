import React, { useState } from 'react';
import { mockNotifications } from '../data/mockData';
import { Bell, Calendar, CheckCircle, AlertTriangle, ArrowRight, UserCheck, PhoneCall, FileText } from 'lucide-react';

const Notifications = () => {
  const [selectedNote, setSelectedNote] = useState(mockNotifications[0]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Case Updates & Notifications</h1>
          <p className="text-muted text-sm mt-xs">A complete timeline of all events, court dates, and prison updates.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAlertModal(true)}><Bell size={18}/> Manage Alerts</button>
      </div>

      {toastMessage && (
        <div className="toast-banner toast-success">
          <CheckCircle size={18} />
          {toastMessage}
        </div>
      )}

      {/* Split Grid Layout */}
      <div className="grid" style={{ gridTemplateColumns: '1.8fr 1.2fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Column: Timeline Feed */}
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="card-title">Timeline Feed</h3>
            <div className="flex gap-sm">
              <select className="form-control" style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}>
                <option>All Updates</option>
                <option>Court Hearings</option>
                <option>Prison Transfers</option>
                <option>Legal Docs</option>
              </select>
            </div>
          </div>
          <div className="card-body" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <div className="flex flex-col relative" style={{ paddingLeft: '24px' }}>
              {/* Timeline line */}
              <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border-color)' }}></div>
              
              {mockNotifications.map((note) => {
                let Icon = Bell;
                let iconColor = 'var(--primary-color)';
                
                if (note.type === 'warning') { Icon = Calendar; iconColor = 'var(--warning-color)'; }
                if (note.type === 'success') { Icon = CheckCircle; iconColor = 'var(--success-color)'; }
                if (note.type === 'danger') { Icon = AlertTriangle; iconColor = 'var(--danger-color)'; }

                const isSelected = selectedNote && selectedNote.id === note.id;

                return (
                  <div key={note.id} className="relative mb-md flex gap-md items-start">
                    {/* Timeline node */}
                    <div style={{ 
                      position: 'absolute', 
                      left: '-24px', 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      backgroundColor: 'white',
                      border: `2px solid ${iconColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1
                    }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: iconColor }}></div>
                    </div>

                    <div 
                      className="flex-1 card" 
                      style={{ 
                        padding: '16px', 
                        boxShadow: 'none', 
                        border: isSelected ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                        borderLeft: `4px solid ${iconColor}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-card)'
                      }}
                      onClick={() => setSelectedNote(note)}
                    >
                      <div className="flex justify-between items-start mb-xs">
                        <h4 className="font-semibold text-sm flex items-center gap-sm" style={{ fontFamily: 'var(--font-family)', color: 'var(--text-primary)' }}>
                          <span style={{ color: iconColor }}><Icon size={16} /></span>
                          {note.title}
                        </h4>
                        <span className="text-xs font-semibold text-muted bg-secondary" style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-color)' }}>{note.date}</span>
                      </div>
                      <p className="text-xs text-secondary line-clamp-2" style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>{note.desc}</p>
                      
                      <div className="mt-sm pt-sm flex justify-end" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <button 
                          className="btn btn-outline text-xs" 
                          style={{ padding: '2px 8px', fontSize: '0.75rem', borderRadius: '6px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedNote(note);
                          }}
                        >
                          View Details <ArrowRight size={12} className="ml-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Details Card */}
        <div style={{ position: 'sticky', top: '20px' }}>
          {selectedNote ? (
            <div className="card">
              <div className="card-header bg-primary-light" style={{ backgroundColor: 'var(--primary-light)', borderBottomColor: 'var(--border-color)' }}>
                <h3 className="card-title text-primary" style={{ fontSize: '1rem' }}>
                  Notification Details
                </h3>
              </div>
              <div className="card-body flex flex-col gap-md">
                <div>
                  <span className="badge badge-primary text-xs mb-sm" style={{ 
                    backgroundColor: selectedNote.type === 'success' ? 'var(--success-light)' : selectedNote.type === 'warning' ? 'var(--warning-light)' : selectedNote.type === 'danger' ? 'var(--danger-light)' : 'var(--primary-light)',
                    color: selectedNote.type === 'success' ? 'var(--success-color)' : selectedNote.type === 'warning' ? 'var(--warning-color)' : selectedNote.type === 'danger' ? 'var(--danger-color)' : 'var(--primary-color)',
                  }}>
                    {selectedNote.type.toUpperCase()}
                  </span>
                  
                  <h2 className="h2" style={{ margin: '8px 0', fontSize: '1.25rem', fontFamily: 'var(--font-family)', color: 'var(--text-primary)' }}>
                    {selectedNote.title}
                  </h2>
                  
                  <span className="text-xs text-muted font-semibold block mb-md">
                    Date: {selectedNote.date}
                  </span>
                </div>

                <div style={{ 
                  backgroundColor: 'var(--bg-color)', 
                  borderRadius: 'var(--border-radius-sm)', 
                  padding: '16px', 
                  fontSize: '0.85rem', 
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6' 
                }}>
                  {selectedNote.desc}
                </div>

                <div className="flex flex-col gap-sm mt-md">
                  <span className="text-xs text-muted font-bold">RECOMMENDED ACTIONS</span>
                  
                  {selectedNote.type === 'warning' && (
                    <button className="btn btn-primary text-xs w-full">
                      <Calendar size={14} className="mr-xs" /> Add to Calendar
                    </button>
                  )}
                  {selectedNote.type === 'danger' && (
                    <button className="btn btn-primary text-xs w-full" style={{ backgroundColor: 'var(--danger-color)', color: 'white' }}>
                      <PhoneCall size={14} className="mr-xs" /> Call Emergency Legal Aid
                    </button>
                  )}
                  {selectedNote.type === 'success' && (
                    <button className="btn btn-primary text-xs w-full" style={{ backgroundColor: 'var(--success-color)', color: 'white' }}>
                      <FileText size={14} className="mr-xs" /> View Updated Credits
                    </button>
                  )}
                  
                  <button className="btn btn-outline text-xs w-full">
                    <UserCheck size={14} className="mr-xs" /> Acknowledge Notification
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-lg text-center items-center justify-center" style={{ height: '300px' }}>
              <Bell size={32} className="text-muted mb-sm" />
              <p className="text-sm text-muted font-semibold">Select a notification to view its full details.</p>
            </div>
          )}
        </div>

      </div>

      {/* Alert Settings Modal */}
      {showAlertModal && (
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
          <div className="card p-lg" style={{ width: '400px', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '15px', textAlign: 'center' }}>
              Manage Case Alerts
            </h3>
            
            <div className="flex flex-col gap-md">
              <p className="text-xs text-muted" style={{ textAlign: 'center', marginBottom: '10px' }}>
                Select how you want to be notified about case movements, court hearings, and prison transfers.
              </p>

              <div className="flex items-center justify-between border-b pb-sm" style={{ borderBottomColor: 'var(--border-color)' }}>
                <div>
                  <span className="font-semibold text-sm block">SMS Notifications</span>
                  <span className="text-xs text-muted">Receive alerts on your registered phone.</span>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }} />
              </div>

              <div className="flex items-center justify-between border-b pb-sm" style={{ borderBottomColor: 'var(--border-color)' }}>
                <div>
                  <span className="font-semibold text-sm block">Email Updates</span>
                  <span className="text-xs text-muted">Detailed reports and files via email.</span>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm block">Automated Call Reminders</span>
                  <span className="text-xs text-muted">Urgent alerts for next-day hearings.</span>
                </div>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }} />
              </div>

              <div className="flex gap-sm mt-md">
                <button className="btn btn-outline w-full" onClick={() => setShowAlertModal(false)}>
                  Close
                </button>
                <button className="btn btn-primary w-full" onClick={() => { setToastMessage('Notification preferences saved successfully!'); setShowAlertModal(false); setTimeout(() => setToastMessage(''), 4000); }}>
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
