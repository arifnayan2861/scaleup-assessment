const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");
const Invoice = require("../models/invoiceModel");
const { processPayment } = require("./paymentController");

const viewApplications = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (
      job.postedBy.toString() !== req.user.userId.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not authorized to view applications for this job",
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .populate("job", "title");

    res.status(200).json({ applications });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error viewing applications", error: err.message });
  }
};

const manageApplication = async (req, res) => {
  const { applicationId } = req.params;
  const { action } = req.body;

  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const job = await Job.findById(application.job);

    if (
      job.postedBy.toString() !== req.user.userId.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to manage this application" });
    }

    if (action === "accept") {
      application.status = "accepted";
    } else if (action === "reject") {
      application.status = "rejected";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await application.save();

    res
      .status(200)
      .json({ message: `Application ${action}ed successfully`, application });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error managing application", error: err.message });
  }
};

// const applyForJob = async (req, res) => {
//   const { jobId } = req.params;

//   try {
//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     const existingApplication = await Application.findOne({
//       job: jobId,
//       applicant: req.user.userId,
//     });
//     if (existingApplication) {
//       return res
//         .status(400)
//         .json({ message: "You have already applied for this job" });
//     }

//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ message: "CV is required to apply for a job" });
//     }

//     const paymentResult = await processPayment(100, req.user.userId);
//     if (paymentResult.status !== "success") {
//       return res.status(400).json({ message: "Payment failed" });
//     }

//     const newApplication = new Application({
//       job: jobId,
//       applicant: req.user.userId,
//       status: "pending",
//       paymentStatus: "paid",
//     });

//     await newApplication.save();

//     const invoice = new Invoice({
//       user: req.user.userId,
//       amount: 100,
//     });

//     await invoice.save();

//     res.status(201).json({
//       message: "Application submitted successfully",
//       application: newApplication,
//       invoice,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error applying for job", error: err.message });
//   }
// };

const applyForJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.userId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "CV is required to apply for a job" });
    }

    const cvPath = req.file.path;

    const paymentResult = await processPayment(100, req.user.userId);
    if (paymentResult.status !== "success") {
      return res.status(400).json({ message: "Payment failed" });
    }

    const newApplication = new Application({
      job: jobId,
      applicant: req.user.userId,
      status: "pending",
      paymentStatus: "paid",
      cvPath: cvPath,
    });

    await newApplication.save();

    const invoice = new Invoice({
      user: req.user.userId,
      amount: 100,
    });

    await invoice.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
      invoice,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error applying for job", error: err.message });
  }
};

module.exports = { viewApplications, manageApplication, applyForJob };
