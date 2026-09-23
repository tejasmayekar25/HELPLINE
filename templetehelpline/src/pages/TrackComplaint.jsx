import React, { useState, useEffect } from 'react';

export default function TrackComplaint({ complaints, initialTicketId, setActivePage }) {
  const [query, setQuery] = useState(initialTicketId || '');
  const [trackedTicket, setTrackedTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // If initialTicketId changes or is provided, auto-track
  useEffect(() => {
    if (initialTicketId) {
      setQuery(initialTicketId);
      const found = complaints.find(
        (c) => c.id.toLowerCase() === initialTicketId.toLowerCase()
      );
      if (found) {
        setTrackedTicket(found);
        setErrorMessage('');
      }
    }
  }, [initialTicketId, complaints]);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setTrackedTicket(null);

    const cleanQuery = query.trim();
    if (!cleanQuery) {
      setErrorMessage('Please enter a valid Ticket ID or 10-digit Phone Number.');
      return;
    }

    const found = complaints.find(
      (c) =>
        c.id.toLowerCase() === cleanQuery.toLowerCase() ||
        c.phone.replace(/\s+/g, '') === cleanQuery.replace(/\s+/g, '')
    );

    if (found) {
      setTrackedTicket(found);
    } else {
      setErrorMessage(
        `No emergency record found for "${cleanQuery}". Please verify your Ticket ID (e.g., DIS-1042) or registered phone number.`
      );
    }
  };

  return (
    <div className="track-page container" style={{ paddingBottom: '3.5rem' }}>
      <div className="tracker-box" style={{ marginTop: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-high">24x7 Real-Time Tracking</span>
          <h1 className="section-title" style={{ marginTop: '0.4rem' }}>
            Live Disaster Incident & Ticket Tracker
          </h1>
          <p className="section-desc">
            Enter your Ticket ID (e.g., <strong>DIS-1042</strong>) or registered phone number to view field responder status.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleTrackSubmit} className="tracker-search-bar">
          <input
            type="text"
            className="form-input"
            style={{ flex: 1 }}
            placeholder="Enter Ticket ID (e.g. DIS-1042) or Mobile Number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            <span>🔍</span> Track Status
          </button>
        </form>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              background: 'var(--primary-red-light)',
              border: '1px solid var(--primary-red)',
              color: 'var(--primary-red)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Tracked Ticket Details */}
        {trackedTicket && (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Active Emergency Ticket
                </span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-red)' }}>
                  {trackedTicket.id}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className={`badge badge-${trackedTicket.urgency}`}>
                  {trackedTicket.urgency}
                </span>
                <span
                  className={`badge badge-${trackedTicket.status.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  ● {trackedTicket.status}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                margin: '1.25rem 0',
                fontSize: '0.88rem',
              }}
            >
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block' }}>Category:</strong>
                {trackedTicket.category}
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block' }}>Location:</strong>
                📍 {trackedTicket.location}
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block' }}>Citizen:</strong>
                {trackedTicket.name} ({trackedTicket.phone})
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block' }}>Reported At:</strong>
                ⏱️ {trackedTicket.reportedAt}
              </div>
            </div>

            <div
              style={{
                background: 'var(--bg-subtle)',
                padding: '0.9rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                marginBottom: '1.5rem',
              }}
            >
              <strong>Citizen Incident Description:</strong> {trackedTicket.description}
            </div>

            {/* Visual Step Timeline */}
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>Response Lifecycle Progress</h4>
            <div className="timeline">
              <div className="timeline-step completed">
                <div className="step-marker"></div>
                <div className="step-title">1. Incident Reported & Registered</div>
                <div className="step-time">{trackedTicket.reportedAt}</div>
                <div className="step-desc">Ticket entered into disaster management command registry.</div>
              </div>

              <div
                className={`timeline-step ${
                  trackedTicket.status !== 'Reported' ? 'completed' : 'current'
                }`}
              >
                <div className="step-marker"></div>
                <div className="step-title">2. Verification & Unit Assignment</div>
                <div className="step-desc">
                  Control room verified coordinate data and alerted the territorial rescue battalion.
                </div>
              </div>

              <div
                className={`timeline-step ${
                  trackedTicket.status === 'Dispatched' ||
                  trackedTicket.status === 'In Progress' ||
                  trackedTicket.status === 'Resolved'
                    ? trackedTicket.status === 'Dispatched'
                      ? 'current'
                      : 'completed'
                    : ''
                }`}
              >
                <div className="step-marker"></div>
                <div className="step-title">3. Rescue / Response Unit Dispatched</div>
                <div className="step-desc">Field vehicles and personnel mobilized towards the incident area.</div>
              </div>

              <div
                className={`timeline-step ${
                  trackedTicket.status === 'In Progress' ||
                  trackedTicket.status === 'Resolved'
                    ? trackedTicket.status === 'In Progress'
                      ? 'current'
                      : 'completed'
                    : ''
                }`}
              >
                <div className="step-marker"></div>
                <div className="step-title">4. Ground Operations In Progress</div>
                <div className="step-desc">Rescue, hazard containment, or medical relief underway.</div>
              </div>

              <div
                className={`timeline-step ${
                  trackedTicket.status === 'Resolved' ? 'completed' : ''
                }`}
              >
                <div className="step-marker"></div>
                <div className="step-title">5. Incident Safely Resolved</div>
                <div className="step-desc">Citizens rescued or hazard neutralized. Site verified safe.</div>
              </div>
            </div>

            {/* Officer Remarks */}
            {trackedTicket.responderNotes && (
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '0.9rem',
                  borderLeft: '4px solid var(--accent-blue)',
                  background: 'var(--bg-subtle)',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                  fontSize: '0.88rem',
                }}
              >
                <strong>🛡️ Response Officer Remarks:</strong> {trackedTicket.responderNotes}
              </div>
            )}

            <div style={{ marginTop: '1.75rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="tel:112" className="btn-primary">
                <span>📞</span> Contact Control Room (112)
              </a>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setActivePage('report')}
              >
                Report Another Emergency
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
