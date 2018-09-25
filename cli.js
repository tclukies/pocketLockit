var io= require("socket.io-client")
const Gpio = require('onoff').Gpio;
const lock = new Gpio(4, 'out'); // gpio 4 as out
const motion = new Gpio(13, 'in'); // gpio 4 as in
const LED = new Gpio(25, 'out'); // gpio 4 as out

let lockStatus = true
let currentValue
let lastValue

var socket = io(process.env.SOCKET_HOST || "http://localhost:3000");
//   socket.emit('chat message', $('#m').val());


// lock()

socket.on("unlock now", onUnlock)

function onUnlock(id){
    let currentValue = motion.readSync();
    console.log("currentValue" + currentValue)
    
    let lastValue = motion.readSync();
    console.log("lastValue" + lastValue)

    console.log("onUnlock", id)
    lock.writeSync(0);
    lockStatus = true;
    iv = setInterval(function() {
        currentValue = motion.readSync();
        if (currentValue != lastValue && lockStatus){
            socket.emit('motion now', 1);
            console.log("tampered!!!!!!")
            console.log(currentValue + " " +lastValue)
            // lastValue = currentValue
            const timer = setInterval(()=>{
                if (LED.readSync() === 0) { // if current pin state is 0 (off)
                    LED.writeSync(1); // make it 1 (on)
                } else {
                    LED.writeSync(0); // make it 0 (off)
                }
            }, 1000);
        
        }
        }, 200);
}

socket.on("stop alert", onStop)

function onStop(id){
    console.log("onStop", id)
    currentValue = motion.readSync();
    lastValue = currentValue 
    console.log(lastValue + " " + currentValue)
    LED.writeSync(0);
}

socket.on("lock now", onLock)

function onLock(id){
    console.log("onLock", id)
    lock.writeSync(1)
    lockStatus = false
}

