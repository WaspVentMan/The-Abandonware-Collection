const player = document.querySelector(".player")

let collisionListID = []
let pCoords = [48, 576]
let safePos = [48, 576]
let momentum = [0, 0]

let playerSize = [32, 64]

let frametime = Date.now()
const framecounter = document.querySelector(".fps")

const speedcounter = [document.querySelector(".speedX"), document.querySelector(".speedY")]
const positioncounter = [document.querySelector(".globalX"), document.querySelector(".globalY")]

let floorwait = false
let low = 0

let lowwait = false
let lowceil = false

let key = []

function grounder(pain_points, x){
    let newgrounds = document.createElement("div")

    for (let x = 0; x < 4; x++){
        pain_points[x] *= 32
    }
    
    newgrounds.style.backgroundImage = "url('textures/" + pain_points[5] + ".png')"
    newgrounds.style.backgroundSize = pain_points[6] + "px"
    newgrounds.style.imageRendering = "pixelated"
    newgrounds.style.position = "absolute"
    newgrounds.style.width  = pain_points[0] + "px"
    newgrounds.style.height = pain_points[1] + "px"
    newgrounds.style.left   = pain_points[2] + "px"
    newgrounds.style.top    = pain_points[3] + "px"

    newgrounds.className = "GROUND_" + Date.now() + "_" + Math.round(Math.random()*1e15)
    collisionListID[x] = "." + newgrounds.className
    newgrounds.title = pain_points[4]

    document.body.appendChild(newgrounds)
}

for (let x = 0; x < collisionList.split("/").length; x++){
    grounder(collisionList.split("/")[x].split("|"), x)
}

window.addEventListener('keydown', function (e) {
    key[e.key] = true
})

window.addEventListener('keyup', function (e) {
    key[e.key] = false
})

setInterval(function(){
    if (key["ArrowRight"]){
        if (momentum[0] < 3/(low+1)){
            momentum[0] += 1/(low+1)
        }
    }
    if (key["ArrowLeft"]){
        if (momentum[0] > -3/(low+1)){
            momentum[0] -= 1/(low+1)
        }
    }
    if (key["z"] && !floorwait){
        momentum[1] = (-4.5/(low+1))-3
        floorwait = true
    }

    if (key["ArrowDown"] && !lowwait && low < 3){
        playerSize[1] -= 16
        playerSize[0] += 16
        pCoords[1] += 16
        pCoords[0] -= 8
        low += 1
        lowwait = true
    } else if (key["ArrowUp"] && !lowwait && !lowceil && low > 0){
        playerSize[1] += 16
        playerSize[0] -= 16
        pCoords[1] -= 16
        pCoords[0] += 8
        low -= 1
        lowwait = true
    }

    if (!key["ArrowDown"] && !key["ArrowUp"]){
        lowwait = false
    }

    momentum[1] += 0.4

    if (momentum[1] > 15){
        momentum[1] = 15
    }

    momentum[0] = Math.round(momentum[0]*1000)/1000

    if (momentum[0] < 0.01 && momentum[0] > -0.01){
        momentum[0] = 0
    }

    pCoords[0] += momentum[0]
    pCoords[1] += momentum[1]

    lowceil = false

    let penalty = false

    for(let x = 0; x < collisionListID.length; x++){
        if (document.querySelector(collisionListID[x]).title == "N"){continue}

        let boundingBox = document.querySelector(collisionListID[x]).getBoundingClientRect()

        let boundsMid = [(boundingBox.left + boundingBox.right)/2, (boundingBox.top + boundingBox.bottom)/2]
        let playerMid = [pCoords[0] + (playerSize[0]/2), pCoords[1] + (playerSize[1]/2)]

        let boundsHori = (pCoords[1] + (playerSize[1]/1.25) >= boundingBox.top && pCoords[1] < boundingBox.bottom)
        let boundsVert = (pCoords[0] <= boundingBox.right && pCoords[0] + (playerSize[0]/1.1) >= boundingBox.left)

        if (pCoords[1] <= boundingBox.bottom && pCoords[1] >= boundingBox.top && boundsVert){
            lowceil = true
        }
        
        if (pCoords[1] <= boundingBox.bottom && pCoords[1] >= boundingBox.top && boundsVert && momentum[1] < 0){
            console.log("CEILING COLLISION")
            if (!penalty){
                momentum[0] *= 0.75
                momentum[1] = 0
                penalty = true
            }
            pCoords[1] = boundingBox.bottom
        }
        
        else if (boundsHori && pCoords[0] + playerSize[0] >= boundingBox.left && playerMid[0] <= boundsMid[0]){
            console.log("LEFT COLLISION")
            momentum[0] = 0
            pCoords[0] = boundingBox.left-playerSize[0]-.01
        }

        else if (boundsHori && pCoords[0] <= boundingBox.right && playerMid[0] >= boundsMid[0]){
            console.log("RIGHT COLLISION")
            momentum[0] = 0
            pCoords[0] = boundingBox.right+0.01
        }

        else if (pCoords[1]+playerSize[1] >= boundingBox.top && playerMid[1] <= boundsMid[1] && boundsVert){
            if (momentum[1] < 0){
                if (pCoords[0] + playerSize[0] >= boundingBox.left && playerMid[0] <= boundsMid[0]){
                    console.log("INSET LEFT COLLISION")
                    momentum[0] = 0
                    pCoords[0] = boundingBox.left-playerSize[0]-.01
                }
        
                else if (pCoords[0] <= boundingBox.right && playerMid[0] >= boundsMid[0]){
                    console.log("INSET RIGHT COLLISION")
                    momentum[0] = 0
                    pCoords[0] = boundingBox.right+0.01
                }
            } else {
                //console.log("FLOOR COLLISION")
                if (!penalty){
                    momentum[0] *= 0.75
                    momentum[1] = 0
                    penalty = true
                }
                pCoords[1] = boundingBox.top-playerSize[1]
                floorwait = false
            }
        } 
        
        else {
            momentum[0] *= 0.999
        }
    }

    if (momentum[0] == 0 && momentum[1] == 0 && !floorwait){
        //safePos = pCoords
    }

    if (pCoords[1] > 2000){
        console.log("LAKITU")
        safePos = [48, 576]
        pCoords = safePos
        momentum = [0, 0]
    }

    player.style.left = pCoords[0] + "px"
    player.style.top = pCoords[1] + "px"

    player.style.height = playerSize[1] + "px"
    player.style.width = playerSize[0] + "px"

    speedcounter[0].textContent = "xV: " + Math.round(momentum[0]*1000)/1000
    speedcounter[1].textContent = "yV: " + Math.round(momentum[1]*1000)/1000

    positioncounter[0].textContent = "x: " + Math.round(pCoords[0]*1000)/1000
    positioncounter[1].textContent = "y: " + Math.round(pCoords[1]*1000)/1000

    //positioncounter[0].textContent = "Sx: " + Math.round(safePos[0]*1000)/1000
    //positioncounter[1].textContent = "Sy: " + Math.round(safePos[1]*1000)/1000

    framecounter.textContent = "fps: " + Math.round(1000/(Date.now() - frametime))
    frametime = Date.now()
}, 1000/60)


