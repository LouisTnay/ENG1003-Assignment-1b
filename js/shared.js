"use strict";
/**
 * File Name: shared.js
 * Description: This JavaScript file is meant to be read by all HTML files. 
 *              The Student and Session class are defined and initialised as a global variable named consultSession.
 *              There are functions included to process consultSession and localStorage.
 *              The keys to be used for localStorage are also defined.
 */


// Keys for localStorage
const STUDENT_INDEX_KEY = "studentIndex";
const STUDENT_QUEUE_KEY = "queueIndex";
const APP_DATA_KEY = "consultationAppData";

// Task 1
class Student {
    constructor(fullName, studentId, problem) {
        this._fullName = fullName;
        this._studentId = studentId;
        this._problem = problem;
    }

    get fullName() {
        return this._fullName;
    }

    get studentId() {
        return this._studentId;
    }

    get problem() {
        return this._problem;
    }

    /**
    * Method Name: fromData
    * @desc Restoring the data state of the object retrieved from local storage for a single session instance.
    * @param {object} dataObject The parsed object retrieved from local storage.
    */
    fromData(dataObject) {
        this._fullName = dataObject._fullName;
        this._studentId = dataObject._studentId;
        this._problem = dataObject._problem;
    }
}

class Session {
    constructor() {
        this._startTime = new Date();
        this._queue = [];
    }

    get startTime() {
        return this._startTime;
    }

    get queue() {
        return this._queue;
    }

    /**
    * Method Name: addSubQueue
    * @desc Adds another queue to the 'this._queue' array
    */
    addSubQueue() {
        this._queue.push([]);
    }

    /**
    * Method Name: addStudent
    * @desc Adds a student to the shortest queue.
    * @param {string} fullName The full name of the student.
    * @param {string} studentId The student ID.
    * @param {string} problem The problem description.
    */
    addStudent(fullName, studentId, problem) {
        let shortest = this._queue[0].length;
        let shortestQueueIndex = 0;
        for (let i = 0; i < this._queue.length; i++) {
            if (this._queue[i].length < shortest) {
                shortest = this._queue[i].length;
                shortestQueueIndex = i;
            }
        }
        let student = new Student(fullName, studentId, problem);
        this._queue[shortestQueueIndex].push(student);
    }

    /**
    * Method Name: removeStudent
    * @desc Removes a student from the queue at the location specified by studentIndex and queueIndex.
    * @param {number} studentIndex The position of the student in the queue.
    * @param {number} queueIndex The queue number.
    */
    removeStudent(studentIndex, queueIndex) {
        this._queue[queueIndex].splice(studentIndex, 1);
    }

    /**
    * Method Name: getStudent
    * @desc Check if there is data associated with the given key in localStorage.
    * @param {string} studentIndex the key for localStorage
    * @return {boolean} true if there is data, false otherwise
    */
    getStudent(studentIndex, queueIndex) {
        return this._queue[queueIndex][studentIndex];
    }

    /**
    * Method Name: fromData
    * @desc Restoring the data state of the object retrieved from local storage for a single session instance.
    * @param {object} dataObject The parsed object retrieved from local storage.
    */
    fromData(dataObject) {
        this._startTime = dataObject._startTime;
        this._queue = []
        for (let i = 0; i < dataObject._queue.length; i++) {
            this._queue.push([]);
            for (let j = 0; j < dataObject._queue[i].length; j++) {
                if (typeof (dataObject._queue[i][j]) == "object") {
                    let student = new Student();
                    student.fromData(dataObject._queue[i][j]);
                    this._queue[i].push(student);
                }
            }
        }
    }
}

// Task 2
/**
 * Function Name: localStorageCheck
 * @desc check if there is data associated with the given key in localStorage
 * @param {string} key the key for localStorage
 * @return {boolean} true if there is data, false otherwise
 */
function localStorageCheck(key) {
    if (localStorage.getItem(key) == null) {
        return false;
    }
    else {
        return true;
    }
}

// Task 3
/**
 * Function Name: localStorageUpdate
 * @desc converts data to string then saves the given data in localStorage with the given key
 * @param {string} key the key for localStorage
 * @param data the data to be stored in localStorage
 */
function localStorageUpdate(key, data) {
    let dataString = JSON.stringify(data);
    localStorage.setItem(key, dataString);
}

// Task 4
/**
 * Function Name: localStorageGet
 * @desc retrieves the data associated with the given key from localStorage
 * @param {string} key the key for localStorage
 * @return {object} the object for the student data
 */
function localStorageGet(key) {
    let data = localStorage.getItem(key);
    if (typeof JSON.parse(data) == "object") {
        data = JSON.parse(data);
    }
    return data;
}

// Task 5
// check if any data exists for APP_DATA_KEY in localStorage, if exist, retrieve and store inside consultSession variable, if not create new one
let consultSession = new Session;
if (localStorageCheck(APP_DATA_KEY) == true) {
    consultSession.fromData(localStorageGet(APP_DATA_KEY));
}
else {
    consultSession.addSubQueue();
    consultSession.addSubQueue();
    localStorageUpdate(APP_DATA_KEY, consultSession);
}