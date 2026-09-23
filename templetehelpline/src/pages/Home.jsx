
export default function Home({ setActivePage, onSelectCategory }) {
  const emergencyHelplines = [
    { name: 'Police', number: '100', icon: '👮', desc: 'Law Enforcement & Immediate Assistance' },
    { name: 'Fire', number: '101', icon: '🚒', desc: 'Fire Response & Building Rescue' },
    { name: 'Ambulance', number: '108', icon: '🚑', desc: 'Emergency Medical & Trauma Dispatch' },
    { name: 'Disaster', number: '1078', icon: '🌪️', desc: 'National Disaster Management Authority' },
  ];

  const disasterCategories = [
    { label: 'Flood', icon: '🌊', value: 'Flood / Waterlogging' },
    { label: 'Fire', icon: '🔥', value: 'Fire Outbreak' },
    { label: 'Earthquake', icon: '🏚️', value: 'Earthquake / Structural Damage' },
    { label: 'Landslide', icon: '⛰️', value: 'Landslide / Mudslide' },
    { label: 'Cyclone', icon: '🌪️', value: 'Cyclone & High Velocity Winds' },
    { label: 'Building Damage', icon: '🏢', value: 'Building Damage / Collapse Hazard' },
    { label: 'Other', icon: '⚠️', value: 'Other Emergency / Grievance' },
  ];

  const handleCategoryClick = (catValue) => {
    if (onSelectCategory) {
      onSelectCategory(catValue);
    } else {
      setActivePage('report');
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '3.5rem' }}>
      <div className="home-panel-wrapper">
        {/* ================================================
            HEADER: DISASTER MANAGEMENT HELPLINE
            ================================================ */}
        <div className="panel-header">
          <div className="panel-badge">
            <span className="pulse-ring"></span>
            🚨 24x7 NATIONAL EMERGENCY PORTAL
          </div>
          <h1 className="panel-main-title">
            DISASTER MANAGEMENT HELPLINE
          </h1>
          <p className="panel-main-sub">
            Government of Public Safety & Citizen Grievance Redressal
          </p>
        </div>

        <div className="panel-divider"></div>

        {/* ================================================
            SECTION 1: REPORT AN EMERGENCY / COMPLAINT
            ================================================ */}
        <section className="panel-section text-center">
          <h2 className="section-prompt-title">
            Report an Emergency / Complaint
          </h2>
          <p className="section-prompt-desc">
            Directly connect with field rescue operations or track your active crisis resolution ticket.
          </p>

          <div className="prompt-action-buttons">
            <button
              type="button"
              className="btn-prompt-primary"
              onClick={() => setActivePage('report')}
            >
              <span>🚨</span> [ Report Complaint ]
            </button>

            <button
              type="button"
              className="btn-prompt-secondary"
              onClick={() => setActivePage('track')}
            >
              <span>🔍</span> [ Track Complaint ]
            </button>
          </div>
        </section>

        <div className="panel-divider"></div>

        {/* ================================================
            SECTION 2: EMERGENCY HELPLINES
            ================================================ */}
        <section className="panel-section">
          <div className="panel-section-title-row">
            <h2 className="panel-section-title">Emergency Helplines</h2>
            <button
              type="button"
              className="view-all-link-btn"
              onClick={() => setActivePage('helpline')}
            >
              View Full Directory ({9}+) ➔
            </button>
          </div>

          <div className="helpline-list-table">
            {emergencyHelplines.map((item) => (
              <div key={item.number} className="helpline-list-row">
                <div className="helpline-entity">
                  <span className="helpline-entity-icon">{item.icon}</span>
                  <div>
                    <div className="helpline-entity-name">{item.name}</div>
                    <div className="helpline-entity-desc">{item.desc}</div>
                  </div>
                </div>

                <div className="helpline-contact-box">
                  <span className="helpline-large-number">{item.number}</span>
                  <a
                    href={`tel:${item.number}`}
                    className="helpline-row-call-btn"
                    title={`Dial ${item.name} Helpline (${item.number})`}
                  >
                    <span>📞</span> Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="panel-divider"></div>

        {/* ================================================
            SECTION 3: DISASTER CATEGORIES
            ================================================ */}
        <section className="panel-section">
          <div className="panel-section-title-row">
            <h2 className="panel-section-title">Disaster Categories</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Select a category to lodge an immediate incident
            </span>
          </div>

          <div className="categories-pill-grid">
            {disasterCategories.map((cat) => (
              <button
                key={cat.label}
                type="button"
                className="category-pill-btn"
                onClick={() => handleCategoryClick(cat.value)}
              >
                <span className="category-pill-icon">{cat.icon}</span>
                <span className="category-pill-text">[{cat.label}]</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
