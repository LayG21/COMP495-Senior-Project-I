<?php
$conection = mysqli_connect("localhost","root","jtmo9657","STUDENT_ADVISOR_WEBAPP");
if(!$conection)
  die("Could not connect to the database".mysqli_connect_error());
else
echo "connection established";
?>