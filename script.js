// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
    child,
    get,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCw9lrnJKx-dbgJv3MGsbM1X12iixVPN3s",
    authDomain: "calculator-1fe97.firebaseapp.com",
    databaseURL:
        "https://calculator-1fe97-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "calculator-1fe97",
    storageBucket: "calculator-1fe97.appspot.com",
    messagingSenderId: "1022876681666",
    appId: "1:1022876681666:web:9bddedaf5d68a4cd0c025b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const billElement = document.getElementById("billAmount");
const totalBillElement = document.getElementById("totalBillAmount");
const tipElement = document.getElementById("tipAmount");
const noPpl = document.getElementById("noOfPeople");

/* ----------------------------------Event----------------------------- / */
billElement.addEventListener("keyup", calculateBill);
tipElement.addEventListener("keyup", calculateBill);
addButton.addEventListener("click", addCount);
subButton.addEventListener("click", subCount);
saveBtn.addEventListener("click", writeUserData);

/* ----------------------------------Function----------------------------- / */

function calculateBill() {
    let tipAmount = Number(tipElement.value);
    let pplCount = Number(noPpl.textContent);
    let billAmount = Number(billElement.value);

    if (isNaN(billAmount) || billAmount === 0) {
        return;
    }
    if (isNaN(tipAmount) || tipAmount === 0) {
        tipAmount = 10;
    }

    totalBillElement.value = (billAmount + tipAmount) / pplCount;
}

function subCount() {
    let pplCount = Number(noPpl.textContent);
    if (pplCount > 1) {
        pplCount--;
    }
    noPpl.textContent = pplCount;
    calculateBill();
}

function addCount() {
    let pplCount = Number(noPpl.textContent);
    pplCount++;
    noPpl.textContent = pplCount;
    calculateBill();
}

/* ----------------------------------FireBase Write----------------------------- / */
let count = 0;
function writeUserData() {
    let totalBill = document.getElementById("totalBillAmount").value;
    if (isNaN(totalBill) || billAmount === 0) {
        return;
    }
    //count++;
    const db = getDatabase(app);
    set(ref(db, "users/" + count), {
        bill: totalBill,
    });
    readUserData();
}

/* ----------------------------------FireBase Read----------------------------- / */

document.addEventListener("DOMContentLoaded", readUserData);

function readUserData() {
    var element = document.getElementById("historySec");
    element.innerHTML = "";
    count = 0;
    const dbRef = ref(getDatabase());
    get(dbRef, "users/")
        .then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    childData.forEach(function (childChildSnapshot) {
                        count++;
                        var history = document.createElement("p");
                        var text = document.createTextNode(
                            childChildSnapshot.bill
                        );
                        history.appendChild(text);

                        element.appendChild(history);
                    });
                });
            } else {
                console.log("No data available");
                count = 0;
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
