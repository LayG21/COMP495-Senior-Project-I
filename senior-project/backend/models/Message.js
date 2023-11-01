const mongoose = require("mongoose");

//apparently it is recommended to use mongodbs unique ids and not your own to avoid complexity
//not sure what to do about that
const messageSchema = new mongoose.Schema({
  conversationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  senderID: {
    type: Number,
    required: true,
  },
  receiverID: {
    type: Number,
    required: true,
  },
},{timestamp:true});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;