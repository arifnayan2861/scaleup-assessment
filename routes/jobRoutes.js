const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/auth");
const {
  createJob,
  getAllJobs,
  getJobsByCompany,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const {
  viewApplications,
  manageApplication,
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/create", verifyToken, verifyRole("employee"), createJob);
router.post("/create", verifyToken, verifyRole("admin"), createJob);

router.get("/", verifyToken, getAllJobs);

router.get(
  "/my-company",
  verifyToken,
  verifyRole("employee"),
  getJobsByCompany
);
router.put("/:jobId", verifyToken, verifyRole("employee"), updateJob);

router.put("/:jobId", verifyToken, verifyRole("admin"), updateJob);

router.delete("/:jobId", verifyToken, verifyRole("employee"), deleteJob);

router.delete("/:jobId", verifyToken, verifyRole("admin"), deleteJob);

router.get("/applications/:jobId", verifyToken, viewApplications);

router.put("/applications/:applicationId", verifyToken, manageApplication);

module.exports = router;
