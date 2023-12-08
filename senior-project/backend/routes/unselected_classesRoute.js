const express = require('express');
const router = express.Router();
const { roles } = require("../roles/roles");
const ClassSelection = require('../models/ClassSelections');
const Class = require('../models/Class');
const Student = require('../models/Student'); // Import the Student model
const Counter = require('../models/Counter'); // Import the Counter model
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { isAuthorized } = require("../middleware/authorizationMiddleware");

router.get('/get_unselected_classes', isAuthenticated, isAuthorized([roles.STUDENT]), async (req, res) => {
    try {
        const StuID = Number(req.session.user.id); // Retrieve the student ID from the session

        // Check if the student with the given studentID exists
        const query = Student.findOne({ studentID: StuID }); // Convert StuID to Number
        const student = await query;
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }


        // Assuming you have a MongoDB model named Classes
        const selectedClassIDs = await ClassSelection.find({ StuID: student.studentID }).distinct('SelectedClassID');



        const unselectedClasses = await Class.find({ ClassID: { $not: { $in: selectedClassIDs } } });


        res.json(unselectedClasses);
    } catch (error) {
        console.error('Error fetching unselected classes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;