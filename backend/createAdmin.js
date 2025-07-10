const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User"); // Adjust the path if needed

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@getfit.com";
    const phone = "9999999999";
    const password = "admin123";

    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      console.log("⚠️ Admin already exists");
    } else {
      const newUser = new User({ email, phone, password });
      await newUser.save();
      console.log("✅ Admin created:", email);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

createAdmin();
