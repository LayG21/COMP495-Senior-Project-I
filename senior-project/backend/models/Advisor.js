const mongoose = require("mongoose");

//apparently it is recommended to use mongodbs unique ids and not your own to avoid complexity
//not sure what to do about that

const advisorSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  advisorFirstName: {
    type: String,
    required: true,
  },
  advisorLastName: {
    type: String,
    required: true,
  },
  advisorEmail: {
    type: String,
    required: true,
  },
  advisorPassword: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
});
const Advisor = mongoose.model('Advisor', advisorSchema);
module.exports = Advisor;