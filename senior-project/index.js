//main entry point file
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
//serve html,css, and js
//app.use(express.static(path.join(__dirname, "frontend")));


const loginRoutes = require('./backend/routes/loginroute.js');
const chatRoutes = require('./backend/routes/chatroute.js');
const advisorRoutes = require('./backend/routes/advisorroute.js');
const studentRoutes = require('./backend/routes/studentroute.js');

app.use('/', loginRoutes);
app.use('/', chatRoutes);
app.use('/', advisorRoutes);
app.use('/', studentRoutes);

app.get('/', (req, res)=>{
    res.send('Welcome');
});
//callback function after PORT
app.listen(PORT, ()=>
console.log(`listening on port: ${PORT}`)
);