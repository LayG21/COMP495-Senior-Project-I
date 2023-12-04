const express = require('express');
const router = express.Router();
const { roles } = require("../roles/roles");
const ClassSelection = require('../models/ClassSelections');
const Student = require('../models/Student'); // Import the Student model
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { isAuthorized } = require("../middleware/authorizationMiddleware");

router.get('/get_selected_classes', isAuthenticated, isAuthorized([roles.STUDENT]), async (req, res) => {
    try {
        const StuID = req.session.user.id; // Retrieve the student ID from the session

        // Check if the student with the given studentID exists
        const student = await Student.findOne({ studentID: StuID });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Query the MongoDB model ClassSelection to get selected classes
        const selectedClasses = await ClassSelection.find({ StuID: student.studentID });

        res.json(selectedClasses);
    } catch (error) {
        console.error('Error fetching selected classes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
