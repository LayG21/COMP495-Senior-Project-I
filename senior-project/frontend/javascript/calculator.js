//File used by gpa and course calculatorr

//math for gpa calculator
/*((letter grade * weight) / weight)*/
/* A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0
*/
/* Freshman Credits = 0 - 29, Sophomore = 30 - 59, Junior = 60 - 89, Senior = 90 or more  */
//round numbers to two decimals

//Adds up the values to get grade. Triggered by submit button
//some professors may add one percent for additional points so it helps with that.
var grades = 0;
var weights = 0;
var math = 0;
var grade_output = "";
var classification_output = "";
var credit_output = 0;
function resultAdd() {
    grades = document.getElementsByClassName('course-grade');
    weights = document.getElementsByClassName('course-weight');
    grade_output = document.getElementById('calc-results');
    math = 0;
    var p1 = 0;
    var p2 = 0;
    for (var i = 0; i < weights.length; i++) {
        //if no grade input
        if ((!grades[i].value) && (weights[i].value)) {
            //continue;
            alert("Please input course grade");
            grade_output.value = "";
            break;
        }
        //if no weight input
        else if ((grades[i].value) && (!weights[i].value)) {
            alert("Please input course weight");
            grade_output.value = "";
            break;
        }
        //if both are empty search for not empty, this just means user did not input in this field
        else if ((!grades[i].value) && (!weights[i].value)) {
            continue;
        }
        //if one field is not empty and both are not empty, add up input values
        else {
            p1 += (+(grades[i].value * weights[i].value));
            p2 += (+(weights[i].value));
        }
    }
    math = Number(p1 / p2);
    grade_output = math;
    credit_output = p2;
    classification_output = classification(credit_output);

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
//add more input fields
function addMore() {
    var calc_form = document.getElementById("added-row");

    var list = document.createElement("li");
    list.setAttribute("class", "calc-fields");

    var name = document.createElement("input");
    name.className = "course-name";
    name.setAttribute("id", "course-name");
    name.setAttribute("type", "text");
    name.setAttribute("placeholder", "Enter Name");

    var grade = document.createElement("input");
    grade.className = "course-grade";
    grade.setAttribute("id", "course-grade");
    grade.setAttribute("type", "text");
    grade.setAttribute("placeholder", "Enter Grade");

    var weight = document.createElement("input");
    weight.className = "course-weight";
    weight.setAttribute("id", "course-weight");
    weight.setAttribute("type", "text");
    weight.setAttribute("placeholder", "Enter Weight");
    list.append(name, grade, weight);
    calc_form.append(list);
}

//changes the added row back to default
function changeDefault() {
    document.getElementById('added-row').innerHTML = "";
}

//output for course calculator
function courseOutput() {
    if (credit_output > 100) {
        alert("You are going over the 100 percentage");
    }
    grade_output = document.getElementById('calc-results');
    grade_output.value = "Your grade: " + math.toFixed(2) + "%";
}

//gpa output calculates grade the same way ncat does, it trunacates.
function gpaOutput() {
    //the math.floor is not meant to round up, just stop at two decimals
    //ncat does not round up last decimal
    document.getElementById('calc-results').value = "Your Grade: " + Math.floor(math * 100) / 100;;
    document.getElementById('calc-classification').value = "Your Classification: " + classification_output;
    document.getElementById('calc-credits').value = "Your Credits: " + credit_output;
}

//works and rounds up second decimal
function courseresultAdd() {
    //calculates grades
    resultAdd();

    //outputs results
    courseOutput();
}

//works and does not round up, it truncates it.
function gparesultAdd() {
    //calculates grade
    resultAdd();

    //outputs results
    gpaOutput();
}