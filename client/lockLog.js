function accessAPI() {
    fetch("https://pocket-lockit.herokuapp.com/log/lock/1")
        .then(response => response.json())
        .then(response => displayData(response));
}

function displayData(data){
    console.log(data)
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

document.querySelector(".go-back").addEventListener("click", backToLock)

function backToLock(event){
    event.preventDefault();
    window.location.href = "/lock.html"
}

accessAPI();

var socket = io();
//   socket.emit('chat message', $('#m').val());
document.querySelector(".closed-lock").addEventListener("click", lock)
document.querySelector(".open-lock").addEventListener("click", unlock)


function lock(){
    socket.emit("lock", 42)
}


function unlock(){
    socket.emit("unlock", 12)
}