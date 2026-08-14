import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building, Scale, ArrowRight, Lock } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  
  // Government Auth states
  const [showGovModal, setShowGovModal] = useState(false);
  const [govPasscode, setGovPasscode] = useState('');
  const [govError, setGovError] = useState('');

  // Lawyer Auth states
  const [showLawyerModal, setShowLawyerModal] = useState(false);
  const [lawyerPasscode, setLawyerPasscode] = useState('');
  const [lawyerError, setLawyerError] = useState('');

  const handleGovSubmit = (e) => {
    e.preventDefault();
    if (govPasscode === '1234') {
      navigate('/government');
    } else {
      setGovError('Invalid Security Passcode. Access Denied.');
    }
  };

  const handleLawyerSubmit = (e) => {
    e.preventDefault();
    if (lawyerPasscode === '1234') {
      navigate('/lawyer');
    } else {
      setLawyerError('Invalid Security Passcode. Access Denied.');
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passcode === '1234') {
      navigate('/family');
    } else {
      setError('Invalid Passcode. Please try again.');
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-between w-full" 
      style={{ 
        height: '100vh', 
        maxHeight: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url("/landing-bg.png")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px', 
        fontFamily: 'var(--font-family)',
        boxSizing: 'border-box'
      }}
    >
      
      {/* Top Shield and Logo Branding */}
      <div className="flex flex-col items-center text-center" style={{ maxWidth: '600px', marginTop: '10px' }}>
        {/* Custom Crest/Shield with Scales inside */}
        <div style={{ 
          width: '55px', 
          height: '60px', 
          backgroundColor: '#1c3322', 
          clipPath: 'polygon(50% 0%, 100% 20%, 100% 75%, 50% 100%, 0% 75%, 0% 20%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#dfd2c0',
          marginBottom: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <Scale size={24} />
        </div>
        
        <h1 style={{ 
          fontFamily: 'var(--font-family-serif)', 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          color: '#1c3322', 
          margin: 0, 
          letterSpacing: '3px',
          lineHeight: '1.1'
        }}>
          ARGUS
        </h1>
        
        <p style={{ 
          fontSize: '0.7rem', 
          fontWeight: '700', 
          letterSpacing: '2px', 
          color: '#1c3322', 
          marginTop: '6px', 
          marginBottom: '8px' 
        }}>
          AI-POWERED RIGHTS GUIDANCE FOR UNDERTRIAL SUPPORT
        </p>
        
        <div style={{ width: '30px', height: '1px', backgroundColor: '#c4b5a3', margin: '6px auto' }}></div>
        
        <p style={{ 
          fontFamily: 'var(--font-family-serif)', 
          fontStyle: 'italic', 
          color: '#6e6256', 
          fontSize: '0.9rem',
          margin: 0
        }}>
          Empowering every individual with knowledge, ensuring justice, restoring dignity.
        </p>
      </div>

      {/* Grid of 4 Portal Cards */}
      <div className="grid grid-cols-2 gap-md" style={{ width: '720px', maxWidth: '100%', margin: '15px 0' }}>
        
        {/* Public/Family Card */}
        <div 
          onClick={() => setShowAuthModal(true)}
          style={{ 
            backgroundColor: '#e2e6df', 
            borderRadius: '20px', 
            padding: '24px 20px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            cursor: 'pointer', 
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            position: 'relative'
          }}
          className="portal-card"
        >
          <div style={{ color: '#566e58', marginBottom: '10px' }}>
            <Users size={32} strokeWidth={1.5} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.1rem', color: '#1c3322', fontWeight: 'bold', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>
            PUBLIC
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#5b6459', margin: '0 0 20px 0', lineHeight: '1.3' }}>
            Access rights information and guidance
          </p>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            border: '1px solid rgba(0,0,0,0.15)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#1c3322'
          }}>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Government Card */}
        <div 
          onClick={() => setShowGovModal(true)}
          style={{ 
            backgroundColor: '#f5eedb', 
            borderRadius: '20px', 
            padding: '24px 20px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            cursor: 'pointer', 
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            position: 'relative'
          }}
          className="portal-card"
        >
          <div style={{ color: '#8f7743', marginBottom: '10px' }}>
            <Building size={32} strokeWidth={1.5} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.1rem', color: '#1c3322', fontWeight: 'bold', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>
            GOVERNMENT
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#7a6a48', margin: '0 0 20px 0', lineHeight: '1.3' }}>
            Official access for government authorities
          </p>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            border: '1px solid rgba(0,0,0,0.15)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#1c3322'
          }}>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Jailer Card */}
        <div 
          onClick={() => navigate('/jailer')}
          style={{ 
            backgroundColor: '#f7e8e5', 
            borderRadius: '20px', 
            padding: '24px 20px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            cursor: 'pointer', 
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            position: 'relative'
          }}
          className="portal-card"
        >
          <div style={{ color: '#9e564d', marginBottom: '10px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="15" y1="3" x2="15" y2="21" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
            </svg>
          </div>
          <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.1rem', color: '#1c3322', fontWeight: 'bold', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>
            JAILER
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#855d58', margin: '0 0 20px 0', lineHeight: '1.3' }}>
            Secure portal for prison administration
          </p>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            border: '1px solid rgba(0,0,0,0.15)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#1c3322'
          }}>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Lawyer Card */}
        <div 
          onClick={() => setShowLawyerModal(true)}
          style={{ 
            backgroundColor: '#eae5ed', 
            borderRadius: '20px', 
            padding: '24px 20px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            cursor: 'pointer', 
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            position: 'relative'
          }}
          className="portal-card"
        >
          <div style={{ color: '#745680', marginBottom: '10px' }}>
            <Scale size={32} strokeWidth={1.5} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.1rem', color: '#1c3322', fontWeight: 'bold', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>
            LAWYER
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#68596e', margin: '0 0 20px 0', lineHeight: '1.3' }}>
            Legal professionals portal for case support
          </p>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            border: '1px solid rgba(0,0,0,0.15)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#1c3322'
          }}>
            <ArrowRight size={14} />
          </div>
        </div>

      </div>

      {/* Footer tagline */}
      <div className="flex items-center gap-xs text-xs text-muted font-semibold" style={{ letterSpacing: '1px', textTransform: 'uppercase', color: '#8a7e72', marginBottom: '5px' }}>
        <span>Justice</span>
        <span style={{ margin: '0 6px' }}>•</span>
        <span>Knowledge</span>
        <span style={{ margin: '0 6px' }}>•</span>
        <span>Dignity</span>
      </div>

      {/* Family Auth Modal */}
      {showAuthModal && (
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
          <div className="card p-lg" style={{ width: '400px', backgroundColor: 'var(--bg-card)', border: 'none', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="flex flex-col items-center text-center gap-sm mb-md">
              <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: '50%' }}>
                <Lock size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>
                Family Verification
              </h3>
              <p className="text-xs text-secondary" style={{ lineHeight: '1.4' }}>
                Access is restricted to authorized family members.<br />
                Please enter the passcode.
              </p>
            </div>
            
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-md">
              <div className="form-group" style={{ margin: 0 }}>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="••••"
                  value={passcode}
                  onChange={(e) => { setPasscode(e.target.value); setError(''); }}
                  style={{ textAlign: 'center', fontSize: '1.25rem', letterSpacing: '8px', padding: '12px' }}
                  autoFocus
                />
                {error && <span className="text-xs mt-xs block" style={{ color: 'var(--danger-color)', textAlign: 'center', fontWeight: '700' }}>{error}</span>}
              </div>

              <p className="text-xs text-muted text-center" style={{ margin: 0 }}>
                Hint: Enter test code <strong>1234</strong>
              </p>
              
              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => { setShowAuthModal(false); setPasscode(''); setError(''); }} style={{ borderRadius: 'var(--border-radius-sm)' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full" style={{ borderRadius: 'var(--border-radius-sm)' }}>
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Government Auth Modal */}
      {showGovModal && (
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
          <div className="card p-lg" style={{ width: '400px', backgroundColor: 'var(--bg-card)', border: 'none', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="flex flex-col items-center text-center gap-sm mb-md">
              <div style={{ padding: '12px', backgroundColor: 'var(--warning-light)', color: 'var(--warning-color)', borderRadius: '50%' }}>
                <Lock size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>
                Government Authority Verification
              </h3>
              <p className="text-xs text-secondary" style={{ lineHeight: '1.4' }}>
                Access is restricted to Deciding Judicial Authorities.<br />
                Please enter the Security Passcode.
              </p>
            </div>
            
            <form onSubmit={handleGovSubmit} className="flex flex-col gap-md">
              <div className="form-group" style={{ margin: 0 }}>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="••••"
                  value={govPasscode}
                  onChange={(e) => { setGovPasscode(e.target.value); setGovError(''); }}
                  style={{ textAlign: 'center', fontSize: '1.25rem', letterSpacing: '8px', padding: '12px' }}
                  autoFocus
                />
                {govError && <span className="text-xs mt-xs block" style={{ color: 'var(--danger-color)', textAlign: 'center', fontWeight: '700' }}>{govError}</span>}
              </div>

              <p className="text-xs text-muted text-center" style={{ margin: 0 }}>
                Hint: Enter test code <strong>1234</strong>
              </p>
              
              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => { setShowGovModal(false); setGovPasscode(''); setGovError(''); }} style={{ borderRadius: 'var(--border-radius-sm)' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full" style={{ borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--warning-color)', borderColor: 'var(--warning-color)' }}>
                  Verify Authority
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lawyer Auth Modal */}
      {showLawyerModal && (
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
          <div className="card p-lg" style={{ width: '400px', backgroundColor: 'var(--bg-card)', border: 'none', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="flex flex-col items-center text-center gap-sm mb-md">
              <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: '50%' }}>
                <Lock size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>
                Lawyer Credentials Verification
              </h3>
              <p className="text-xs text-secondary" style={{ lineHeight: '1.4' }}>
                Access restricted to Registered Legal Attorneys.<br />
                Please enter the Security Passcode.
              </p>
            </div>
            
            <form onSubmit={handleLawyerSubmit} className="flex flex-col gap-md">
              <div className="form-group" style={{ margin: 0 }}>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="••••"
                  value={lawyerPasscode}
                  onChange={(e) => { setLawyerPasscode(e.target.value); setLawyerError(''); }}
                  style={{ textAlign: 'center', fontSize: '1.25rem', letterSpacing: '8px', padding: '12px' }}
                  autoFocus
                />
                {lawyerError && <span className="text-xs mt-xs block" style={{ color: 'var(--danger-color)', textAlign: 'center', fontWeight: '700' }}>{lawyerError}</span>}
              </div>

              <p className="text-xs text-muted text-center" style={{ margin: 0 }}>
                Hint: Enter test code <strong>1234</strong>
              </p>
              
              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => { setShowLawyerModal(false); setLawyerPasscode(''); setLawyerError(''); }} style={{ borderRadius: 'var(--border-radius-sm)' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full" style={{ borderRadius: 'var(--border-radius-sm)' }}>
                  Verify Attorney
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Landing;
