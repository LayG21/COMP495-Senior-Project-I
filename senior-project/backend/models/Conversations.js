const mongoose = require("mongoose");

//apparently it is recommended to use mongodbs unique ids and not your own to avoid complexity
//not sure what to do about that
const conversationSchema = new mongoose.Schema({
  conversationID: {
    type: String,
    required: true,
    },
    users: {
        type: Array,
        required: true,
    }
});
const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;