import OwnerProfile from '../models/OwnerProfile.js';


export const createOrUpdateProfile = async (req, res) => {
try {
const existing = await OwnerProfile.findOne({ user: req.user._id });
const data = {
user: req.user._id,
phone: req.body.phone,
photoUrl: req.body.photoUrl,
nationalIdUrl: req.body.nationalIdUrl,
address: req.body.address,
};


const profile = existing
? await OwnerProfile.findOneAndUpdate({ user: req.user._id }, data, { new: true })
: await OwnerProfile.create(data);


res.json(profile);
} catch (err) {
res.status(500).json({ message: err.message || 'Profile update failed' });
}
};


export const getProfile = async (req, res) => {
try {
const profile = await OwnerProfile.findOne({ user: req.user._id });
if (!profile) return res.status(404).json({ message: 'Profile not found' });
res.json(profile);
} catch (err) {
res.status(500).json({ message: err.message || 'Fetch failed' });
}
};