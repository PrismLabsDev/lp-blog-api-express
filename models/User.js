const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  bio: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false },
}, { timestamps: {
  createdAt: 'created_at', // Use `created_at` to store the created date
  updatedAt: 'updated_at' // and `updated_at` to store the last updated date
} });

// Removes sensitive data during serialization
schema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.email;
  delete userObject.password;
  userObject.id = userObject._id;
  return userObject;
};

const User = mongoose.model('User', schema);

module.exports = User;