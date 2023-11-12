const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    ClassCodename: {
        type: String,
        required: true,
    },
    ClassID: {
        type: Number,
        unique: true,
        required: true,
    
    },
    ClassName: {
        type: String,
        required: true,

    },
    ClassDescription: {
        type: String,
        required: true,
    },
    ClassCredits: {
        type: Number,
        required:true,
    },
    ClassPrerequisite: {
        type: String,
        required: true,
    },
    ClassCorequisite: {
        type: String,
        required: true,
    },
    Department: {
        type: String,
        required: true,
    },
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;