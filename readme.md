# Pocket Lockit! 

## Links
- Hardware Demo: https://www.youtube.com/watch?v=Wlu11Ly7YUQ
- Capstone Presentation Link: https://youtu.be/ez8_Rf0qod4
- Front-end deployed link: https://pocket-lockit-app.herokuapp.com/
- Back-end deployed link: https://pocket-lockit.herokuapp.com/lock_log


## The Problem
Modern day bike locks are outdated. Too many times do I see bikes around the city that are dismembered on bike racks, leaving only a front tire or the bike frame on the rack. Also, carrying keys can be risky and remembering a passcode can be cumbersome. 

## Solving the Problem... What does it do?
This is an app and device combination. Pocket Lockit allows you to unlock your bike lock from any device, logging your unlocked and locked status. No more losing keys or being locked out from your bike! Additionally, a motion sensor on the lock itself notifies a user when the lock/bike is being tampered with. The blinking LED and noise alert will scare away thieves and will only stop when a user disengages the alarm. 

## Tech Used
Raspberry Pi with a solenoid, tilt sensor, LED, and noise buzzer modules. The frontend is designed with JavaScript HTML and CSS. Socket.io connects the browser and the raspi/lock with a server, all in the same repository! Node Express Knex PostgreSQL are all used in the backend Heroku deployed server that tracks your locks and unlocks with a timestamp. 

