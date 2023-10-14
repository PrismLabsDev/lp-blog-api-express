const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  token: { type: String, required: true },
}, { timestamps: true });

schema.methods.toJSON = function () {
  const schemaObject = this.toObject();
  schemaObject.id = schemaObject._id;
  return schemaObject;
};

const UserVerification = mongoose.model('UserVerification', schema);

module.exports = UserVerification;