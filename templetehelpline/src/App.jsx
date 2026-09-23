import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Complaints from './pages/Complaints';
import ReportComplaint from './pages/ReportComplaint';
import TrackComplaint from './pages/TrackComplaint';
import Helpline from './pages/Helpline';
import SafetyTips from './pages/SafetyTips';
import AdminDashboard from './pages/AdminDashboard';
import { api } from './services/api';

import './App.css';

// Verified 24x7 National & Disaster Helplines
const DEFAULT_HELPLINES = [
  {
    id: 1,
    name: 'Universal Emergency Helpline',
    number: '112',
    category: 'Universal',
    authority: 'Ministry of Home Affairs',
    desc: 'All-in-one emergency response for Police, Fire, and Medical assistance.',
    icon: '🚨',
  },
  {
    id: 2,
    name: 'NDMA Disaster Control Room',
    number: '1078',
    category: 'Disaster',
    authority: 'National Disaster Management Authority',
    desc: 'Disaster warning, flood alerts, cyclone assistance, and evacuation support.',
    icon: '🌪️',
  },
  {
    id: 3,
    name: 'Disaster Medical Ambulance',
    number: '108',
    category: 'Medical',
    authority: 'Emergency Medical Services',
    desc: 'Immediate paramedic dispatch, trauma care, and hospital coordination.',
    icon: '🚑',
  },
  {
    id: 4,
    name: 'Fire & Rescue Operations',
    number: '101',
    category: 'Rescue',
    authority: 'Fire & Emergency Department',
    desc: 'Fire suppression, building collapse rescue, and hazardous spill containment.',
    icon: '🚒',
  },
  {
    id: 5,
    name: 'State Disaster Relief Control',
    number: '1070',
    category: 'Disaster',
    authority: 'State Disaster Management Cell',
    desc: 'District level rescue dispatch, relief camps, and flood boat coordination.',
    icon: '🌊',
  },
  {
    id: 6,
    name: 'Police Emergency Response',
    number: '100',
    category: 'Police',
    authority: 'State Police Force',
    desc: 'Law enforcement, perimeter security, and traffic diversion during emergencies.',
    icon: '👮',
  },
  {
    id: 7,
    name: 'District Flood & Relief Cell',
    number: '1077',
    category: 'Disaster',
    authority: 'Collectorate Control Room',
    desc: 'Local flood level alerts, food packet distribution, and temporary shelters.',
    icon: '🛶',
  },
  {
    id: 8,
    name: 'Women & Child Safety Helpline',
    number: '1091',
    category: 'Universal',
    authority: 'Women & Child Development',
    desc: 'Disaster shelter safety, distress assistance, and counseling support.',
    icon: '🛡️',
  },
  {
    id: 9,
    name: 'Civic Hazards & Tree Fall Control',
    number: '1913',
    category: 'Civic',
    authority: 'Municipal Corporation',
    desc: 'Waterlogging clearance, fallen tree removal, and electrical line hazard repairs.',
    icon: '⚡',
  },
];

