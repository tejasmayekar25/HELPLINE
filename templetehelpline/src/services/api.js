// API client service with automatic local storage fallback
const API_BASE_URL = 'http://localhost:5000/api/complaints';

export const api = {
  // GET all complaints
  async getComplaints(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const url = query ? `${API_BASE_URL}?${query}` : API_BASE_URL;
      const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return { success: true, data, isOnline: true };
    } catch {
      // Fallback to localStorage
      const local = localStorage.getItem('suraksha_complaints');
      return {
        success: true,
        data: local ? JSON.parse(local) : [],
        isOnline: false,
      };
    }
  },

  // GET one complaint by ID or mobile
  async getComplaintById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return { success: true, data, isOnline: true };
    } catch {
      const local = localStorage.getItem('suraksha_complaints');
      const list = local ? JSON.parse(local) : [];
      const found = list.find(
        (c) =>
          c.id?.toLowerCase() === id.toLowerCase() ||
          c._id?.toLowerCase() === id.toLowerCase() ||
          c.mobile === id ||
          c.phone === id
      );
      if (found) return { success: true, data: found, isOnline: false };
      return { success: false, message: 'Complaint not found', isOnline: false };
    }
  },

  // POST create a new complaint
  async createComplaint(formData) {
    const ticketId = formData.ticketId || formData.id || `DIS-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = formData.reportedAt || `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}, ${String(
      now.getHours()
    ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const payload = {
      ticketId: ticketId,
      id: ticketId,
      name: formData.name,
      mobile: formData.mobile || formData.phone,
      phone: formData.mobile || formData.phone,
      email: formData.email || '',
      disasterType: formData.disasterType || formData.category,
      category: formData.disasterType || formData.category,
      location: formData.location,
      peopleAffected: Number(formData.peopleAffected) || 1,
      description: formData.description,
      priority: formData.priority || (formData.urgency ? formData.urgency.charAt(0).toUpperCase() + formData.urgency.slice(1) : 'Normal'),
      urgency: (formData.urgency || formData.priority || 'Normal').toLowerCase(),
      status: formData.status || 'Reported',
      reportedAt: dateStr,
      responderNotes: formData.responderNotes || 'Incident logged in disaster control center. Field coordinator verifying location.'
    };

    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      // Ensure normalized fields for frontend compatibility
      const normalizedRecord = {
        ...data,
        id: data.ticketId || data.id || ticketId,
        phone: data.phone || data.mobile,
        category: data.category || data.disasterType,
        urgency: (data.urgency || data.priority || 'normal').toLowerCase(),
      };

      // Sync to localStorage
      const local = localStorage.getItem('suraksha_complaints');
      const list = local ? JSON.parse(local) : [];
      const updated = [normalizedRecord, ...list.filter(c => c.id !== normalizedRecord.id)];
      localStorage.setItem('suraksha_complaints', JSON.stringify(updated));

      return { success: true, data: normalizedRecord, isOnline: true };
    } catch (err) {
      console.warn("Backend API error or unreachable, saving locally:", err.message);
      // Fallback local record
      const fallbackRecord = {
        ...payload,
        _id: `local-${Date.now()}`,
      };

      const local = localStorage.getItem('suraksha_complaints');
      const list = local ? JSON.parse(local) : [];
      const updated = [fallbackRecord, ...list];
      localStorage.setItem('suraksha_complaints', JSON.stringify(updated));

      return { success: true, data: fallbackRecord, isOnline: false };
    }
  },

  // PUT update complaint
  async updateComplaint(id, updates) {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return { success: true, data, isOnline: true };
    } catch {
      const local = localStorage.getItem('suraksha_complaints');
      const list = local ? JSON.parse(local) : [];
      const updated = list.map((c) =>
        c.id === id || c._id === id ? { ...c, ...updates } : c
      );
      localStorage.setItem('suraksha_complaints', JSON.stringify(updated));
      return { success: true, isOnline: false };
    }
  },

  // DELETE a complaint
  async deleteComplaint(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return { success: true, isOnline: true };
    } catch {
      const local = localStorage.getItem('suraksha_complaints');
      const list = local ? JSON.parse(local) : [];
      const updated = list.filter((c) => c.id !== id && c._id !== id);
      localStorage.setItem('suraksha_complaints', JSON.stringify(updated));
      return { success: true, isOnline: false };
    }
  },
};
