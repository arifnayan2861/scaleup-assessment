const express = require("express");
const {
  register,
  login,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken, verifyRole } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/create-user", verifyToken, verifyRole("admin"), createUser);

router.get("/all-users", verifyToken, verifyRole("admin"), getAllUsers);

router.put(
  "/update-user/:userId",
  verifyToken,
  verifyRole("admin"),
  updateUser
);

router.delete(
  "/delete-user/:userId",
  verifyToken,
  verifyRole("admin"),
  deleteUser
);

module.exports = router;
