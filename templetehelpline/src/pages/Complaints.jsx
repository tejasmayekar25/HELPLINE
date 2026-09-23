import { useState } from 'react';
import ComplaintCard from '../components/ComplaintCard';

export default function Complaints({ complaints, onTrack, setActivePage }) {
  const [filterUrgency, setFilterUrgency] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');

  const filteredComplaints = complaints.filter((c) => {
    const matchesUrgency =
      filterUrgency === 'All' || c.urgency.toLowerCase() === filterUrgency.toLowerCase();
    const matchesStatus =
      filterStatus === 'All' || c.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesUrgency && matchesStatus && matchesSearch;
  });

  return (
    <div className="complaints-page container" style={{ paddingBottom: '3.5rem' }}>
      <div className="section-header" style={{ marginTop: '2rem' }}>
        <div>
          <span className="badge badge-medium">Public Transparency Feed</span>
          <h1 className="section-title" style={{ marginTop: '0.4rem' }}>
            Citizen Complaints & Disaster Incidents
          </h1>
          <p className="section-desc">
            Explore live grievances submitted by citizens across various zones with real-time response updates.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => setActivePage('report')}
        >
          <span>🚨</span> File New Complaint
        </button>
      </div>

      {/* Filter and Search Controls */}
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
          marginBottom: '1.75rem',
        }}
      >
        {/* Search */}
        <input
          type="text"
          className="form-input"
          style={{ flex: '1 1 250px' }}
          placeholder="Search by Ticket ID, area, citizen, or keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Urgency Filter */}
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

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Status:
          </label>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option value="reported">Reported</option>
            <option value="dispatched">Dispatched</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        Showing <strong>{filteredComplaints.length}</strong> incidents (Total: {complaints.length})
      </div>

      {/* Complaints Grid */}
      {filteredComplaints.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
          <h3>No complaints match your filter criteria</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Try resetting your search query or selecting "All" filters.
          </p>
          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: '1rem' }}
            onClick={() => {
              setFilterUrgency('All');
              setFilterStatus('All');
              setSearch('');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="complaints-grid">
          {filteredComplaints.map((c) => (
            <ComplaintCard key={c.id} complaint={c} onTrack={onTrack} />
          ))}
        </div>
      )}
    </div>
  );
}
