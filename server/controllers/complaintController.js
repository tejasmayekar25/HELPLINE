const Complaint = require("../models/Complaint");

// 1. GET all complaints (with optional search & status filter)
exports.getComplaints = async (req, res) => {
  try {
    const { status, disasterType, search } = req.query;
    let query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (disasterType && disasterType !== "All") {
      query.$or = [{ disasterType }, { category: disasterType }];
    }

    if (search) {
      query.$or = [
        { ticketId: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve complaints", error: error.message });
  }
};

// 2. GET one complaint by ID, TicketId, or Mobile/Phone
exports.getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    let complaint;

    // Check if valid Mongo ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      complaint = await Complaint.findById(id);
    }

    // If not found by ObjectId, search by ticketId, mobile, or phone
    if (!complaint) {
      complaint = await Complaint.findOne({
        $or: [
          { ticketId: { $regex: new RegExp(`^${id}$`, "i") } },
          { mobile: id },
          { phone: id }
        ]
      });
    }

    if (!complaint) {
      return res.status(404).json({ message: `No complaint found with identifier: ${id}` });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaint", error: error.message });
  }
};

// 3. POST create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    const body = req.body;
    const name = body.name?.trim();
    const mobile = (body.mobile || body.phone)?.trim();
    const disasterType = body.disasterType || body.category;
    const location = body.location?.trim();
    const description = body.description?.trim();

    // Validation
    if (!name || !mobile || !disasterType || !location || !description) {
      return res.status(400).json({
        message: "Please provide all required fields: name, mobile/phone, disasterType/category, location, and description."
      });
    }

    // Normalize priority & urgency
    const priority = body.priority || (body.urgency ? body.urgency.charAt(0).toUpperCase() + body.urgency.slice(1) : "Normal");
    const urgency = body.urgency || priority.toLowerCase();
    const ticketId = body.ticketId || body.id;

    const newComplaint = new Complaint({
      ticketId,
      name,
      mobile,
      phone: mobile,
      email: body.email || "",
      disasterType,
      category: disasterType,
      location,
      peopleAffected: Number(body.peopleAffected) || 1,
      description,
      priority,
      urgency,
      status: body.status || "Reported",
      reportedAt: body.reportedAt,
      responderNotes: body.responderNotes || "Incident registered in control room. Awaiting dispatch."
    });

    const savedComplaint = await newComplaint.save();
    console.log("Successfully inserted complaint into MongoDB:", savedComplaint.ticketId, savedComplaint._id);
    res.status(201).json(savedComplaint);
  } catch (error) {
    console.error("Failed to register complaint in MongoDB:", error);
    res.status(500).json({ message: "Failed to register complaint", error: error.message });
  }
};

// 4. PUT update complaint status / details
exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = id;
    } else {
      query.$or = [{ ticketId: id }, { mobile: id }];
    }

    const updatedComplaint = await Complaint.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found for update" });
    }

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: "Failed to update complaint", error: error.message });
  }
};

// 5. DELETE a complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = id;
    } else {
      query.$or = [{ ticketId: id }];
    }

    const deletedComplaint = await Complaint.findOneAndDelete(query);

    if (!deletedComplaint) {
      return res.status(404).json({ message: "Complaint not found for deletion" });
    }

    res.status(200).json({ message: "Complaint deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete complaint", error: error.message });
  }
};

