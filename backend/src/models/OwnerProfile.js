import mongoose from 'mongoose';


const ownerProfileSchema = new mongoose.Schema(
{
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
phone: { type: String },
photoUrl: { type: String },
nationalIdUrl: { type: String },
address: { type: String },
verified: {
type: String,
enum: ['Pending', 'Verified', 'Rejected'],
default: 'Pending'
},
notes: { type: String }
},
{ timestamps: true }
);


export default mongoose.model('OwnerProfile', ownerProfileSchema);