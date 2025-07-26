const player = document.querySelector(".player")
const dialogueBox = document.querySelector(".dialogueBox")
var playerPos = [2, 0]
prev = 0

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function dboxUpdate(text) {
    console.log("ass")
    snd = []
    for (x = 0; x < text.length; x++) {
        snd.push(new Audio("sfx/vgc_bleep.mp3"))
        snd[0].currentTime = 0
        snd[0].play()

        dialogueBox.textContent = text.slice(0, x + 1)
        sleep(100)
    }
}

window.addEventListener('keydown', function (e) {
    if (e.key == "e") {
        test = "Text box test :3"
        dboxUpdate(test)
    }

    if (prev > (Date.now() - 125)) {
        return
    }

    if (e.key == "ArrowLeft") {
        playerPos[0] -= 1
    } else if (e.key == "ArrowRight") {
        playerPos[0] += 1
    } else if (e.key == "ArrowUp") {
        playerPos[1] -= 1
    } else if (e.key == "ArrowDown") {
        playerPos[1] += 1
    }

    prev = Date.now()

    player.style.left = (playerPos[0] + 1) * 75 + "px"
    player.style.top = (playerPos[1] + 1) * 75 + "px"
}, false)