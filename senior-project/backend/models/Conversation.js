const mongoose = require("mongoose");

//apparently it is recommended to use mongodbs unique ids and not your own to avoid complexity
//not sure what to do about that
const conversationSchema = new mongoose.Schema({
  advisor:{
    type: Number,
    ref: 'Advisor',
    required: true,
  },
  student:{
    type: Number,
    ref: 'Student',
    required: true,
  }
});
const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;