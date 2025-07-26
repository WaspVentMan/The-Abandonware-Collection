let player = {
    "pos": [1.5, 1.5],
    "rot": 0,
    "mom": [0, 0],
    "fov": 360
}

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

function raycast(dir){
    let ray = [
        player.pos[0],
        player.pos[1]
    ]

    let steps = 0
    let movement = [0.01 * Math.sin(dir), 0.01 * Math.cos(dir)]
    try {
        while (true){
            if (map[Math.floor(ray[0])][Math.floor(ray[1])] == 1){
                if (ray[0]%1<ray[1]%1)
                    return [256 - steps, ray[1]%1]
                else{
                    return [256 - steps, ray[0]%1]
                }
            } else {
                ray[0] += movement[0]
                ray[1] += movement[1]
                steps += 0.5
                if (steps > 256){
                    return [0]
                }
            }
        }
    } catch {
        return 0
    }
}

for (let x = 0; x < 600; x++){
    let angle = (((player.fov/(440))*(x+1))-(player.fov/2))+player.rot
    let dist = raycast(angle/360)
    let temp = document.createElement("div")
    temp.className = "collumn" + x
    temp.style.width = "1px"
    temp.style.height = dist[0] + "px"
    temp.style.marginTop = (440 - dist[0])/2 + "px"
    temp.style.backgroundColor = "white"
    document.querySelector(".screen").appendChild(temp)
}

setInterval(function(){
    for (let x = 0; x < 600; x++){
        let angle = (((player.fov/(440))*(x+1))-(player.fov/2))+player.rot
        let dist = raycast(angle/360)
        let temp = document.querySelector(".collumn" + x)
        temp.style.height = dist[0] + "px"
        temp.style.marginTop = (440 - dist[0])/2 + "px"

        temp.style.backgroundColor = "rgb(" + (255*(dist[0]/440)) + "," + (255*(dist[0]/440)) + "," + (255*(dist[0]/440)) + ")"
    }
    
    if (key.w){
        player.pos[0] += 0.1 * Math.sin(player.rot/360)
        player.pos[1] += 0.1 * Math.cos(player.rot/360)
    }

    if (key.s){
        player.pos[0] -= 0.1 * Math.sin(player.rot/360)
        player.pos[1] -= 0.1 * Math.cos(player.rot/360)
    }

    if (key.a){
        player.rot -= 10
    }

    if (key.d){
        player.rot += 10
    }
}, 1000/60)