$(document).ready(function () {
    // Function to fetch and display selected classes
    function showSelectedClasses() {
        console.log('showSelectedClasses() function called');
        // Fetch the selected classes data from the server
        $.get('/get_selected_classes', function (data) {
            // Assuming 'data' contains an array of selected classes
            if (data.length > 0) {
                // Create an HTML list to display the selected classes
                const list = $('<ul></ul>');
                data.forEach(function (selectedClass) {
                    list.append(
                        `<li>
                            <strong>Class Code Name:</strong> ${selectedClass.SelectedClassCodeName}
                            <strong>Class ID:</strong> ${selectedClass.SelectedClassID}
                            <strong>Class Name:</strong> ${selectedClass.SelectedClassName}
                            <strong>Semester:</strong> ${selectedClass.Semester}
                        </li>`
                    );
                });
                $('#selectedClassesContainer').empty().append(list);
            } else {
                $('#selectedClassesContainer').text('No classes selected.'); // Display a message if no classes are found
            }
        });
    }

    // Bind the click event to the button
    showSelectedClasses();
    
});
