const express = require('express');
const router = express.Router();
const {mockStudents,mockAdvisors,} = require('../../test/users');

//get page
router.get('/student',(req,res) =>{
    res.send("Accessing student profile page");
});
//get student profile
router.get('/student/:id',(req,res) =>{
    const studentID = parseInt(req.params.id);
    const studentProfile = mockStudents.find(student => student.id === studentID);
    res.send(studentProfile);
});
module.exports = router;