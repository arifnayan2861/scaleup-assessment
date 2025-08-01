const express = require("express");
const { createCompany } = require("../controllers/companyController");
const { verifyToken, verifyRole } = require("../middlewares/auth");
const router = express.Router();

router.post("/create-company", verifyToken, verifyRole("admin"), createCompany);

module.exports = router;
