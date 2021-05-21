"use strict";
/**
 * File Name: add.js
 * Description: This JavaScript file is meant to be read by add.html
 *              Defines the addStudent function which is called when the "ADD STUDENT" button is clicked on add.html
 */


// Task 6
/**
 * Function Name: addStudent
 * @desc Checks if the inputs are valid. If they are, the new student is added to queue by saving in consultSession and updating localStorage.
 */
function addStudent() {
    let fullName = document.getElementById("fullName");
    let studentId = document.getElementById("studentId");
    let problem = document.getElementById("problem");
    let fullNameMsg = document.getElementById("fullName_msg");
    let studentIdMsg = document.getElementById("studentId_msg");
    let problemMsg = document.getElementById("problem_msg");
    const REGEX = /^[1-3]{1}[0-9]{7}$/;
    let returnMarker = false;

    if (fullName.value == "" || fullName.value == null) {
        fullNameMsg.textContent = "Your full name is required for booking."
        returnMarker = true;
    }

    if (studentId.value == "" || studentId.value == null) {
        studentIdMsg.textContent = "Your student ID is required for booking."
        returnMarker = true;
    }
    else if (studentId.value.match(REGEX) == null) {
        studentIdMsg.textContent = "Student ID is in the wrong format."
        returnMarker = true;
    }

    if (problem.value == "" || problem.value == null) {
        problemMsg.textContent = "A problem description is required for booking."
        returnMarker = true;
    }

    if (returnMarker == true) {
        return;
    }

    consultSession.addStudent(fullName.value, studentId.value, problem.value);
    localStorageUpdate(APP_DATA_KEY, consultSession)
    alert("Successfully added to queue.")
    window.location.href = "index.html";
}