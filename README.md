# 🚨 Suraksha — Disaster Helpline & Grievance Portal

Hey there! 👋 Welcome to **Suraksha**. 

During major floods, storms, or fires, emergency call centers often get overloaded. People call for help, but have no way of knowing whether their request was noted or if a rescue team is actually on the way. 

I built this project to solve that exact problem: a simple, reliable emergency portal where citizens can quickly report a disaster in under a minute, track rescue updates in real time, and find verified emergency helpline numbers right away.

---

## ✨ What You Can Do With This App

- **Quickly Report an Emergency:** Got trapped in waterlogging, spotted a fallen power line, or need an evacuation boat? Fill out a simple form with your location, urgency level, and number of people stranded.
- **Get a Real Ticket ID:** As soon as you submit, you get a short reference ID (like `DIS-1042`).
- **Track Status Step-by-Step:** Enter your phone number or ticket ID to see what’s happening (`Reported` ➔ `Under Review` ➔ `In Progress` ➔ `Resolved`). You can also read notes directly from the rescue team.
- **One-Click Emergency Calls:** Instant tap-to-call buttons for 112 (Universal), 108 (Ambulance), 101 (Fire), and 1078 (NDMA Disaster Cell).
- **Control Room Console:** A clean admin dashboard for disaster officials to triage high-priority cases, dispatch field teams, and post real-time updates.

---

## 💻 Tech Stack Behind It

I kept the stack modern, clean, and fast using the **MERN** stack:

- **Frontend:** React with Vite (fast, snappy, and works on mobile or desktop)
- **Styling:** Custom CSS with easy dark/light mode toggle
- **Backend:** Node.js + Express.js (handles the API routes)
- **Database:** MongoDB with Mongoose (stores all citizen reports and status updates)

---

## 🏃‍♂️ How to Run It on Your Computer

You will need **Node.js** and **MongoDB** installed on your system.

### Step 1: Fire up the Backend Server
Open your terminal and run:
```bash
cd server
npm install
node server.js
```
You'll see:
> `Connected to MongoDB successfully: DisasterManagement`  
> `Server running on port 5000`

---

### Step 2: Start the Frontend
Open a second terminal window and run:
```bash
cd templetehelpline
npm run dev
```
Now click or visit: **`http://localhost:5173`** 🎉

---

## 📱 How to Try It Out

1. **Submit a Test Report:**  
   Click **"Report Incident"** at the top, fill out the emergency details, and hit submit. You'll immediately receive your ticket ID!
2. **Check the Live Tracker:**  
   Click **"Track Status"**, paste your ticket ID (or type your phone number), and watch the status progress bar appear with notes.
3. **Open the Admin Console:**  
   Click **"Admin Console"** to see your submitted ticket. You can change its status to *In Progress* or *Resolved* and write a note for the citizen.
4. **See It in the Database:**  
   Open **MongoDB Compass**, connect to `mongodb://127.0.0.1:27017`, and check the `complaints` collection inside `DisasterManagement`. You'll see your record saved with full timestamps.

---

## 📸 Screenshots of the Website

### 1. 🏠 Home Page & Emergency Alerts
> Quick access to emergency incident reporting, active helplines, and survival guides.  
<img width="960" height="600" alt="Screenshot 2026-09-23 092018" src="https://github.com/user-attachments/assets/2d6d292c-3a95-4988-b4cd-1ee3901bd613" />

---

### 2. 🚨 Report Emergency Incident
> Easy form for citizens to submit location, urgency, disaster category, and affected victim count.  
<img width="960" height="600" alt="image" src="https://github.com/user-attachments/assets/814d2252-73c5-4d9d-8ece-e00bb426af11" />

---

### 3. 🔍 Live Ticket Tracking Stepper
> Real-time progress stepper (`Reported` ➔ `Under Review` ➔ `In Progress` ➔ `Resolved`) with field responder notes.  
<img width="960" height="600" alt="image" src="https://github.com/user-attachments/assets/d9146786-a9c6-42fd-bcfc-978873771c04" />

---

### 4. 🎛️ Control Room Admin Dashboard
> Authority console to triage critical cases, dispatch rescue teams, and update case notes.  
<img width="960" height="600" alt="image" src="https://github.com/user-attachments/assets/1ed20e01-6bab-42ca-98f6-b2bdb0e7f535" />

---

### 5. 📞 24x7 Verified Helplines Directory
> One-tap emergency calling to universal and disaster relief numbers (112, 1078, 108, 101).  
<img width="960" height="600" alt="image" src="https://github.com/user-attachments/assets/1e509f47-b2ff-4867-8b8e-552379cdaa84" />

---

## 👥 Team & Contributions

| Member Name | Role | Key Contributions | GitHub / Profile |
|---|---|---|---|
| **Tejas Mayekar** | Full-Stack Lead | Backend REST API, MongoDB integration, system architecture & controllers | [@tejasmayekar](https://github.com/) |
| **[Teammate 2 Name]** | Frontend Developer | React pages (`ReportComplaint.jsx`, `TrackComplaint.jsx`), form validation | [@username](https://github.com/) |
| **[Teammate 3 Name]** | UI/UX & Design | Responsive CSS design system, dark/light mode toggle, Admin Console UI | [@username](https://github.com/) |
| **[Teammate 4 Name]** | Testing & Documentation | API verification, database testing, presentation & viva documentation | [@username](https://github.com/) |

---

## 💡 Built With Care
Hope this project is helpful for understanding how real-world emergency management systems connect citizens with first responders! Feel free to explore the code, report issues, or suggest improvements.
