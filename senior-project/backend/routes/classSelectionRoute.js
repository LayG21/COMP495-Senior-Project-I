const express = require('express');
const router = express.Router();
const { roles } = require("../roles/roles");
const ClassSelection = require('../models/ClassSelections');
const Student = require('../models/Student'); // Import the Student model
const Counter = require('../models/Counter'); // Import the Counter model
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { isAuthorized } = require("../middleware/authorizationMiddleware");

// Add a new route to handle class selections
router.post('/select_classes',  isAuthenticated, isAuthorized([roles.STUDENT]), async (req, res) => {
  const StuID = req.session.user.id;

  try {
    

    if (!req.body.selectedClasses) {
      console.error('selectedClasses is undefined');
      return res.status(400).send('Bad Request: selectedClasses not provided');
    }

    const selectedClasses = JSON.parse(req.body.selectedClasses);

    // Check if the student with the given studentID exists
    const query = Student.findOne({ studentID: StuID });
    const student = await query;

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

      

    // Map the selected classes to the appropriate fields in the model
    const classSelections = await Promise.all(selectedClasses.map(async classInfo => {
      // Find the counter for 'selections' and increment it
      const counter = await Counter.findByIdAndUpdate({ _id: 'selections' }, { $inc: { seq: 1 } }, { new: true, upsert: true });

      return {
        SelectionID: counter.seq,
        StuID: student.studentID, // Assign the ObjectId of the student
        SelectedClassID: classInfo.SelectedClassID,
        SelectedClassCodeName: classInfo.SelectedClassCodeName,
        SelectedClassName: classInfo.SelectedClassName,
        Semester: classInfo.Semester,
      };
    }));

    // Insert the class selections into the database
    const result = await ClassSelection.insertMany(classSelections);


    res.status(200).json({ message: 'Class selections were successfully saved.' });
  } catch (error) {
    console.error('Error inserting class selections:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
