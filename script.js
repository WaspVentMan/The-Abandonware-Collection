let scrollpos = 0
let scrollvals = [
    1000,
    100,
    100,
    150,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    1000
]

if (window.location.host == "uploads.ungrounded.net" && window.location != window.parent.location){
    document.querySelector(".border").style.backgroundImage = "url(img/borderNG.png)"
    document.querySelector(".loading").style.backgroundColor = "#0F0B0C"
}

setTimeout(()=>{
    document.querySelector(".loading").style.opacity = "0%"
}, 1000)

setTimeout(()=>{
    document.querySelector(".loading").style.display = "none"
}, 3000)

let audiocheck = [0,0,0,0,0,0,0,0,0,0]

function gamescroll(direction){
    if (scrollpos == 0 && direction < 0){
        return false
    } else if (scrollpos == 9 && direction > 0){
        return false
    }

    scrollpos += direction
    document.querySelector(".games").style.left = -((scrollpos*scrollvals[0])+180) + "px"
    document.querySelector(".para0").style.left = -((scrollpos*scrollvals[1])+180) + "px"
    document.querySelector(".para1").style.left = -((scrollpos*scrollvals[2])+180) + "px"
    document.querySelector(".para2").style.left = -((scrollpos*scrollvals[3])+180) + "px"
    document.querySelector(".para3").style.left = -((scrollpos*scrollvals[4])+180) + "px"
    document.querySelector(".para4").style.left = -((scrollpos*scrollvals[5])+180) + "px"
    document.querySelector(".para5").style.left = -((scrollpos*scrollvals[6])+180) + "px"
    document.querySelector(".para6").style.left = -((scrollpos*scrollvals[7])+180) + "px"
    document.querySelector(".para7").style.left = -((scrollpos*scrollvals[8])+180) + "px"
    document.querySelector(".para8").style.left = -((scrollpos*scrollvals[9])+180) + "px"
    document.querySelector(".para9").style.left = -((scrollpos*scrollvals[10])+180) + "px"
    document.querySelector(".para10").style.left = -((scrollpos*scrollvals[11])+180) + "px"
    document.querySelector(".para11").style.left = -((scrollpos*scrollvals[12])+180) + "px"

    if (scrollpos == 0){
        document.querySelector(".hoverLeft").className = "hover hoverLeft"
    } else {
        document.querySelector(".hoverLeft").className = "hoverh hover hoverLeft"
    }

    if (scrollpos == 9){
        document.querySelector(".hoverRight").className = "hover hoverRight"
    } else {
        document.querySelector(".hoverRight").className = "hoverh hover hoverRight"
    }
}

setInterval(()=>{
    document.querySelector(".para3").style.opacity = (Math.sin(Date.now()/10000)*25)+50 + "%"
    document.querySelector(".para5").style.opacity = (Math.cos(Date.now()/10000)*25)+50 + "%"
    document.querySelector(".para7").style.opacity = (Math.sin(Date.now()/5000)*25)+50 + "%"
    document.querySelector(".para9").style.opacity = (Math.cos(Date.now()/5000)*25)+50 + "%"

    //unlockMedal(85571, audiocheck.reduce((a, b) => a + b, 0) >= 5)
    //unlockMedal(85572, audiocheck.reduce((a, b) => a + b, 0) >= 10)
}, 10)

gamescroll(0)