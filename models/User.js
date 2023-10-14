const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  bio: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false },
}, { timestamps: true });

// Removes sensitive data during serialization
schema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.email;
  delete userObject.password;
  return userObject;
};

const User = mongoose.model('User', schema);

module.exports = User;