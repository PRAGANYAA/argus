import React from 'react';
import { mockInmate, mockNotifications, mockWorkDone } from '../data/mockData';
import { Calendar, Clock, AlertCircle, TrendingUp, CheckCircle, Briefcase } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Dashboard Overview</h1>
          <p className="text-muted text-sm mt-xs">High-level summary of all case and family member details.</p>
        </div>
        <div className="flex items-center gap-md">
          <div className="badge badge-success" style={{ fontSize: '1rem', padding: '10px 20px', borderRadius: '12px' }}>
            Status: Active Case
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-md">
        {/* Quick Stats Cards */}
        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Total Sentence</p>
              <h2 className="h2" style={{ margin: 0 }}>{mockInmate.sentenceTotal}</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', color: 'var(--primary-color)' }}>
              <Clock />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Time Served</p>
              <h2 className="h2" style={{ margin: 0 }}>{mockInmate.timeServed}</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--warning-light)', borderRadius: '50%', color: 'var(--warning-color)' }}>
              <TrendingUp />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Good Behavior</p>
              <h2 className="h2" style={{ margin: 0 }}>{mockInmate.goodBehaviorCredits}</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--success-light)', borderRadius: '50%', color: 'var(--success-color)' }}>
              <CheckCircle size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-semibold mb-xs">Next Hearing</p>
              <h2 className="h2" style={{ margin: 0 }}>Sep 12</h2>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--danger-light)', borderRadius: '50%', color: 'var(--danger-color)' }}>
              <Calendar />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-md mt-sm">
        {/* Recent Notifications */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title"><AlertCircle size={18}/> Recent Updates</h3>
          </div>
          <div className="card-body p-0" style={{ padding: 0 }}>
            {mockNotifications.slice(0, 3).map((note, idx) => (
              <div key={note.id} className="p-md flex gap-md" style={{ borderBottom: idx === 2 ? 'none' : '1px solid var(--border-color)' }}>
                <div style={{ marginTop: '4px' }}>
                  <div className={`badge badge-${note.type}`} style={{ width: '12px', height: '12px', padding: 0, borderRadius: '50%' }}></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{note.title} <span className="text-xs text-muted font-normal ml-sm">{note.date}</span></span>
                  <span className="text-sm text-secondary mt-xs">{note.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title"><Briefcase size={18}/> Work Log Summary</h3>
          </div>
          <div className="card-body flex flex-col justify-center">
            {mockWorkDone.slice(0, 3).map((work) => (
               <div key={work.id} className="mb-md">
                 <div className="flex justify-between text-sm font-semibold mb-xs">
                   <span>{work.type}</span>
                   <span className="text-primary">{work.hours} hrs</span>
                 </div>
                 <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--primary-light)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, (work.hours/150)*100)}%`, height: '100%', backgroundColor: 'var(--primary-color)', borderRadius: '4px' }}></div>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
