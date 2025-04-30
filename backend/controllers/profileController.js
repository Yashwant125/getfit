const Profile = require('../models/Profile');

// Create or Update Gym Profile
const upsertProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const existingProfile = await Profile.findOne();

    let savedProfile;
    if (existingProfile) {
      existingProfile.set(profileData);
      savedProfile = await existingProfile.save();
    } else {
      savedProfile = await Profile.create(profileData);
    }

    res.status(200).json(savedProfile);
  } catch (err) {
    console.error('Profile Save Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get Gym Profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.status(200).json(profile);
  } catch (err) {
    console.error('Get Profile Error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  upsertProfile,
  getProfile,
};
