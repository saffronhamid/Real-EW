import mongoose from 'mongoose';

const apartmentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OwnerProfile',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  images: [String],
  verificationStatus: {
    type: String,
    enum: ['Pending', 'Verified', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

export default mongoose.model('Apartment', apartmentSchema);
