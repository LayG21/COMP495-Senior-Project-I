//File used by course

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
let errorContainer = document.getElementById('error-container');
let errorMessages = document.getElementById('listed-messages');

/****************************************
 *        UI Functions        *
 ****************************************/

//create more fields
function addMore() {
    var calcTable = document.getElementById("course-calc-table");
    var newRow = calcTable.insertRow();

    var nameCell = newRow.insertCell(0);
    var nameInput = document.createElement("input");
    nameInput.className = "assignment-name";
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Enter Assignment Name");
    nameCell.appendChild(nameInput);

    var gradeCell = newRow.insertCell(1);
    var gradeInput = document.createElement("input");
    gradeInput.className = "assignment-grade";
    gradeInput.setAttribute("type", "text");
    gradeInput.setAttribute("placeholder", "Enter Assignment Grade");
    gradeCell.appendChild(gradeInput);

    var weightCell = newRow.insertCell(2);
    var weightInput = document.createElement("input");
    weightInput.className = "assignment-weight";
    weightInput.setAttribute("type", "text");
    weightInput.setAttribute("placeholder", "Enter Assignment Weight");
    weightCell.appendChild(weightInput);
}


//reset calculator back to normal
function resetCalculator() {
    document.querySelector(".bottom-div").style.display = "none";

    // Clear content in all rows, starting from the second row
    var calcTable = document.getElementById("course-calc-table");
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

//function for deleting rows except for default

function deleteRow() {
    var calcTable = document.getElementById("course-calc-table");
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


//triggers calculator
function calculateGrade() {
    //clear errors if any
    closeErrorContainer();

    // function to do the math
    resultAdd();

}

//function to calculate grade
function resultAdd() {
    let rows = document.querySelectorAll('#course-calc-table-body tr');
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
            // Check if total weight exceeds 100%
            if (totalWeight > 100) {
                math = totalPoints / totalWeight;
                let warningText = `Warning: The total weight exceeds 100 %\n`;
                warningText += `\n Here is your grade:${math.toFixed(2)}%`
                displayResults(warningText);
            } else {
                math = totalPoints / totalWeight;
                grade_output = `Your Course Grade: ${math.toFixed(2)}%`;
                credit_output = totalWeight;
                // Display results
                displayResults(grade_output);
            }
        }
    }
}

//display results of calculation
function displayResults(resultText) {
    // Display results in the bottom-div
    var bottomDiv = document.querySelector(".bottom-div");
    bottomDiv.textContent = ""; // Clear previous content

    // Create input elements
    var courseInput = document.createElement("input");
    courseInput.type = "text";
    courseInput.placeholder = "Course Grade";
    courseInput.className = "calc-results";
    courseInput.id = "calc-results";
    courseInput.value = resultText;
    courseInput.readOnly = true;

    // Append input elements to bottomDiv
    bottomDiv.appendChild(courseInput);
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

