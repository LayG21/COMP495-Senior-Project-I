const express = require('express');
const router = express.Router();
const {validateInput} = require('../middleware/loginvalidate');

//get login page
router.get('/login',(req,res) =>{
    res.send("Accessing login page");
});

//auth process
router.post('/login',(req,res) =>{ 
    
});



module.exports = router;