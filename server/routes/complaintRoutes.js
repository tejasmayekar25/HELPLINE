const express = require("express");
const router = express.Router();
const {
  getComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController");

// Route: /api/complaints
router.route("/")
  .get(getComplaints)
  .post(createComplaint);

// Route: /api/complaints/:id
router.route("/:id")
  .get(getComplaintById)
  .put(updateComplaint)
  .delete(deleteComplaint);

module.exports = router;
