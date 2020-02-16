import mongoose from 'mongoose';

let Schema = mongoose.schema;

let ContactSchema = new Schema({
  userID: String,
  contactID: String,
  status: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  deletedAt: { type: Number, default: null }
});

module.exports = mongoose.model('contact', ContactSchema);
