"use strict";
/**
 * File Name: main.js
 * Description: This JavaScript file is meant to be read by index.html
 *              Defines the functions required to:
 *                  display the current queue and the clock, 
 *                  remove a student from a queue, 
 *                  and view a student's information.
 */

// Task 7
/**
 * Function Name: checkDigits
 * @desc Converts a 1 digit number to 2 digits by adding a zero to the left.
 * @param {string} digits number to be checked
 * @return 2 digit number (as a string)
 */
function checkDigits(digits) {
    if (digits < 10) {
        digits = "0" + digits;
    }
    return digits;
}

/**
 * Function Name: updateClock
 * @desc Updates the time for the clock in index.html
 */
function updateClock() {
    let timeRef = document.getElementById("currentTime");
    let today = new Date();
    let hours = checkDigits(today.getHours());
    let minutes = checkDigits(today.getMinutes());
    let seconds = checkDigits(today.getSeconds());
    let time = hours + ":" + minutes + ":" + seconds;
    timeRef.innerText = time;
}

// Task 8
/**
 * Function Name: view
 * @desc Saves student's position in queue and queue number to localStorage, then redirects to view.html
 * @param {number} index student's position in queue
 * @param {number} queueIndex queue number
 */
function view(index, queueIndex) {
    localStorageUpdate(STUDENT_INDEX_KEY, index);
    localStorageUpdate(STUDENT_QUEUE_KEY, queueIndex);
    window.location.href = "view.html";
}

// Task 9
/**
 * Function Name: markDone
 * @desc Confirm with the user that they want to mark student as done, then removes student from queue.
 * @param {number} index student's position in queue
 * @param {number} queueIndex queue number
 */
function markDone(index, queueIndex) {
    let confirmation = confirm("Mark student as done?");
    if (confirmation == true) {
        consultSession.removeStudent(index, queueIndex);
        localStorageUpdate(APP_DATA_KEY, consultSession)
    }
    displayQueue(consultSession.queue)
}

// Task 10
// display the current queue status to the user
/**
 * Function Name: displayQueue
 * @desc display the current queue status to the user in index.html
 * @param {Session} data the Session class instance associated with APP_DATA_KEY in localStorage
 */
function displayQueue(data) {
    let completeHTML = "";
    let queueHTML = "";
    let queueNumber = 0;
    let queueContent = document.getElementById("queueContent");
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            let fullName = data[i][j].fullName
            queueHTML = `
                ${queueHTML}
                <li class="mdl-list__item mdl-list__item--three-line">
                    <span class="mdl-list__item-primary-content">
                        <i class="material-icons mdl-list__item-avatar">person</i>
                        <span>${fullName}</span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <a class="mdl-list__item-secondary-action" onclick="view(${j},${i})"><i
                            class="material-icons">info</i></a>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <a class="mdl-list__item-secondary-action" onclick="markDone(${j},${i})"><i
                            class="material-icons">done</i></a>
                    </span>
                </li>
            `;
        }
        queueNumber = i + 1;
        completeHTML = `
            ${completeHTML}
            <ul class="mdl-list">
                <h4>Queue ${queueNumber}</h4>
                ${queueHTML}
            </ul>
        `;
        queueHTML = "";
    }
    queueContent.innerHTML = completeHTML;
}

updateClock();
setInterval(updateClock, 1000);
displayQueue(consultSession.queue);