const mongoose = require("mongoose");

//apparently it is recommended to use mongodbs unique ids and not your own to avoid complexity
//not sure what to do about that
const messageSchema = new mongoose.Schema({
  senderID: {
    type: Number,
    required: true,
  },
  receiverID: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
},{timestamps:true});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
/*const messageSchema = new mongoose.Schema({
  conversationID: {
    type: String,
    ref:'Conversation',
    required: true,
    
  },
  sender: {
    type: Number,
    required: true,
  },
  receiver: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
},{timestamps:true}); */