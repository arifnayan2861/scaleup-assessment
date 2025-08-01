const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { applyForJob } = require("../controllers/applicationController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/apply/:jobId", verifyToken, upload.single("cv"), applyForJob);

module.exports = router;
