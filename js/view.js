"use strict";
/**
 * File Name: view.js
 * Description: This JavaScript file is meant to be read by view.html
 *              Retrieves data of a specific student from localStorage.
 *              Then displays the data on in table in view.html
 */

// Task 12
let studentIndex = JSON.parse(localStorage.getItem(STUDENT_INDEX_KEY));
let queueIndex = JSON.parse(localStorage.getItem(STUDENT_QUEUE_KEY));

let student = consultSession.getStudent(studentIndex, queueIndex);

let fullNameView = document.getElementById("fullNameView");
let studentIdView = document.getElementById("studentIdView");
let problemView = document.getElementById("problemView");

fullNameView.innerHTML = `<h6>${student._fullName}</h6>`;
studentIdView.innerHTML = `<h6>${student._studentId}</h6>`;
problemView.innerHTML = `<h6 id="problemView">${student._problem}</h6>`;