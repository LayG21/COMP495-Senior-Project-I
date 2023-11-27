const mongoose = require("mongoose");

//apparently it is recommended to use mongodbs unique ids and not your own to avoid complexity
//not sure what to do about that

const classselectionSchema = new mongoose.Schema({

});

const ClassSelections = mongoose.model('ClassSelections', classselectionSchema);
module.exports = Student;