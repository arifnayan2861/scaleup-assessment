const Job = require("../models/jobModel");
// const User = require("../models/userModel");
const Company = require("../models/companyModel");

const createJob = async (req, res) => {
  const { title, description, companyName } = req.body;

  try {
    let companyId = null;
    if (companyName) {
      const company = await Company.findOne({ name: companyName });
      if (!company) {
        return res.status(400).json({ message: "Company not found" });
      }
      companyId = company._id;
    }

    const newJob = new Job({
      title,
      description,
      company: companyId,
      postedBy: req.user.userId,
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (err) {
    res.status(500).json({ message: "Error creating job", error: err.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company postedBy");
    res.status(200).json({ jobs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: err.message });
  }
};

const getJobsByCompany = async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.user.company }).populate(
      "company postedBy"
    );
    res.status(200).json({ jobs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: err.message });
  }
};

const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const { title, description, companyId } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (
      req.user.role !== "admin" &&
      job.postedBy.toString() !== req.user.userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this job" });
    }

    if (title) job.title = title;
    if (description) job.description = description;
    if (companyId) job.company = companyId;

    await job.save();
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Error updating job", error: err.message });
  }
};

const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (
      req.user.role !== "admin" &&
      job.postedBy.toString() !== req.user.userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job" });
    }

    await Job.deleteOne({ _id: jobId });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job", error: err.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobsByCompany,
  updateJob,
  deleteJob,
};
