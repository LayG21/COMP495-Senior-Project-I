/*function myFunction(){
    //works and prints the year 
    document.getElementById("output").append("\n" + new Date().getFullYear() + "\n");
    console.log(new Date().getMonth());
}*/

/*Example of code that takes in start and end time but then outputs times avaialble based on*/ 


function generateAppointments(start, end, duration, buffer) {
    const appointments = [];
  
    let time = start;
    while (time < end) {
      const start_time = new Date(time);
      const end_time = new Date(time.getTime() + duration * 60000);
  
      appointments.push({ start: start_time, end: end_time });
  
      time = new Date(end_time.getTime() + buffer * 60000);
    }
  
    return appointments;
  }
  
  

const startDate = new Date('2023-04-07T09:00:00');
const endDate = new Date('2023-04-07T17:00:00');
const durations = 30; // 30 minutes
const buffer = 10; // 10 minutes

const appointments = generateAppointments(startDate, endDate, durations, buffer);
console.log(appointments);