//Mimic MySQL database with mock database

//These are the open conversations
const openConversations = [
    {
        convoId: 1,
        user1ID:101,
        user2ID:102
    },
]

//These are the messages associated with each conversation
const conversationMessages = [
    {
        messageID: 1,
        messageContent: "Test Message",
        receiverID: 101,
        senderID: 102,
        convoId: 1,
        timestamp: "Test Message Timestamp",

    },
    {
        messageID: 2,
        messageContent: "Test Message",
        receiverID: 102,
        senderID: 101,
        convoId: 1,
        timestamp: "Test Message Timestamp",

    },
    {
        messageID: 3,
        messageContent: "Test Message",
        receiverID: 101,
        senderID: 102,
        convoId: 1,
        timestamp: "Test Message Timestamp",

    }
    ,
]

module.exports = {
    openConversations,
    conversationMessages,
};