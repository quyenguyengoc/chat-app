import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
  name: String,
  userAmount: { type: Number, min: 3, max: 10 },
  messageAmount: { type: Number, default: 0 },
  userID: String,
  members: [ 
    {
      userID: String,
      nickName: { type: String, default: '' } 
    }
  ],
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  deletedAt: { type: Number, default: null }
});

module.exports = mongoose.model('chat-group', ChatGroupSchema);
