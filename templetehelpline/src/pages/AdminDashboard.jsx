import { useState } from 'react';

export default function AdminDashboard({
  complaints,
  onStatusUpdate,
  onNotesUpdate,
  onDeleteTicket,
  onTrack,
}) {
  const [search, setSearch] = useState('');
  const [filterUrgency, setFilterUrgency] = useState('All');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [noteText, setNoteText] = useState('');

  const criticalCount = complaints.filter((c) => c.urgency === 'critical').length;
  const dispatchedCount = complaints.filter((c) => c.status === 'Dispatched').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;

  const filtered = complaints.filter((c) => {
    const matchesUrgency =
      filterUrgency === 'All' || c.urgency.toLowerCase() === filterUrgency.toLowerCase();
    const matchesSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    return matchesUrgency && matchesSearch;
  });

  const handleStartEditNote = (c) => {
    setEditingNotesId(c.id);
    setNoteText(c.responderNotes || '');
  };

  const handleSaveNote = (id) => {
    if (onNotesUpdate) {
      onNotesUpdate(id, noteText);
    }
    setEditingNotesId(null);
  };

  return (
    <div className="admin-page container" style={{ paddingBottom: '3.5rem' }}>
      <div className="section-header" style={{ marginTop: '2rem' }}>
        <div>
          <span className="badge badge-critical">Control Room Authority Access</span>
          <h1 className="section-title" style={{ marginTop: '0.4rem' }}>
            Disaster Response & Grievance Dispatch Console
          </h1>
          <p className="section-desc">
            Directly manage emergency field dispatches, escalate life-threatening incidents, and update resolution lifecycle.
          </p>
        </div>
      </div>

      {/* Control Room Metric Counters */}
      <div className="stats-grid" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div>
            <div className="stat-number">{complaints.length}</div>
            <div className="stat-label">Total Logged</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-red-light)', color: 'var(--primary-red)' }}>
            ⚠️
          </div>
          <div>
            <div className="stat-number" style={{ color: 'var(--primary-red)' }}>
              {criticalCount}
            </div>
            <div className="stat-label">Critical Incidents</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚒</div>
          <div>
            <div className="stat-number">{dispatchedCount + inProgressCount}</div>
            <div className="stat-label">Teams In Field</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)' }}>
            ✅
          </div>
          <div>
            <div className="stat-number" style={{ color: 'var(--accent-green)' }}>
              {resolvedCount}
            </div>
            <div className="stat-label">Safely Resolved</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          background: 'var(--bg-card)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          marginBottom: '1.5rem',
        }}
      >
        <input
          type="text"
          className="form-input"
          style={{ flex: '1 1 280px' }}
          placeholder="Filter by Ticket ID, Citizen Name, Phone, or Ward..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Urgency:
          </label>
          <select
            className="form-select"
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
          >
            <option>All</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Moderate</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="dashboard-table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Citizen Details</th>
              <th>Category & Location</th>
              <th>Urgency</th>
              <th>Reported</th>
              <th>Live Status</th>
              <th>Officer Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No complaints found matching current filters.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong style={{ color: 'var(--text-primary)' }}>{item.id}</strong>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <a
                      href={`tel:${item.phone}`}
                      style={{ color: 'var(--primary-red)', fontSize: '0.8rem', fontWeight: 600 }}
                    >
                      📞 {item.phone}
                    </a>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.category}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      📍 {item.location}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${item.urgency}`}>{item.urgency}</span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {item.reportedAt}
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={item.status}
                      onChange={(e) => onStatusUpdate(item.id, e.target.value)}
                    >
                      <option>Reported</option>
                      <option>Dispatched</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                  <td style={{ maxWidth: '220px' }}>
                    {editingNotesId === item.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <input
                          type="text"
                          className="form-input"
                          style={{ fontSize: '0.8rem', padding: '0.3rem 0.5rem' }}
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          <button
                            type="button"
                            className="btn-primary"
                            style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                            onClick={() => handleSaveNote(item.id)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                            onClick={() => setEditingNotesId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{ cursor: 'pointer', fontSize: '0.82rem', color: 'var(--text-secondary)' }}
                        onClick={() => handleStartEditNote(item)}
                        title="Click to edit remark"
                      >
                        {item.responderNotes || 'Add remark...'} ✏️
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className="btn-copy"
                        style={{ fontSize: '0.78rem', padding: '0.35rem 0.6rem' }}
                        onClick={() => onTrack(item.id)}
                        title="Track Progress Lifecycle"
                      >
                        🔍 Track
                      </button>
                      {onDeleteTicket && (
                        <button
                          type="button"
                          className="btn-copy"
                          style={{
                            fontSize: '0.78rem',
                            padding: '0.35rem 0.6rem',
                            color: 'var(--primary-red)',
                            borderColor: 'var(--primary-red-light)',
                          }}
                          onClick={() => {
                            if (window.confirm(`Delete ticket ${item.id}?`)) {
                              onDeleteTicket(item.id);
                            }
                          }}
                          title="Delete Ticket"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
