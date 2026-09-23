import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function ReportComplaint({ onAddComplaint, onTrackTicket, initialCategory }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    category: initialCategory || 'Flood / Waterlogging',
    urgency: 'high',
    peopleAffected: 1,
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.location.trim() || !formData.description.trim()) {
      alert('Please fill out all mandatory fields marked with an asterisk (*)');
      return;
    }

    setIsSubmitting(true);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `DIS-${randomNum}`;
    const now = new Date();
    const dateStr = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}, ${String(
      now.getHours()
    ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTicket = {
      id: newId,
      ticketId: newId,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      mobile: formData.phone.trim(),
      category: formData.category,
      disasterType: formData.category,
      location: formData.location.trim(),
      peopleAffected: Number(formData.peopleAffected) || 1,
      urgency: formData.urgency,
      priority: formData.urgency.charAt(0).toUpperCase() + formData.urgency.slice(1),
      status: 'Reported',
      description: formData.description.trim(),
      reportedAt: dateStr,
      responderNotes: 'Incident logged in disaster control center. Field coordinator verifying location.',
    };

    try {
      // Direct call to Express & MongoDB backend API
      const result = await api.createComplaint(newTicket);
      const saved = result.data || newTicket;

      onAddComplaint(saved);
      setSubmittedTicket({
        ...saved,
        isOnline: result.isOnline
      });

      // Clear form
      setFormData({
        name: '',
        phone: '',
        location: '',
        category: 'Flood / Waterlogging',
        urgency: 'high',
        peopleAffected: 1,
        description: '',
      });
    } catch (err) {
      console.error("Submission error:", err);
      onAddComplaint(newTicket);
      setSubmittedTicket(newTicket);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="report-page container" style={{ paddingBottom: '3.5rem' }}>
      <div className="card-form-wrapper" style={{ marginTop: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge badge-critical">Official Citizen Grievance Portal</span>
          <h1 style={{ fontSize: '1.85rem', marginTop: '0.5rem', marginBottom: '0.3rem' }}>
            Report Disaster Incident or Citizen Grievance
          </h1>
          <p className="section-desc">
            Provide verified details of the crisis to enable quick mobilization of disaster response units.
          </p>
        </div>

        {/* Confirmation banner */}
        {submittedTicket && (
          <div className="success-banner">
            <div style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>✅</div>
            <h3 style={{ color: '#065f46', marginBottom: '0.3rem' }}>
              Incident Successfully Registered in Control Room!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#047857' }}>
              Your emergency ticket has been queued for immediate dispatch. Save your unique Ticket ID:
            </p>
            <div className="success-id-box">{submittedTicket.id}</div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => onTrackTicket(submittedTicket.id)}
              >
                <span>🔍</span> Track This Ticket Live Now
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSubmittedTicket(null)}
              >
                Report Another Incident
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Complainant Name */}
            <div className="form-group">
              <label className="form-label">
                Citizen Full Name <span className="req">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Rajesh Sharma"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Complainant Contact */}
            <div className="form-group">
              <label className="form-label">
                Mobile Number (for updates) <span className="req">*</span>
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder="e.g. 9876543210"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Disaster Category */}
            <div className="form-group">
              <label className="form-label">
                Disaster / Grievance Category <span className="req">*</span>
              </label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Flood / Waterlogging</option>
                <option>Earthquake / Structural Damage</option>
                <option>Fire Outbreak</option>
                <option>Fallen Tree / Road Blockage</option>
                <option>Electric Hazard / Wire Snap</option>
                <option>Landslide / Mudslide</option>
                <option>Medical Emergency / Trapped Citizens</option>
                <option>Food / Clean Water / Relief Supply</option>
              </select>
            </div>

            {/* People affected */}
            <div className="form-group">
              <label className="form-label">Estimated People Affected</label>
              <input
                type="number"
                min="1"
                className="form-input"
                value={formData.peopleAffected}
                onChange={(e) =>
                  setFormData({ ...formData, peopleAffected: e.target.value })
                }
              />
            </div>

            {/* Location & Landmark */}
            <div className="form-group full-width">
              <label className="form-label">
                Exact Incident Location / Landmark / Ward <span className="req">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. House No. 42, Near Railway Crossing, Ward 7, Coastal Road"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            {/* Urgency Selector */}
            <div className="form-group full-width">
              <label className="form-label">
                Urgency Level <span className="req">*</span>
              </label>
              <div className="urgency-selector">
                {[
                  { id: 'critical', label: '🔴 Critical (Life Threat)' },
                  { id: 'high', label: '🟠 High Priority' },
                  { id: 'medium', label: '🔵 Moderate' },
                  { id: 'low', label: '⚪ Low / General' },
                ].map((lvl) => (
                  <div
                    key={lvl.id}
                    className={`urgency-option ${formData.urgency === lvl.id ? `selected ${lvl.id}` : ''}`}
                    onClick={() => setFormData({ ...formData, urgency: lvl.id })}
                  >
                    {lvl.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label className="form-label">
                Detailed Incident Description <span className="req">*</span>
              </label>
              <textarea
                className="form-textarea"
                placeholder="Describe current severity, injuries, rising water level, road blockage, or specific assistance required..."
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
            >
              <span>🚨</span> Submit Incident Report to Disaster Control Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
