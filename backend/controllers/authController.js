const User = require("../models/User");
const jwt = require("jsonwebtoken");

// === Signup ===
const signup = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: "Phone and password are required." });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this phone number." });
    }

    const newUser = new User({ phone, password }); // password will be hashed via pre('save')
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: "Server error during signup." });
  }
};

// === Login ===
const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: "Phone and password are required." });
    }

    const user = await User.findOne({ phone });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid phone or password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { phone: user.phone },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error during login." });
  }
};

// === Manual Reset by Admin Only ===
const adminResetPassword = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;

    if (!phone || !newPassword) {
      return res.status(400).json({ error: "Phone and new password are required." });
    }

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ error: "User not found." });

    user.password = newPassword; // will be hashed by pre-save
    await user.save();

    res.status(200).json({ message: "Password manually reset by admin." });
  } catch (err) {
    console.error("❌ Admin reset error:", err);
    res.status(500).json({ error: "Server error during admin reset." });
  }
};

module.exports = {
  signup,
  login,
  adminResetPassword,
};
