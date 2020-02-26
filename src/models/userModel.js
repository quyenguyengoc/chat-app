import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  fullname: String,
  gender: {
    type: String, default: "male"
  },
  contact: {
    phone: { type: Number, default: null },
    address: { type: String, default: null }
  },
  avatar: { type: String, default: 'avatar-default.jpg' },
  role: { type: String, default: 'user'},
  local: {
    email: { type: String, trim: true },
    password: String,
    isActived: { type: Boolean, default: false },
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  google: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  deletedAt: { type: Number, default: null }
});

UserSchema.statics = {
  insert(data) {
    return this.create(data);
  },
  find(condition) {
    return this.findOne(condition).exec();
  },
  active(token) {
    let condition = {
      'local.verifyToken': token
    }
    let updatedColumns = {
      'local.isActived': true,
      'updatedAt': new Date()
    }
    return this.findOneAndUpdate(condition, updatedColumns).exec();
  }
}

module.exports = mongoose.model('user', UserSchema);
