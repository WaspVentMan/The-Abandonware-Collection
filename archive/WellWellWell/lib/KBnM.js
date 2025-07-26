let key = {}
let held = {}
let mouse = {"click": false, "pos": [0, 0]}
let gamepads = {}
onmousemove = function(e){mouse.pos = [e.clientX, e.clientY]}
function gamepadHandler(event, connected) {const gamepad = event.gamepad; if (connected) {gamepads[gamepad.index] = gamepad} else {delete gamepads[gamepad.index]}}
window.addEventListener('keydown', function (e) {key[e.key] = true})
window.addEventListener('keyup',   function (e) {key[e.key] = false; held[e.key] = false})
window.addEventListener('mousedown', function (e) {mouse.click = e.buttons})
window.addEventListener('mouseup', function (e) {mouse.click = false})
window.addEventListener("gamepadconnected", (e) => {gamepadHandler(e, true)}, false)
window.addEventListener("gamepaddisconnected", (e) => {gamepadHandler(e, false)}, false)

setInterval(function(){
    if (gamepads[0] == undefined){return}
	if (gamepads[0].buttons[1].pressed || gamepads[0].buttons[3].pressed){key.z = true} else if (key.z){key.z     = false; held.z = false}
    if (gamepads[0].buttons[0].pressed || gamepads[0].buttons[2].pressed){key.x = true} else if (key.x){key.x     = false; held.x = false}
    if (Math.round(gamepads[0].axes[9]*10) ==   7){key.ArrowLeft  = true} else if (key.ArrowLeft ){key.ArrowLeft  = false}
	if (Math.round(gamepads[0].axes[9]*10) ==  -4){key.ArrowRight = true} else if (key.ArrowRight){key.ArrowRight = false}
    if (Math.round(gamepads[0].axes[9]*10) == -10){key.ArrowUp    = true} else if (key.ArrowUp   ){key.ArrowUp    = false}
    if (Math.round(gamepads[0].axes[9]*10) ==   1){key.ArrowDown  = true} else if (key.ArrowDown ){key.ArrowDown  = false}
},10)