// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // We can save their AI scores here later!
  careerScores: {
    analytical: Number,
    creativity: Number,
    speed: Number
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;