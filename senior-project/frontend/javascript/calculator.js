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

/****************************************
 *        UI Functions        *
 ****************************************/

//create more fields
function addMore() {
    var calcTable = document.getElementById("gpa-calc-table");
    var newRow = calcTable.insertRow();

    var nameCell = newRow.insertCell(0);
    var nameInput = document.createElement("input");
    nameInput.className = "course-name";
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Enter Course Name");
    nameCell.appendChild(nameInput);

    var gradeCell = newRow.insertCell(1);
    var gradeInput = document.createElement("input");
    gradeInput.className = "course-grade";
    gradeInput.setAttribute("type", "text");
    gradeInput.setAttribute("placeholder", "Enter Course Grade");
    gradeCell.appendChild(gradeInput);

    var weightCell = newRow.insertCell(2);
    var weightInput = document.createElement("input");
    weightInput.className = "course-weight";
    weightInput.setAttribute("type", "text");
    weightInput.setAttribute("placeholder", "Enter Course Weight");
    weightCell.appendChild(weightInput);
}


//reset calculator back to normal
function resetCalculator() {
    // Clear content in all rows, starting from the second row
    var calcTable = document.getElementById("gpa-calc-table");
    var rows = calcTable.getElementsByTagName("tr");

    for (var i = rows.length - 1; i > 0; i--) {
        var cells = rows[i].getElementsByTagName("td");

        for (var j = 0; j < cells.length; j++) {
            var input = cells[j].querySelector("input");
            if (input) {
                input.value = "";
            }
        }
        if (i > 1) {
            rows[i].remove();
        }
    }
    // Clear error messages
    closeErrorContainer();
}







//function for deleting rows ecept for default

function deleteRow() {
    var calcTable = document.getElementById("gpa-calc-table");
    var rowCount = calcTable.rows.length;

    if (rowCount > 2) {
        calcTable.deleteRow(rowCount - 1);
    }
}



//close error-container
function closeErrorContainer() {
    errorMessages.textContent = "";
    errorContainer.style.display = "none";
}

//add error to display to user
function handleResponse(data) {
    let errorContainer = document.getElementById("error-container");
    let listErrors = document.getElementById("listed-messages");
    listErrors.textContent = '';

    //if errors are an array
    if (Array.isArray(data)) {
        // Handle array of errors
        data.forEach(error => {
            errorContainer.style.display = "block";
            let errorDiv = document.createElement('li');
            errorDiv.textContent = error;
            listErrors.appendChild(errorDiv);
        });
    }
    //for single error
    else if (data) {
        errorContainer.style.display = "block";
        let errorDiv = document.createElement('li');
        errorDiv.textContent = data;
        listErrors.appendChild(errorDiv);
    }
    errorContainer.appendChild(listErrors);
}


// UI Function to update navigation based on user role
function updateNavigation(userRole) {
    const navItems = document.querySelectorAll('.links li');
    Role = userRole
    navItems.forEach((item) => {
        const role = item.getAttribute('data-role');
        if (role && role !== userRole) {
            item.remove();
        }
    });
}


//gets classification based on credit input
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



//triggers calculator
function calculateGPA() {
    //clear errors if any
    closeErrorContainer();

    // function to do the math
    resultAdd();

}
function resultAdd() {
    let rows = document.querySelectorAll('#gpa-calc-table-body tr');
    let hasError = false;
    let errorMessage = "Please fix the following issues:\n";
    let totalPoints = 0;
    let totalWeight = 0;
    let validRows = 0;

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells;
        let gradeInput = cells[1].querySelector('input');
        let weightInput = cells[2].querySelector('input');

        // If entire row is empty consider it skipped
        if (!gradeInput.value && !weightInput.value) {
            continue;
        }

        // Handle missing grade 
        if (!gradeInput.value) {
            hasError = true;
            errorMessage += `\nRow ${i + 1}: Please input grade.\n`;
        }

        // Handle missing weight
        else if (!weightInput.value) {
            hasError = true;
            errorMessage += `\nRow ${i + 1}: Please input weight.\n`;
        }

        // Handle valid numbers
        if (!hasError) {
            let grade = parseFloat(gradeInput.value.trim());
            let weight = parseFloat(weightInput.value.trim());

            if (isNaN(grade)) {
                hasError = true;
                errorMessage += `\nRow ${i + 1}: Invalid grade.\n`;
            }
            if (isNaN(weight)) {
                hasError = true;
                errorMessage += `\nRow ${i + 1}:Invalid weight.\n`;
            }
            //do math for rows with input that matches a number
            else {
                totalPoints += grade * weight;
                totalWeight += weight;
                validRows++;
            }
        }
    }

    // Display error message if there's an issue
    if (hasError) {
        handleResponse(errorMessage);
    }
    else {
        if (validRows > 0) {
            math = totalPoints / totalWeight;
            grade_output = `Your GPA: ${math.toFixed(2)}`;
            credit_output = totalWeight;
            classification_output = classification(credit_output);

            // Display results
            displayResults();
        }
    }
}





function displayResults() {
    // Display results in the bottom-div
    var bottomDiv = document.querySelector(".bottom-div");
    bottomDiv.textContent = ""; // Clear previous content

    // Create input elements
    var gpaInput = document.createElement("input");
    gpaInput.type = "text";
    gpaInput.placeholder = "GPA";
    gpaInput.className = "calc-results";
    gpaInput.id = "calc-results";
    gpaInput.value = grade_output;
    gpaInput.readOnly = true;

    var classificationInput = document.createElement("input");
    classificationInput.type = "text";
    classificationInput.placeholder = "Classification";
    classificationInput.className = "calc-classification";
    classificationInput.id = "calc-classification";
    classificationInput.value = classification_output;
    classificationInput.readOnly = true;

    var creditsInput = document.createElement("input");
    creditsInput.type = "text";
    creditsInput.placeholder = "Credits";
    creditsInput.className = "calc-credits";
    creditsInput.id = "calc-credits";
    creditsInput.value = credit_output;
    creditsInput.readOnly = true;

    // Append input elements to bottomDiv
    bottomDiv.appendChild(gpaInput);
    bottomDiv.appendChild(classificationInput);
    bottomDiv.appendChild(creditsInput);

    bottomDiv.style.display = "block";
}






/****************************************
 *        Request Functions        *
 ****************************************/

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

