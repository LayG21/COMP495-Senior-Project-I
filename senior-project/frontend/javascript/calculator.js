//File used by gpa and course calculatorr

//math for gpa calculator
/*((letter grade * weight) / weight)*/
/* A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0
*/
/* Freshman Credits = 0 - 29, Sophomore = 30 - 59, Junior = 60 - 89, Senior = 90 or more  */
//round numbers to two decimals

document.addEventListener('DOMContentLoaded', () => {
    //Dispaly all users you can chat with
    getRole();
});

let Role = "";
// Adds up the values to get grade. Triggered by submit button
// some professors may add one percent for additional points so it helps with that.
let grades = 0;
let weights = 0;
let math = 0;
let grade_output = "";
let classification_output = "";
let credit_output = 0;
let errorContainer = document.getElementById('error-container');
let errorMessages = document.getElementById('listed-messages');

//create more fields
function addMore() {
    var calcTable = document.getElementById("gpa-calc-table");
    var newRow = calcTable.insertRow();

    var nameCell = newRow.insertCell(0);
    var nameInput = document.createElement("input");
    nameInput.className = "course-name";
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Enter Name");
    nameCell.appendChild(nameInput);

    var gradeCell = newRow.insertCell(1);
    var gradeInput = document.createElement("input");
    gradeInput.className = "course-grade";
    gradeInput.setAttribute("type", "text");
    gradeInput.setAttribute("placeholder", "Enter Grade");
    gradeCell.appendChild(gradeInput);

    var weightCell = newRow.insertCell(2);
    var weightInput = document.createElement("input");
    weightInput.className = "course-weight";
    weightInput.setAttribute("type", "text");
    weightInput.setAttribute("placeholder", "Enter Weight");
    weightCell.appendChild(weightInput);
}

//reset back to normal
function resetTable() {
    //clear rows if there are any
    var calcTable = document.getElementById("gpa-calc-table");
    while (calcTable.rows.length > 1) {
        calcTable.deleteRow(1);
    }

    // Clear content in the bottom-div
    var bottomDiv = document.querySelector(".bottom-div");
    bottomDiv.textContent = "";
}

function resultAdd() {
    grades = document.getElementsByClassName('course-grade');
    weights = document.getElementsByClassName('course-weight');
    let grade_output_element = document.getElementById('calc-results');

    math = 0;
    var p1 = 0;
    var p2 = 0;
    let message = "";
    let messageArray = [];

    for (var i = 0; i < weights.length; i++) {
        // if no grade input
        if ((!grades[i].value) && (weights[i].value)) {
            message = "Please input course grade";
            //grade_output_element.textContent = "";
            messageArray.push(message);
        }
        // if no weight input
        if ((grades[i].value) && (!weights[i].value)) {
            message = "Please input course weight";
            //grade_output_element.textContent = "";
            messageArray.push(message);
        }
        //if not a number 
        if (isNaN(grades[i].value) || isNaN(weights[i].value)) {
            messageArray.push("Please enter valid numeric values for grade and weight");
        }
        // if both are empty search for not empty, this just means the user did not input in this field
        if ((!grades[i].value) && (!weights[i].value)) {
            continue;
        }
        // if one field is not empty and both are not empty, add up input values
        else {
            p1 += (+(grades[i].value * weights[i].value));
            p2 += (+(weights[i].value));
        }
    }
    if (messageArray.length > 0) {
        handleResponse(messageArray);
    }
    else {
        if (errorContainer.style.display === "block") {
            closeErrorContainer();
            math = Number(p1 / p2);
            grade_output = math;
            credit_output = p2;
            classification_output = classification(credit_output);
        }
        math = Number(p1 / p2);
        grade_output = math;
        credit_output = p2;
        classification_output = classification(credit_output);

    }
}

//close error-container
function closeErrorContainer() {
    errorMessages.textContent = "";
    errorContainer.style.display = "none";
}

//add error
function handleResponse(data) {
    let errorContainer = document.getElementById("error-container");
    let listErrors = document.getElementById("listed-messages");
    listErrors.textContent = '';

    if (Array.isArray(data)) {
        // Handle array of errors
        data.forEach(error => {
            errorContainer.style.display = "block";
            let errorDiv = document.createElement('li');
            errorDiv.textContent = error;
            listErrors.appendChild(errorDiv);
        });
        errorContainer.appendChild(listErrors);
    } else {
        // Handle single error
        errorContainer.style.display = "block";
        let errorDiv = document.createElement('li');
        errorDiv.textContent = data;
        listErrors.appendChild(errorDiv);
        errorContainer.appendChild(listErrors);
    }
}


//gets classification based on earned hours
function classification(input) {
    if ((input >= 0) && (input <= 29)) {
        return "Freshman";
    }
    else if ((input >= 30) && (input <= 59)) {
        return "Sophomore";
    }
    else if ((input >= 60) && (input <= 89)) {
        return "Junior";
    }
    else {
        return "Senior";
    }

}


//changes the added row back to default

//output for course calculator
/*function courseOutput() {
    if (credit_output > 100) {
        alert("You are going over the 100 percentage");
    }
    grade_output = document.getElementById('calc-results');
    grade_output.value = "Your grade: " + math.toFixed(2) + "%";
}*/

//gpa output calculates grade the same way ncat does, it trunacates.
function gpaOutput() {
    //the math.floor is not meant to round up, just stop at two decimals
    //ncat does not round up last decimal
    let results = document.querySelector(".bottom-div");
    results.textContent = "";   //clear before running

    let grade = document.createElement("p");
    let classfication = document.createElement("p");
    let credits = document.createElement("p");

    grade.setAttribute("id", "calc-results");
    classfication.setAttribute("id", "calc-classification");
    credits.setAttribute("id", "calc-credits");

    grade.textContent = "Your Grade: " + Math.floor(math * 100) / 100;;
    classfication.textContent = "Your Classification: " + classification_output;
    credits.textContent = "Your Credits: " + credit_output;

    results.appendChild(grade);
    results.appendChild(classfication);
    results.appendChild(credits);
}

//works and rounds up second decimal
/*function courseresultAdd() {
    //calculates grades
    resultAdd();

    //outputs results
    courseOutput();
}*/

//works and does not round up, it truncates it.
function calculateGPA() {
    //calculates grade
    resultAdd();

    //outputs results
    gpaOutput();
}
// UI Function to update navigation based on user role
function updateNavigation(userRole) {
    const navItems = document.querySelectorAll('.links li');
    Role = userRole
    navItems.forEach((item) => {
        const role = item.getAttribute('data-role');
        if (role && role !== userRole) {
            item.remove(); // Remove the navigation item from the DOM if the role doesn't match
        }
    });
}
//fetch request to get role
function getRole() {
    fetch(`/user/role`, {
        method: 'GET',
        credentials: "include",
    })
        .then(response => {
            return response.json();
        })
        .then((data) => {
            updateNavigation(data.role);
        })
        .catch(error => {
            console.log("Error in getting role");
        });
}