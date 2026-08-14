import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Scale, Users, CheckCircle, Bell, ArrowLeft, 
  ShieldAlert, Settings, Calendar, ShieldCheck, ClipboardList, TrendingUp
} from 'lucide-react';
import FloatingChatbot from './FloatingChatbot';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Determine current portal and render links accordingly
  let sidebarLinks = [];
  let portalTitle = 'ARGUS';
  let userLabel = 'Guest';
  let avatarInitials = 'GS';
  let showFloatingChat = false;

  if (path.startsWith('/family')) {
    portalTitle = 'ARGUS PUBLIC';
    userLabel = 'Priya Kumar';
    avatarInitials = 'PK';
    showFloatingChat = true;
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
    sidebarLinks = [
      { to: '/jailer/dashboard', label: 'Warden Dashboard', icon: ClipboardList },
      { to: '/jailer/visitations', label: 'Visitations List', icon: ShieldCheck },
    ];
  } else if (path.startsWith('/lawyer')) {
    portalTitle = 'ARGUS LAWYER';
    userLabel = 'Adv. S. Nair';
    avatarInitials = 'SN';
    sidebarLinks = [
      { to: '/lawyer/dashboard', label: 'Lawyer Dashboard', icon: Scale },
    ];
  } else if (path.startsWith('/government')) {
    portalTitle = 'ARGUS GOVT';
    userLabel = 'Director A. Verma';
    avatarInitials = 'AV';
    sidebarLinks = [
      { to: '/government/dashboard', label: 'Govt Dashboard', icon: TrendingUp },
    ];
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{portalTitle}</span>
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
          <div className="flex items-center gap-md">
            <div className="text-sm font-semibold">Welcome</div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {avatarInitials}
            </div>
          </div>
        </header>
        
        <div className="page-container">
          <Outlet />
        </div>
        {showFloatingChat && <FloatingChatbot />}
      </main>
    </div>
  );
};

export default Layout;
