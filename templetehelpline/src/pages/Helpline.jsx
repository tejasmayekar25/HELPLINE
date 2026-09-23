import { useState } from 'react';

export default function Helpline({ helplines }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copyFeedback, setCopyFeedback] = useState(null);

  const categories = ['All', 'Universal', 'Disaster', 'Medical', 'Rescue', 'Police', 'Civic'];

  const filteredHelplines = helplines.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.number.includes(searchQuery) ||
      item.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyNumber = (num) => {
    navigator.clipboard.writeText(num);
    setCopyFeedback(num);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div className="helpline-page container" style={{ paddingBottom: '3rem' }}>
      <div className="section-header" style={{ marginTop: '2rem' }}>
        <div>
          <span className="badge badge-critical">Official 24x7 Directory</span>
          <h1 className="section-title" style={{ marginTop: '0.4rem' }}>
            National & Disaster Emergency Helplines
          </h1>
          <p className="section-desc">
            Directly connect with certified government disaster control rooms, rescue units, and municipal authorities.
          </p>
        </div>

        {/* Search input */}
        <input
          type="text"
          className="form-input"
          placeholder="Search by name, department, or number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ minWidth: '280px' }}
        />
      </div>

      {/* Category Filter Pills */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Helplines Grid */}
      {filteredHelplines.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
          <h3>No helpline matches "{searchQuery}"</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Try searching for "Ambulance", "Fire", "Disaster", or dial Universal <strong>112</strong>.
          </p>
        </div>
      ) : (
        <div className="helplines-grid">
          {filteredHelplines.map((item) => (
            <div key={item.id} className="helpline-card">
              <div>
                <div className="helpline-card-header">
                  <div className="helpline-card-icon">{item.icon}</div>
                  <div>
                    <h3 className="helpline-name">{item.name}</h3>
                    <span className="helpline-authority">{item.authority}</span>
                  </div>
                </div>
                <div className="helpline-number">{item.number}</div>
                <p className="helpline-desc">{item.desc}</p>
              </div>

              <div className="helpline-actions">
                <a href={`tel:${item.number}`} className="btn-call">
                  <span>📞</span> Call Now
                </a>
                <button
                  type="button"
                  className="btn-copy"
                  onClick={() => handleCopyNumber(item.number)}
                  title="Copy Number"
                >
                  {copyFeedback === item.number ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Emergency Notice Box */}
      <div
        style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'var(--primary-red-light)',
          border: '1px solid var(--primary-red)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ fontSize: '2.5rem' }}>🚨</div>
        <div>
          <h4 style={{ color: 'var(--primary-red)', marginBottom: '0.2rem' }}>
            Life-Threatening Emergency Protocol
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            If you are stranded, injured, or witnessing immediate danger, dial <strong>112</strong> immediately. The universal emergency operator will dispatch the nearest Police, Ambulance, and Fire units to your location.
          </p>
        </div>
      </div>
    </div>
  );
}
