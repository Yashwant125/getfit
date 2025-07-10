const express = require("express");
const {
  signup,
  login,
  adminResetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/admin-reset-password", adminResetPassword);

module.exports = router;
