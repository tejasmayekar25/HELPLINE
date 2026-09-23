
export default function ComplaintCard({ complaint, onTrack }) {
  const {
    id,
    name,
    phone,
    category,
    location,
    peopleAffected,
    urgency,
    status,
    description,
    reportedAt,
    responderNotes,
  } = complaint;

  // Category Icon helper
  const getCategoryIcon = (cat) => {
    if (cat.includes('Flood')) return '🌊';
    if (cat.includes('Fire')) return '🔥';
    if (cat.includes('Tree') || cat.includes('Road')) return '🚧';
    if (cat.includes('Electric')) return '⚡';
    if (cat.includes('Earthquake')) return '🏚️';
    if (cat.includes('Medical')) return '🚑';
    return '⚠️';
  };

  const statusClass = status.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="complaint-card">
      <div className="complaint-card-header">
        <div className="complaint-id-wrapper">
          <span className="complaint-icon">{getCategoryIcon(category)}</span>
          <div>
            <div className="complaint-id">{id}</div>
            <div className="complaint-date">Logged: {reportedAt}</div>
          </div>
        </div>

        <div className="complaint-badges">
          <span className={`badge badge-${urgency}`}>{urgency}</span>
          <span className={`badge badge-${statusClass}`}>● {status}</span>
        </div>
      </div>

      <div className="complaint-body">
        <h4 className="complaint-category">{category}</h4>
        <div className="complaint-location">
          <span>📍</span> {location}
        </div>

        <p className="complaint-description">{description}</p>

        <div className="complaint-meta">
          <div className="meta-item">
            <strong>Citizen:</strong> {name}
          </div>
          {phone && (
            <div className="meta-item">
              <strong>Phone:</strong> {phone}
            </div>
          )}
          {peopleAffected && (
            <div className="meta-item">
              <strong>Affected:</strong> ~{peopleAffected} people
            </div>
          )}
        </div>

        {responderNotes && (
          <div className="complaint-officer-notes">
            <strong>🛡️ Response Unit Note:</strong> {responderNotes}
          </div>
        )}
      </div>

      <div className="complaint-card-footer">
        <button
          type="button"
          className="btn-track-card"
          onClick={() => onTrack && onTrack(id)}
        >
          <span>🔍</span> Track Live Progress ➔
        </button>
      </div>
    </div>
  );
}
