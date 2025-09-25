import OwnerProfile from '../models/OwnerProfile.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // ✅ Correct model

// 🔥 Google Login Controller
export const googleLoginOwner = async (req, res) => {
  try {
    const { name, email, photo, uid } = req.body;

    let owner = await User.findOne({ email });

    if (!owner) {
      owner = await User.create({
        name,
        email,
        photo,
        uid, // can also use googleId: uid
        role: 'owner',
        isVerified: false, // default verification flag
      });
    }

    const token = jwt.sign(
      { id: owner._id, role: 'owner', isVerified: owner.isVerified },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        _id: owner._id,
        name: owner.name,
        email: owner.email,
        isVerified: owner.isVerified,
      },
    });
  } catch (err) {
    console.error("🔥 Google login failed:", err);
    res.status(500).json({ message: 'Google login failed' });
  }
};

// ✅ Create or Update Owner Profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const existing = await OwnerProfile.findOne({ user: req.user.id });

    const data = {
      user: req.user.id,
      phone: req.body.phone,
      photoUrl: req.body.photoUrl,
      nationalIdUrl: req.body.nationalIdUrl,
      address: req.body.address,
    };

    const profile = existing
      ? await OwnerProfile.findOneAndUpdate({ user: req.user.id }, data, { new: true })
      : await OwnerProfile.create(data);

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Profile update failed' });
  }
};

// ✅ Fetch Owner Profile
export const getProfile = async (req, res) => {
  try {
    const profile = await OwnerProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Fetch failed' });
  }
};
