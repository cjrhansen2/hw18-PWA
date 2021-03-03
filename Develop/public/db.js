//initialize indexedDB
const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

let db;
const request = indexedDB.open("budget", 1);

//check database if successful
request.onsuccess = ({ target }) => {
    db = target.result;

    if (navigator.onLine) {
      checkDatabase();
    }
}

//upgrade if needed
request.onupgradeneeded = ({ target }) => {
    let db = target.result;
    db.createObjectStore("pending", { autoIncrement: true });
};

//what to do if there's an error
request.onerror = function(event) {
    console.log("Woops! " + event.target.errorCode);
};

//event listener for the appp going online
window.addEventListener("online", checkDatabase);