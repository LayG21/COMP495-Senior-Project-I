//Mimic MySQL database with mock database

//These are the open conversations
//NOTE: How to send and receive the conversation id
const openConversations = [
  {
    convoID: 1,
    user1ID: 209,
    user2ID: 102,
  },
  {
    convoID: 2,
    user1ID: 307,
    user2ID: 102,
  },
];
//These are the messages associated with each conversation
const conversationMessages = [
  {
    messageID: 1, //Primary Key
    messageContent: "Test Message",
    receiverID: 209,
    senderID: 102,
    convoID: 1,
    timestamp: "Test Message Timestamp",
  },
  {
    messageID: 2,
    messageContent: "Test Message",
    receiverID: 102,
    senderID: 209,
    convoID: 1,
    timestamp: "Test Message Timestamp",
  },
  {
    messageID: 3,
    messageContent: "Test Message",
    receiverID: 307,
    senderID: 102,
    convoID: 2,
    timestamp: "Test Message Timestamp",
  },
];

module.exports = {
  openConversations,
  conversationMessages,
};
