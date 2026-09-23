
export default function Footer({ setActivePage }) {
  return (
    <footer className="portal-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: About */}
          <div className="footer-col">
            <div className="brand-title" style={{ marginBottom: '0.6rem' }}>
              Suraksha<span>Setu</span>
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', maxWidth: '380px' }}>
              A centralized, high-availability public safety platform connecting citizens directly with rapid response teams, municipal control centers, and national disaster relief authorities.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <span className="badge badge-critical">24x7 Control Room Active</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4>Quick Portal Navigation</h4>
            <ul>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setActivePage('home')}>
                  Home Portal
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setActivePage('helpline')}>
                  Emergency Helplines
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setActivePage('report')}>
                  Report Incident / Grievance
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setActivePage('track')}>
                  Track Ticket Status
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setActivePage('complaints')}>
                  Citizen Complaints Feed
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setActivePage('safety')}>
                  Disaster Safety Guidelines
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setActivePage('admin')}>
                  Control Room Console
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Helplines */}
          <div className="footer-col">
            <h4>National Helplines</h4>
            <ul className="footer-helplines">
              <li>
                <span>Universal Emergency:</span>
                <a href="tel:112"><strong>112</strong></a>
              </li>
              <li>
                <span>NDMA Disaster Helpline:</span>
                <a href="tel:1078"><strong>1078</strong></a>
              </li>
              <li>
                <span>Medical Ambulance:</span>
                <a href="tel:108"><strong>108</strong></a>
              </li>
              <li>
                <span>Fire & Rescue:</span>
                <a href="tel:101"><strong>101</strong></a>
              </li>
              <li>
                <span>Police Response:</span>
                <a href="tel:100"><strong>100</strong></a>
              </li>
              <li>
                <span>District Relief Cell:</span>
                <a href="tel:1077"><strong>1077</strong></a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          SurakshaSetu Disaster Response & Public Safety Initiative © 2026. All critical emergency services operate 24 hours a day, 365 days a year.
        </div>
      </div>
    </footer>
  );
}
