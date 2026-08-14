import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Scale, Users, CheckCircle, Bell, ArrowLeft, 
  ShieldAlert, Settings, Calendar, ShieldCheck, ClipboardList, TrendingUp, Cpu,
  Building, Database, CreditCard, BookOpen, History, X, Copy, LogOut, Key, UserCheck, Shield
} from 'lucide-react';
import FloatingChatbot from './FloatingChatbot';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  // Determine current portal metadata
  let sidebarLinks = [];
  let portalTitle = 'ARGUS';
  let userLabel = 'Guest';
  let avatarInitials = 'GS';
  let showFloatingChat = false;
  let userDetails = {
    name: 'Guest User',
    role: 'Public Visitor',
    id: 'USR-0000',
    email: 'guest@argus.org',
    passcode: '1234',
    accessLevel: 'Level 1 General',
    jurisdiction: 'National Portal'
  };

  if (path.startsWith('/family')) {
    portalTitle = 'ARGUS PUBLIC';
    userLabel = 'Priya Kumar';
    avatarInitials = 'PK';
    showFloatingChat = true;
    userDetails = {
      name: 'Priya Kumar',
      role: 'Registered Citizen / Family Member',
      id: 'PUB-88192-DEL',
      email: 'priya.kumar@gmail.com',
      passcode: '1234',
      accessLevel: 'Level 1 Verified Family Member',
      jurisdiction: 'Delhi NCR Judicial District'
    };
    sidebarLinks = [
      { to: '/family/dashboard', label: 'Dashboard Home', icon: LayoutDashboard },
      { to: '/family/legal-docs', label: 'Legal Documents', icon: FileText },
      { to: '/family/rights', label: 'Know Your Rights', icon: Scale },
      { to: '/family/lawyer-connect', label: 'Connect with Lawyers', icon: Users },
      { to: '/family/eligibility', label: 'Eligibility Engine', icon: CheckCircle },
      { to: '/family/notifications', label: 'Notification Updates', icon: Bell },
    ];
  } else if (path.startsWith('/jailer')) {
    portalTitle = 'ARGUS JAILER';
    userLabel = 'Officer R. Singh';
    avatarInitials = 'RS';
    showFloatingChat = true;
    userDetails = {
      name: 'Officer R. Singh',
      role: 'Senior Prison Warden & Commandant',
      id: 'JLR-55201-CJ',
      email: 'warden.singh@prisons.gov.in',
      passcode: '1234',
      accessLevel: 'Level 3 Custodial Clearance',
      jurisdiction: 'Central Facility Jail Block A-D'
    };
    sidebarLinks = [
      { to: '/jailer/dashboard', label: 'Eligibility & Reports', icon: ClipboardList },
      { to: '/jailer/dossiers', label: 'Inmate Dossiers', icon: FileText },
      { to: '/jailer/approvals', label: 'Release Approvals', icon: ShieldCheck },
      { to: '/jailer/visitations', label: 'Visitation Control', icon: Users },
      { to: '/jailer/eligibility-model', label: 'AI Eligibility Model', icon: Cpu },
      { to: '/jailer/notifications', label: 'Warden Notifications', icon: Bell },
    ];
  } else if (path.startsWith('/lawyer')) {
    portalTitle = 'ARGUS LAWYER';
    userLabel = 'Adv. S. Nair';
    avatarInitials = 'SN';
    userDetails = {
      name: 'Adv. S. Nair',
      role: 'High Court Advocate & DLSA Representative',
      id: 'LWY-77402-HC',
      email: 'adv.nair@barcouncil.in',
      passcode: '1234',
      accessLevel: 'Level 3 Legal Counsel & Advocate',
      jurisdiction: 'High Court & District Legal Services'
    };
    sidebarLinks = [
      { to: '/lawyer/dashboard', label: 'Portfolio Dashboard', icon: LayoutDashboard },
      { to: '/lawyer/requests', label: 'Consultations', icon: Scale },
      { to: '/lawyer/petitions', label: 'Court Petitions', icon: FileText },
      { to: '/lawyer/case-history', label: 'Client Timelines', icon: History },
      { to: '/lawyer/billing', label: 'Billing & Schedule', icon: CreditCard },
    ];
  } else if (path.startsWith('/government')) {
    portalTitle = 'ARGUS GOVT';
    userLabel = 'Director A. Verma';
    avatarInitials = 'AV';
    userDetails = {
      name: 'Director A. Verma',
      role: 'Director of Prison Reforms & Judicial Oversight',
      id: 'GVT-99104-DIR',
      email: 'director.verma@justice.gov.in',
      passcode: '1234',
      accessLevel: 'Level 4 Super Admin Judicial Clearance',
      jurisdiction: 'Ministry of Home Affairs & State Justice Dept'
    };
    sidebarLinks = [
      { to: '/government/dashboard', label: 'Judicial Analytics', icon: LayoutDashboard },
      { to: '/government/requests', label: 'Warden Requests', icon: FileText },
      { to: '/government/policies', label: 'Policy Directives', icon: BookOpen },
      { to: '/government/prisons', label: 'Statewide Prisons', icon: Building },
      { to: '/government/database', label: 'System Database', icon: Database },
      { to: '/government/subscription', label: 'Subscription Billing', icon: CreditCard },
    ];
  }

  const handleCopyCredentials = () => {
    const credText = `ARGUS Credentials:\nName: ${userDetails.name}\nRole: ${userDetails.role}\nUser ID: ${userDetails.id}\nPasscode: ${userDetails.passcode}\nEmail: ${userDetails.email}`;
    navigator.clipboard.writeText(credText);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 3000);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 20px' }}>
          {/* Dark Forest Green Hexagon Shield Crest Logo */}
          <div style={{ 
            width: '38px', 
            height: '42px', 
            backgroundColor: '#1c3322', 
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#dfd2c0',
            flexShrink: 0,
            boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
          }}>
            <Scale size={18} />
          </div>

          <span style={{ 
            fontFamily: 'var(--font-family-serif)', 
            fontSize: '1.05rem', 
            fontWeight: '800', 
            color: '#1c3322', 
            letterSpacing: '2px',
            lineHeight: '1.2'
          }}>
            {portalTitle}
          </span>
        </div>
        <nav className="nav-links">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink 
                key={link.to} 
                to={link.to} 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} /> {link.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <div className="flex items-center gap-md">
            <button className="btn btn-outline text-xs" onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          {/* Profile Header Button - Clicking opens Profile Drawer */}
          <div 
            className="flex items-center gap-md" 
            style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: 'var(--border-radius-sm)', transition: 'background-color 0.2s' }}
            onClick={() => setShowProfileDrawer(true)}
            title="Click to view login details & profile"
          >
            <div className="text-sm font-semibold flex items-center gap-xs">
              Welcome, <span className="text-primary">{userLabel}</span>
            </div>
            <div style={{ 
              width: 40, height: 40, borderRadius: '50%', 
              backgroundColor: 'var(--primary-color)', color: 'white', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontWeight: 'bold', boxShadow: 'var(--shadow-sm)',
              border: '2px solid white'
            }}>
              {avatarInitials}
            </div>
          </div>
        </header>
        
        <div className="page-container">
          <Outlet />
        </div>
        {showFloatingChat && <FloatingChatbot />}
      </main>

      {/* SIDE DRAWER POP-UP: User Profile & Login Credentials */}
      {showProfileDrawer && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(59, 50, 40, 0.45)', backdropFilter: 'blur(5px)',
          display: 'flex', justifyContent: 'flex-end', zIndex: 2000,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            width: '380px', height: '100%', backgroundColor: 'var(--bg-card)',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.15)', borderLeft: '1px solid var(--border-color)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            padding: '24px', animation: 'slideInRight 0.3s ease-out', overflowY: 'auto'
          }}>
            
            {/* Drawer Header */}
            <div>
              <div className="flex justify-between items-center border-b pb-md mb-md" style={{ borderBottomColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-xs">
                  <UserCheck size={18} className="text-primary" />
                  <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                    User Profile & Auth Session
                  </h3>
                </div>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setShowProfileDrawer(false)}
                  style={{ padding: '6px', borderRadius: '50%' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* User Avatar Card */}
              <div className="flex flex-col items-center text-center p-md mb-md" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ 
                  width: 64, height: 64, borderRadius: '50%', 
                  backgroundColor: 'var(--primary-color)', color: 'white', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px',
                  boxShadow: '0 4px 12px rgba(196, 154, 108, 0.4)'
                }}>
                  {avatarInitials}
                </div>
                <h4 style={{ margin: 0, fontFamily: 'var(--font-family-serif)', fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                  {userDetails.name}
                </h4>
                <span className="badge badge-primary mt-xs text-xxs" style={{ padding: '3px 10px' }}>
                  {userDetails.role}
                </span>
              </div>

              {/* Login Credentials & Metadata Specs */}
              <div className="flex flex-col gap-sm">
                <span className="text-xxs text-muted uppercase font-bold tracking-wider block">Verified Login Details</span>
                
                <div className="flex justify-between items-center p-sm" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span className="text-xs text-muted flex items-center gap-xs"><Key size={14} className="text-primary" /> Master Passcode</span>
                  <span className="font-extrabold text-sm text-primary" style={{ fontFamily: 'monospace', letterSpacing: '2px' }}>{userDetails.passcode}</span>
                </div>

                <div className="flex justify-between items-center p-sm" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span className="text-xs text-muted">User Auth ID</span>
                  <span className="font-bold text-xs text-primary">{userDetails.id}</span>
                </div>

                <div className="flex justify-between items-center p-sm" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span className="text-xs text-muted">Account Email</span>
                  <span className="font-semibold text-xs text-secondary">{userDetails.email}</span>
                </div>

                <div className="flex justify-between items-center p-sm" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span className="text-xs text-muted flex items-center gap-xs"><Shield size={14} className="text-success" /> Clearance Level</span>
                  <span className="font-semibold text-xxs text-success">{userDetails.accessLevel}</span>
                </div>

                <div className="p-sm" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                  <span className="text-xxs text-muted font-bold block uppercase mb-xxs">Assigned Jurisdiction</span>
                  <span className="text-xs font-medium text-secondary block">{userDetails.jurisdiction}</span>
                </div>
              </div>

              {copyToast && (
                <div className="toast-banner toast-success mt-sm text-xs">
                  <CheckCircle size={14} /> Credentials copied to clipboard!
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="border-t pt-md mt-md flex flex-col gap-sm" style={{ borderTopColor: 'var(--border-color)' }}>
              <button className="btn btn-outline text-xs w-full" onClick={handleCopyCredentials}>
                <Copy size={14} className="mr-xs" /> Copy Account Credentials
              </button>
              <button className="btn btn-primary text-xs w-full" onClick={() => { setShowProfileDrawer(false); navigate('/'); }}>
                <LogOut size={14} className="mr-xs" /> Switch Portal Account
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Layout;
