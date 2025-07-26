let key = {}
let held = {}
let mouse = {"click": false, "pos": [0, 0]}
let gamepads = {}

onmousemove = (e) => {mouse.pos = [e.clientX, e.clientY]}

window.addEventListener('keydown',   (e) => {key[e.key] = true})
window.addEventListener('keyup',     (e) => {key[e.key] = false; held[e.key] = false})
window.addEventListener('mousedown', (e) => {mouse.click = e.buttons})
window.addEventListener('mouseup',   (e) => {mouse.click = false})