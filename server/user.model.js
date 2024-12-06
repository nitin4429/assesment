import mongoose from 'mongoose'

// Define the schema for a user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Create a Mongoose model for the user
const User = mongoose.model('User', userSchema);

export default User;
