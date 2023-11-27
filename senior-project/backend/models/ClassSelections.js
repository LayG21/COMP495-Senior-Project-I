const mongoose = require("mongoose");

//apparently it is recommended to use mongodbs unique ids and not your own to avoid complexity
//not sure what to do about that

const classselectionSchema = new mongoose.Schema({
    SelectionID: {
        type: Number,
        required: true,
        unique: true,
    },

    StuID: {
        type: Number,
        ref: 'Student',
        required: true,

    },
    SelectedClassCodeName: {
        type: String,
        required: true,
    },
    SelectedClassID: {
        type: Number,
        required: true,
    },
    SelectedClassName: {
        type: String,
        required: true,
    },
    Semester: {
        type: String,
        required: true,
    },
    SelectedDate: {
        type: Date,
        default: Date.now(),
        required: true,
    }
});

const ClassSelections = mongoose.model('ClassSelections', classselectionSchema);
module.exports = Student;