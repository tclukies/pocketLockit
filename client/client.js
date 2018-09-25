var loginCredentials;
var socket = io();

function accessAPI() {
    fetch("https://pocket-lockit.herokuapp.com/profiles")
        .then(response => response.json())
        .then(getData);
}
accessAPI();

function getData(data) {
    loginCredentials = data;
}

document.querySelector(".submit").addEventListener("click", compareCredentials);
document.querySelector("#open-lock").addEventListener("click", unlock);
document.querySelector("#closed-lock").addEventListener("click", lock);
document.querySelector(".lock-log").addEventListener("click", lockLog);
document.querySelector(".go-back").addEventListener("click", goBack)
document.querySelector(".sign-out").addEventListener("click", signOut);

function compareCredentials(event) {
    event.preventDefault();
    if (
        event.path[1][0].value === loginCredentials.profile[0].username &&
        event.path[1][1].value === loginCredentials.profile[0].password
    ) {
        document.querySelector(".signin").classList.add("hidden")
        document.querySelector(".lock-main").classList.remove("hidden")
    } else {
        document.querySelector(".invalid-login").textContent =
            "Incorrect Login. Please Try Again";
    }
}

function unlock(event) {
    event.preventDefault();
    socket.emit("unlock", 42)

    document.getElementById("open-lock").classList.add("hidden")
    document.getElementById("closed-lock").classList.remove("hidden")
    

    var postObject = {
        lock_id: 1,
        status: "unlocked",
        location: "1, 1"
    };

    var postOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    };
    fetch("https://pocket-lockit.herokuapp.com/lock_log", postOptions)
        .then(response => response.json())
        .catch(function(error) {
            console.log(error);
        });
}

function lock(event) {
    event.preventDefault();
    socket.emit("lock", 12)

    document.getElementById("closed-lock").classList.add("hidden")
    document.getElementById("open-lock").classList.remove("hidden")

    var postObject = {
        lock_id: 1,
        status: "locked",
        location: "1, 1"
    };

    var postOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    };
    fetch("https://pocket-lockit.herokuapp.com/lock_log", postOptions)
        .then(response => response.json())
        .catch(function(error) {
            console.log(error);
        });
}

function accessLogAPI() {
    fetch("https://pocket-lockit.herokuapp.com/log/lock/1")
        .then(response => response.json())
        .then(response => displayData(response));
}

function displayData(data){
    data.logs.forEach(log => {
        var cardDiv = document.createElement("div");
        var status = document.createElement("h3");
        var date = document.createElement("p");
        var location = document.createElement("p");

        cardDiv.className = "cardDiv"
        status.className = "status"
        date.className = "date"
        location.className = "location"

        var formatDate = new Date(log.status_changed)
         
        status.textContent = "Status: " + log.status
        date.textContent = "Date & Time: " + formatDate.toString().replace("GMT-0600 (Mountain Daylight Time)", "")
        location.textContent = "Location Coordinates: " + log.location

        cardDiv.appendChild(status)
        cardDiv.appendChild(date)
        cardDiv.appendChild(location)

        document.querySelector(".lock-log-cards").appendChild(cardDiv)
    });
}

function lockLog(event) {
    event.preventDefault();
    accessLogAPI();
    document.querySelector(".lock-log-div").classList.remove("hidden")
    document.querySelector(".lock-main").classList.add("hidden")    
}

function goBack(event){
    event.preventDefault();
    document.querySelector(".lock-log-div").classList.add("hidden") 
    document.querySelector(".lock-main").classList.remove("hidden")
}

function signOut(event) {
    event.preventDefault();
    document.querySelector(".signin").classList.remove("hidden")
    document.querySelector(".lock-main").classList.add("hidden")
}

socket.on("motion now", onMotion)

function onMotion(){
    console.log("motion now!!!")
    document.querySelector(".alert-div").classList.remove("hidden")
    document.querySelector(".lock-main").classList.add("hidden")

}

// document.querySelector(".clear-alert").addEventListener("click", clearAlert)

// function clearAlert(event){
//     event.preventDefault();
//     document.querySelector(".alert-div").classList.add("hidden")
//     document.querySelector(".lock-main").classList.remove("hidden")
// }