const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    ticketId: { type: String, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, default: "" },
    disasterType: { type: String, required: true },
    category: { type: String },
    location: { type: String, required: true },
    peopleAffected: { type: Number, default: 1 },
    description: { type: String, required: true },
    priority: { 
      type: String, 
      default: "Normal"
    },
    urgency: {
      type: String,
      default: "normal"
    },
    status: { 
      type: String, 
      default: "Reported"
    },
    reportedAt: { type: String },
    responderNotes: { type: String, default: "Incident registered in control room. Awaiting dispatch." }
  },
  { timestamps: true }
);

// Pre-save hook to ensure ticketId, phone, category and urgency sync
complaintSchema.pre("save", function (next) {
  if (!this.ticketId) {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    this.ticketId = `DIS-${randomDigits}`;
  }
  if (!this.phone) {
    this.phone = this.mobile;
  }
  if (!this.mobile && this.phone) {
    this.mobile = this.phone;
  }
  if (!this.category) {
    this.category = this.disasterType;
  }
  if (!this.disasterType && this.category) {
    this.disasterType = this.category;
  }
  if (!this.reportedAt) {
    this.reportedAt = new Date().toLocaleString();
  }
  next();
});

module.exports = mongoose.model("Complaint", complaintSchema);

