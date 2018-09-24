var loginCredentials;

function accessAPI() {
    fetch("https://pocket-lockit.herokuapp.com/profiles")
        .then(response => response.json())
        // .then(response => {data = response})
        .then(getData);
}
accessAPI();

function getData(data) {
    loginCredentials = data;
}

document.querySelector(".submit").addEventListener("click", compareCredentials);

function compareCredentials(event) {
    event.preventDefault();
    if (
        event.path[1][0].value === loginCredentials.profile[0].username &&
        event.path[1][1].value === loginCredentials.profile[0].password
    ) {
        document.querySelector(".signin").classList.add("hidden")
        document.querySelector(".lock-main").classList.remove("hidden")
    } else {
        console.log("false");
        document.querySelector(".invalid-login").textContent =
            "Incorrect Login. Please Try Again";
    }
}


var socket = io();


document.querySelector("#open-lock").addEventListener("click", unlock);

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

document.querySelector("#closed-lock").addEventListener("click", lock);

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

document.querySelector(".lock-log").addEventListener("click", lockLog);

function lockLog(event) {
    event.preventDefault();
    window.location.href = "/lockLog.html";
}

document.querySelector(".sign-out").addEventListener("click", signOut);

function signOut(event) {
    event.preventDefault();
    window.location.href = "/index.html";
}


//   socket.emit('chat message', $('#m').val());
// document.querySelector("#closed-lock").addEventListener("click", lock)
// document.querySelector("#open-lock").addEventListener("click", unlock)


// function lock(){
//     socket.emit("lock", 42)

// }


// function unlock(){
//     socket.emit("unlock", 12)

// }