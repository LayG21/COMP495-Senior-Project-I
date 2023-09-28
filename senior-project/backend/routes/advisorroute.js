const express = require('express');
const router = express.Router();

//get page
router.get('/advisor',(req,res) =>{
    res.send("Accessing advisor view page");
});

module.exports = router;