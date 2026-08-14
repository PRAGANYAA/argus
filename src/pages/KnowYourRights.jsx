import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRights, mockHelplines } from '../data/mockData';
import { BookOpen, Phone, Info } from 'lucide-react';

const KnowYourRights = () => {
  const navigate = useNavigate();
  const inmateRights = mockRights.filter(r => r.category === 'Inmate Rights');
  const familyRights = mockRights.filter(r => r.category === 'Family Rights');
  const caseLaws = mockRights.filter(r => r.category === 'Case Laws');

  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-between items-center mb-sm">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Know Your Rights</h1>
          <p className="text-muted">A comprehensive guide to legal rights, laws, and emergency helplines.</p>
        </div>
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
