let cursor = {
    "pos": [0, 0]
}

let level = []

async function loadLevel(url){
    document.querySelector(".objects").innerHTML = ""

    level = await (await fetch(url)).json()

    cursor.pos = Object.assign([], level.start)

    renderLevel()
}

function loadLevelOffline(url){
    document.querySelector(".objects").innerHTML = ""

    level = {
        "start": [5, 7],
        "level": [
            {
                "pos": [8, 8],
                "size": [1, 1],
                "push": true,
                "pass": false,
                "type": "box",
                "z": 5
            },
            {
                "pos": [10, 8],
                "size": [1, 1],
                "push": false,
                "pass": true,
                "type": "goal",
                "z": 10
            },
            {
                "pos": [4, 10],
                "size": [8, 1],
                "push": false,
                "pass": false,
                "type": "wall",
                "z": 10
            },
            {
                "pos": [4, 5],
                "size": [8, 1],
                "push": false,
                "pass": false,
                "type": "wall",
                "z": 10
            },
            {
                "pos": [3, 5],
                "size": [1, 6],
                "push": false,
                "pass": false,
                "type": "wall",
                "z": 10
            },
            {
                "pos": [12, 5],
                "size": [1, 6],
                "push": false,
                "pass": false,
                "type": "wall",
                "z": 10
            },
            {
                "pos": [0, 0],
                "size": [16, 16],
                "push": false,
                "pass": true,
                "type": "void",
                "z": 0
            },
            {
                "pos": [4, 6],
                "size": [8, 4],
                "push": false,
                "pass": true,
                "type": "floor",
                "z": 0
            }
        ]
    }

    cursor.pos = Object.assign([], level.start)

    buildLevel()
}

function buildLevel(){
    document.querySelector(".objects").innerHTML = ""

    for (let x = 0; x < level.level.length; x++){
        let asset = document.createElement("div")

        level.level[x].class = ("levelObj" + level.level[x].type + "" + level.level[x].pos[0] + "" + level.level[x].pos[1] + "" + Date.now() + "" + Math.random()).replaceAll(".", "")
        asset.className = level.level[x].class

        asset.style.width  = level.level[x].size[0]*32 + "px"
        asset.style.height = level.level[x].size[1]*32 + "px"
        asset.style.left   = level.level[x].pos[0]*32 + "px"
        asset.style.bottom = level.level[x].pos[1]*32 + "px"

        asset.style.position = "absolute"

        asset.style.transition = "left 0.1s ease-in-out, bottom 0.1s ease-in-out"

        asset.style.zIndex = level.level[x].z

        asset.style.backgroundImage = `url(img/${level.level[x].type}.png)`

        document.querySelector(".objects").appendChild(asset)
    }
}

function renderLevel(){
    for (let x = 0; x < level.level.length; x++){
        let asset = document.querySelector("." + level.level[x].class)

        asset.style.left   = level.level[x].pos[0]*32 + "px"
        asset.style.bottom = level.level[x].pos[1]*32 + "px"
    }
}

function boxCollision(pos, dir, move=true){
    for (let x = 0; x < level.level.length; x++){
        if (!level.level[x].pass && level.level[x].pos[0] <= pos[0] && level.level[x].pos[0]+level.level[x].size[0] > pos[0] && level.level[x].pos[1] <= pos[1] && level.level[x].pos[1]+level.level[x].size[1] > pos[1]){
            let tempPos = Object.assign([], level.level[x].pos)
            tempPos[Math.floor(dir/2)] += [-level.level[x].size[Math.floor(dir/2)], level.level[x].size[Math.floor(dir/2)]][dir%2]
            
            if (level.level[x].push && boxCollision(tempPos, dir) && level.level[x].size[1-Math.floor(dir/2)] == 1){
                if (move){
                    level.level[x].pos[Math.floor(dir/2)] += [-1, 1][dir%2]
                }
                return true
            }

            return false
        }
    }
    return true
}

loadLevelOffline("./data/0.json")

setInterval(() => {
    let directions = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"]
    for (let x = 0; x < 4; x++){
        if (key[directions[x]] && !held[directions[x]]){
            held[directions[x]] = true

            if (key.z){
                let tempPos = Object.assign([], cursor.pos)
                tempPos[Math.floor(x/2)] += [-1, 1][x%2]
                if (boxCollision(tempPos, x)){
                    cursor.pos[Math.floor(x/2)] += [-1, 1][x%2]
                }
            } else {
                cursor.pos[Math.floor(x/2)] += [-1, 1][x%2]
            }

            renderLevel()
        }
    }

    document.querySelector(".cursor").style.left = cursor.pos[0]*32 + "px"
    document.querySelector(".cursor").style.bottom = cursor.pos[1]*32 + "px"
}, 0)