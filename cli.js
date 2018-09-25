var io= require("socket.io-client")
const Gpio = require('onoff').Gpio;
const lock = new Gpio(4, 'out'); // gpio 4 as out
const motion = new Gpio(13, 'in'); // gpio 4 as in


var socket = io(process.env.SOCKET_HOST || "http://localhost:3000");
//   socket.emit('chat message', $('#m').val());

// function lock(){
//     socket.emit("lock", 99)
// }

// lock()

socket.on("unlock now", onUnlock)

function onUnlock(id){
    console.log("onUnlock", id)
    lock.writeSync(0);
}

socket.on("lock now", onLock)

function onLock(id){
    console.log("onLock", id)
    lock.writeSync(1)
}

let currentValue = motion.readSync();
console.log("currentValue" + currentValue)

let lastValue = motion.readSync();
console.log("lastValue" + lastValue)

iv = setInterval(function() {
    currentValue = motion.readSync();
    if (currentValue != lastValue){
        console.log("tampered!!!!!!")
        console.log(currentValue + " " +lastValue)
        lastValue = currentValue
        // const timer = setInterval(()=>{
        //     if (LED.readSync() === 0) { // if current pin state is 0 (off)
        //       LED.writeSync(1); // make it 1 (on)
        //     } else {
        //       LED.writeSync(0); // make it 0 (off)
        //     }
        //   }, 1000);
    
    }
    }, 200);