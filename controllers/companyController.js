const Company = require("../models/companyModel");

const createCompany = async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    const companyExists = await Company.findOne({ name });
    if (companyExists) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const newCompany = new Company({ name, description });
    await newCompany.save();

    if (userId) {
      const user = await User.findByIdAndUpdate(
        userId,
        { company: newCompany._id },
        { new: true }
      );
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
    }

    res
      .status(201)
      .json({ message: "Company created successfully", company: newCompany });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating Company", error: err.message });
  }
};

module.exports = { createCompany };