// Initial demo incidents
const INITIAL_COMPLAINTS = [
  {
    id: 'DIS-1042',
    name: 'Rajesh Sharma',
    phone: '9876543210',
    category: 'Flood / Waterlogging',
    location: 'Sector 4, Riverbank Low-lying Colony',
    peopleAffected: 6,
    urgency: 'critical',
    status: 'Dispatched',
    description: 'Ground floors inundated with 4ft water. Elderly family members stranded on terrace.',
    reportedAt: '22 Sep 2026, 18:30',
    responderNotes: 'NDRF Boat Unit 4 assigned. ETA 15 minutes.',
  },
  {
    id: 'DIS-1039',
    name: 'Pooja Verma',
    phone: '9811223344',
    category: 'Fallen Tree / Road Block',
    location: 'East Highway KM 14 near Toll Plaza',
    peopleAffected: 25,
    urgency: 'high',
    status: 'In Progress',
    description: 'Massive Banyan tree collapsed during cyclone winds. Ambulance lane completely blocked.',
    reportedAt: '22 Sep 2026, 17:15',
    responderNotes: 'Civic crane dispatched. One lane cleared for emergency vehicles.',
  },
  {
    id: 'DIS-1025',
    name: 'Anil Deshmukh',
    phone: '9765432109',
    category: 'Electric Hazard',
    location: 'Gandhi Nagar Main Market Road',
    peopleAffected: 40,
    urgency: 'medium',
    status: 'Resolved',
    description: 'Live power wire snapped and sparking on flooded pavement after heavy showers.',
    reportedAt: '22 Sep 2026, 14:00',
    responderNotes: 'Grid sub-station isolated power. Cable repaired and re-energized safely.',
  },
];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [trackedTicketId, setTrackedTicketId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Persist complaints in state
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('suraksha_complaints');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_COMPLAINTS;
      }
    }
    return INITIAL_COMPLAINTS;
  });

  // Fetch live complaints from MongoDB on mount
  useEffect(() => {
    let isMounted = true;
    async function loadDbComplaints() {
      try {
        const res = await api.getComplaints();
        if (res.success && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const normalized = res.data.map((c) => ({
            ...c,
            id: c.ticketId || c.id || `DIS-${Math.floor(1000 + Math.random() * 9000)}`,
            phone: c.phone || c.mobile,
            category: c.category || c.disasterType,
            urgency: (c.urgency || c.priority || 'normal').toLowerCase(),
          }));
          setComplaints(normalized);
        }
      } catch (err) {
        console.warn("Could not fetch complaints from MongoDB:", err);
      }
    }
    loadDbComplaints();
    return () => { isMounted = false; };
  }, []);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync complaints to localStorage
  useEffect(() => {
    localStorage.setItem('suraksha_complaints', JSON.stringify(complaints));
  }, [complaints]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Add a new complaint
  const handleAddComplaint = (newTicket) => {
    setComplaints((prev) => [newTicket, ...prev.filter(c => c.id !== newTicket.id)]);
  };

  // Update status (e.g. from Admin Dashboard)
  const handleStatusUpdate = async (ticketId, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === ticketId || c._id === ticketId ? { ...c, status: newStatus } : c))
    );
    try {
      await api.updateComplaint(ticketId, { status: newStatus });
    } catch (err) {
      console.error("Failed to update status in DB:", err);
    }
  };

  // Update responder notes
  const handleNotesUpdate = async (ticketId, newNotes) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === ticketId || c._id === ticketId ? { ...c, responderNotes: newNotes } : c))
    );
    try {
      await api.updateComplaint(ticketId, { responderNotes: newNotes });
    } catch (err) {
      console.error("Failed to update notes in DB:", err);
    }
  };

  // Delete ticket (admin)
  const handleDeleteTicket = async (ticketId) => {
    setComplaints((prev) => prev.filter((c) => c.id !== ticketId && c._id !== ticketId));
    try {
      await api.deleteComplaint(ticketId);
    } catch (err) {
      console.error("Failed to delete ticket from DB:", err);
    }
  };

  // Jump to track a ticket
  const handleTrackTicket = (ticketId) => {
    setTrackedTicketId(ticketId);
    setActivePage('track');
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setActivePage('report');
  };

  return (
    <div className="app-container">
      {/* Global Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Page Content */}
      <main className="main-wrapper">
        {activePage === 'home' && (
          <Home
            setActivePage={setActivePage}
            complaints={complaints}
            onTrack={handleTrackTicket}
            helplines={DEFAULT_HELPLINES}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activePage === 'helpline' && (
          <Helpline helplines={DEFAULT_HELPLINES} />
        )}

        {activePage === 'report' && (
          <ReportComplaint
            onAddComplaint={handleAddComplaint}
            onTrackTicket={handleTrackTicket}
            initialCategory={selectedCategory}
          />
        )}

        {activePage === 'track' && (
          <TrackComplaint
            complaints={complaints}
            initialTicketId={trackedTicketId}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'complaints' && (
          <Complaints
            complaints={complaints}
            onTrack={handleTrackTicket}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'safety' && (
          <SafetyTips setActivePage={setActivePage} />
        )}

        {activePage === 'admin' && (
          <AdminDashboard
            complaints={complaints}
            onStatusUpdate={handleStatusUpdate}
            onNotesUpdate={handleNotesUpdate}
            onDeleteTicket={handleDeleteTicket}
            onTrack={handleTrackTicket}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
