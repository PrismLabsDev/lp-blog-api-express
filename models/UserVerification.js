const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  token: { type: String, required: true },
}, { timestamps: {
  createdAt: 'created_at', // Use `created_at` to store the created date
  updatedAt: 'updated_at' // and `updated_at` to store the last updated date
} });

schema.methods.toJSON = function () {
  const schemaObject = this.toObject();
  schemaObject.id = schemaObject._id;
  return schemaObject;
};

const UserVerification = mongoose.model('UserVerification', schema);

module.exports = UserVerification;