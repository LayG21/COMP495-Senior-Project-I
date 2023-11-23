const mongoose = require("mongoose");

//apparently it is recommended to use mongodbs unique ids and not your own to avoid complexity
//not sure what to do about that

const studentSchema = new mongoose.Schema({
  studentID: {
    type: Number,
    required: true,
    unique: true,
  },
  studentFirstName: {
    type: String,
    required: true,
  },
  studentLastName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  studentPassword: {
    type: String,
    required: true,
  },
  studentStatus: {
    type: String,
    required: true,
  },
  studentClassification: {
    type: String,
    required: true,
  },
  studentGPA: {
    type: Number,
    required: true,
  },
  advisorID: {
    type: Number,
    ref: 'Advisor',
    required: true,
  },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;