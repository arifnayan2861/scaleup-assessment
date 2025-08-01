const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const connectToDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

connectToDB();

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.use("/api", userRoutes);
app.use("/api", companyRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
