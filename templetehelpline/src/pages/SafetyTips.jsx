import { useState } from 'react';

const SAFETY_DATA = [
  {
    id: 'flood',
    title: 'Floods & Waterlogging',
    icon: '🌊',
    emergencyNum: '1077 / 1070',
    dos: [
      'Switch off main electrical breakers and gas supplies before water enters.',
      'Move elderly, children, and essential medicines to top floors immediately.',
      'Boil all drinking water for at least 10 minutes to prevent waterborne cholera and typhoid.',
      'Keep mobile phones fully charged and pack identity documents in waterproof bags.',
    ],
    donts: [
      'Never drive or walk through flooded underpasses or fast-moving currents.',
      'Do not touch submerged electric poles, transformers, or fallen wires.',
      'Do not let children swim or play in stagnant flood runoff waters.',
    ],
  },
  {
    id: 'earthquake',
    title: 'Earthquake & Tremors',
    icon: '🏚️',
    emergencyNum: '1078 (NDMA) / 112',
    dos: [
      'DROP to your knees, COVER under a sturdy table, and HOLD ON until tremors stop.',
      'Stay away from glass windows, heavy bookcases, and hanging lighting fixtures.',
      'If caught outdoors, move rapidly into open fields away from power lines and brick walls.',
      'Use staircases only; elevators can jam during structural seismic shifts.',
    ],
    donts: [
      'Do not rush toward doorways or building exits in panic.',
      'Do not use naked matchsticks or lighters until gas pipe leaks are ruled out.',
      'Do not stand directly beneath tall parapets, chimneys, or billboards.',
    ],
  },
  {
    id: 'fire',
    title: 'Fire & Smoke Emergency',
    icon: '🔥',
    emergencyNum: '101 (Fire) / 112',
    dos: [
      'Sound the nearest alarm and immediately evacuate shouting "FIRE!".',
      'Crawl low on hands and knees under smoke where air is cleaner.',
      'Feel closed doors with back of your hand; if hot, DO NOT open.',
      'Close doors behind you as you escape to compartmentalize smoke spread.',
    ],
    donts: [
      'NEVER use an elevator during a fire emergency.',
      'Never re-enter a burning premise to collect luggage or valuables.',
      'Do not throw water on electrical fires or hot cooking oil flames.',
    ],
  },
  {
    id: 'cyclone',
    title: 'Cyclones & High Velocity Winds',
    icon: '🌪️',
    emergencyNum: '1078 / 112',
    dos: [
      'Board up or tape glass windows with heavy tape in an "X" pattern.',
      'Tie down outdoor tin roofing sheets, water tanks, and air coolers.',
      'Keep emergency battery-operated transistors or mobile radios tuned to official updates.',
      'Relocate to designated cyclone shelters when evacuation orders are broadcasted.',
    ],
    donts: [
      'Do not venture outdoors during the deceptive "eye of the storm" calm.',
      'Do not park motor vehicles beneath old large trees or weak hoardings.',
      'Do not circulate false panic-inducing rumors on social media groups.',
    ],
  },
  {
    id: 'electric',
    title: 'Electrical Hazards & Wire Snaps',
    icon: '⚡',
    emergencyNum: '1913 / 112',
    dos: [
      'Maintain at least a 30-foot perimeter away from any fallen power cable.',
      'Assume every downed overhead wire is LIVE and lethal.',
      'Report sparking transformers or loose cables immediately on the helpline.',
    ],
    donts: [
      'Never touch a person who is in contact with a live electric source directly.',
      'Do not use metal ladders or metal poles anywhere near overhead cables.',
    ],
  },
];

export default function SafetyTips({ setActivePage }) {
  const [selectedDisaster, setSelectedDisaster] = useState('all');

  const filteredGuides =
    selectedDisaster === 'all'
      ? SAFETY_DATA
      : SAFETY_DATA.filter((g) => g.id === selectedDisaster);

  return (
    <div className="safety-page container" style={{ paddingBottom: '3.5rem' }}>
      <div className="section-header" style={{ marginTop: '2rem' }}>
        <div>
          <span className="badge badge-high">Preparedness Saves Lives</span>
          <h1 className="section-title" style={{ marginTop: '0.4rem' }}>
            Disaster Safety Protocols & Guidelines
          </h1>
          <p className="section-desc">
            Certified safety protocols verified by National Disaster Management Authorities. Learn what actions to take before, during, and after a crisis.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => setActivePage('report')}
        >
          <span>🚨</span> Report Live Emergency
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="filter-bar">
        <button
          type="button"
          className={`filter-pill ${selectedDisaster === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedDisaster('all')}
        >
          All Hazards
        </button>
        {SAFETY_DATA.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`filter-pill ${selectedDisaster === item.id ? 'active' : ''}`}
            onClick={() => setSelectedDisaster(item.id)}
          >
            {item.icon} {item.title.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Safety Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem',
        }}
      >
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.6rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '2rem' }}>{guide.icon}</span>
                  <h3 style={{ fontSize: '1.25rem' }}>{guide.title}</h3>
                </div>
                <span className="badge badge-critical">Helpline: {guide.emergencyNum}</span>
              </div>

              {/* What to DO */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4
                  style={{
                    color: 'var(--accent-green)',
                    fontSize: '0.92rem',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  ✅ Crucial Actions (What You SHOULD Do):
                </h4>
                <ul
                  style={{
                    paddingLeft: '1.2rem',
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                  }}
                >
                  {guide.dos.map((d, idx) => (
                    <li key={idx} style={{ marginBottom: '0.3rem' }}>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to AVOID */}
              <div>
                <h4
                  style={{
                    color: 'var(--primary-red)',
                    fontSize: '0.92rem',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  ❌ Dangerous Actions (What to AVOID):
                </h4>
                <ul
                  style={{
                    paddingLeft: '1.2rem',
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                  }}
                >
                  {guide.donts.map((d, idx) => (
                    <li key={idx} style={{ marginBottom: '0.3rem' }}>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <a href="tel:112" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>📞</span> Quick Call Emergency Helpline
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Go-Bag Checklist Box */}
      <div
        style={{
          marginTop: '3rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>🎒</span>
          <div>
            <h3 style={{ fontSize: '1.3rem' }}>The Emergency "Go-Bag" Survival Checklist</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Every citizen household should have a packed 72-hour survival kit ready for quick evacuation.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '1.25rem',
          }}
        >
          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Water & Food</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                3 liters/person + dry energy rations
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🩹</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>First Aid Kit</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Bandages, antiseptic, & prescription meds
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔦</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Light & Power</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                LED Torch, extra batteries, & power bank
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Vital Documents</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Aadhaar/IDs & cash in waterproof pouches
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
