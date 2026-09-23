
export default function Navbar({ activePage, setActivePage, theme, toggleTheme }) {
  return (
    <header className="navbar">
      <div className="container nav-content">
        {/* Brand Logo & Name */}
        <div className="nav-brand" onClick={() => setActivePage('home')}>
          <div className="nav-logo-icon">
            <span className="pulse-ring"></span>
            🚨
          </div>
          <div>
            <div className="brand-title">
              Suraksha<span>Setu</span>
            </div>
            <div className="brand-subtitle">
              Disaster Helpline & Citizen Grievance Portal
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-links">
          <button
            type="button"
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => setActivePage('home')}
          >
            <span className="nav-icon">🏠</span>
            Home
          </button>

          <button
            type="button"
            className={`nav-link ${activePage === 'helpline' ? 'active' : ''}`}
            onClick={() => setActivePage('helpline')}
          >
            <span className="nav-icon">📞</span>
            Helpline
          </button>
          
          <button
            type="button"
            className={`nav-link ${activePage === 'report' ? 'active' : ''}`}
            onClick={() => setActivePage('report')}
          >
            <span className="nav-icon">📝</span>
            Report Complaint
          </button>

          <button
            type="button"
            className={`nav-link ${activePage === 'track' ? 'active' : ''}`}
            onClick={() => setActivePage('track')}
          >
            <span className="nav-icon">🔍</span>
            Track Status
          </button>

          <button
            type="button"
            className={`nav-link ${activePage === 'complaints' ? 'active' : ''}`}
            onClick={() => setActivePage('complaints')}
          >
            <span className="nav-icon">📋</span>
            Complaints Feed
          </button>

          <button
            type="button"
            className={`nav-link ${activePage === 'safety' ? 'active' : ''}`}
            onClick={() => setActivePage('safety')}
          >
            <span className="nav-icon">🛡️</span>
            Safety Tips
          </button>

          <button
            type="button"
            className={`nav-link admin-nav-btn ${activePage === 'admin' ? 'active' : ''}`}
            onClick={() => setActivePage('admin')}
          >
            <span className="nav-icon">📊</span>
            Admin Console
          </button>
        </nav>

        {/* Actions (SOS Quick Call + Theme Toggle) */}
        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <a href="tel:112" className="sos-badge-btn" title="Call Universal Emergency Helpline">
            <span className="sos-dot"></span>
            <span className="sos-label">SOS: 112</span>
          </a>
        </div>
      </div>
    </header>
  );
}
