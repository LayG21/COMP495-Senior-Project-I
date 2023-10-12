//connect to database
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "jtmo9657",
  //database: "STUDENT_ADVISOR_WEBAPP",
  port: 3306,
});

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("connection established");
  }
});
module.exports = connection;
