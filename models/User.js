import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  clerkId: { type: String, required: false, unique: true },
  username: { type: String, required: true, unique: true },
  referred: { type: Boolean, default: false },
  referralId: {type: String, required: false},
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  referralActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReferralActivity' }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
