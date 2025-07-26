const dialogueWindow = document.querySelector(".dialoguewindow")
const dialogueName = document.querySelector(".dialogueName")
const dialogueText = document.querySelector(".dialogueText")
const dialoguePort = document.querySelector(".portrait")
const dialoguePortBg = document.querySelector(".portraitBackground")

let ROT = 1

let player = {
    "room": "title",
    "dialogue": {
        "active": false,
        "confirm": false
    },
    "settings": {
        "crt": 1
    }
}

function shake(amount, length, fade=false){
    let start = Date.now()
    setInterval(function (){
        if (start+(1000*length) < Date.now()){
            document.querySelector(".gamewindow").style.left = "calc(50vw - 256px)"
            document.querySelector(".gamewindow").style.top  = "calc(50vh - 256px)"
            return
        }

        let random = [
            (Math.random()-0.5)*2*amount,
            (Math.random()-0.5)*2*amount
        ]

        if (fade){
            random[0]*=(start+(1000*length)-Date.now())/(1000*length)
            random[1]*=(start+(1000*length)-Date.now())/(1000*length)
        }

        document.querySelector(".gamewindow").style.left = "calc(50vw - " + (256+random[0]) + "px)"
        document.querySelector(".gamewindow").style.top  = "calc(50vh - " + (256+random[1]) + "px)"
    }, 0)
}

async function loadroom(room){
    if (world[room] == undefined){
        console.error("no, fuck off")
        return
    }

    document.querySelector(".loadingscreen").style.opacity = "100%"
    document.querySelector(".loadingscreen").style.pointerEvents = "all"

    document.querySelector(".loadingList").innerHTML = ""

    player.room = room;

    let loaded = 0
    
    document.querySelector(".gamewindow").innerHTML = ""
    for (let x = 0; x < world[player.room].length; x++){
        let object = world[player.room][x]

        if (object.type != undefined){
            if (object.type == "script"){
                let htmlObject = document.createElement("script")
                htmlObject.innerHTML = object.code

                document.querySelector(".gamewindow").appendChild(htmlObject)
                loaded++
                continue
            }
            if (object.type == "audio"){
                let htmlObject = document.createElement("audio")
                htmlObject.src = object.audio + ".mp3"

                //htmlObject.autoplay = true

                htmlObject.className = object.name

                if (object.loop != undefined){
                    htmlObject.loop = true
                }

                document.querySelector(".gamewindow").appendChild(htmlObject)
                loaded++
                continue
            }
        }

        let htmlObject = document.createElement("div")
        
        if (object.click != undefined){
            htmlObject.onclick = object.click
        }

        if (object.text != undefined){
            htmlObject.innerHTML = object.text[0]
            htmlObject.style.textAlign = object.text[1]
        }

        if (object.name != undefined){
            htmlObject.className = object.name
        }

        if (object.padding != undefined){
            htmlObject.style.paddingLeft = object.padding[0] + "px"
            htmlObject.style.paddingTop = object.padding[1] + "px"
        }

        if (object.margin != undefined){
            htmlObject.style.marginLeft = object.margin[0] + "px"
            htmlObject.style.marginTop = object.margin[1] + "px"
        }

        if (object.size != undefined){
            htmlObject.style.width = object.size[0] + "px"
            if (object.size.length != 1){
                htmlObject.style.height = object.size[1] + "px"
            }
        }

        if (object.html != undefined){
            htmlObject.innerHTML = object.html
        }

        if (object.borderRadius != undefined){
            htmlObject.style.borderRadius = object.borderRadius
        }

        if (object.mix != undefined){
            htmlObject.style.mixBlendMode = object.mix
        }

        if (object.filter != undefined){
            htmlObject.style.filter = object.filter
        }

        if (object.rot != undefined){
            htmlObject.style.rotate = object.rot + "deg"
        }

        if (object.pos != undefined){
            htmlObject.style.top = object.pos[1] + "px"
            htmlObject.style.left = object.pos[0] + "px"
        } else {
            htmlObject.style.top = "0px"
            htmlObject.style.left = "0px"
        }

        if (object.bgcol != undefined){
            htmlObject.style.backgroundColor = object.bgcol
        }

        if (object.pointerEvents != undefined){
            htmlObject.style.pointerEvents = object.pointerEvents
        }

        if (object.bgimg != undefined){
            htmlObject.style.backgroundImage = "url(" + object.bgimg + ")"

            let image = new Image()
            image.onload = function () {
                loaded++
            }
            image.onerror = function () {
                loaded++
            }
            image.src = object.bgimg
        } else {
            loaded++
        }

        htmlObject.className += " object" + x

        htmlObject.style.position = "absolute"
        
        document.querySelector(".gamewindow").appendChild(htmlObject)

        console.log("loaded obj " + x + "; " + object.name)
    }

    const sleepUntil = async () => {
        return new Promise((resolve) => {
            const wait = setInterval(function() {
                if (loaded == world[player.room].length){
                    clearInterval(wait)
                    resolve()
                }
                document.querySelector(".loadingBar").style.width = (256/world[player.room].length)*loaded + "px"
                document.querySelector(".loadingList").innerHTML = loaded + "/" + world[player.room].length
            }, 20)
        })
    }

    await sleepUntil()
    console.log("loaded room; " + player.room)
    document.querySelector(".loadingscreen").style.opacity = "0%"
    document.querySelector(".loadingscreen").style.pointerEvents = "none"
}

async function textbox(data){
    if (data == undefined){
        console.error("no, fuck off")
        return
    }

    dialogueWindow.style.display = "block"
    for (let x = 0; x < data.length; x++){
        if (data[x].side == "left"){
            dialoguePortBg.style.marginLeft = "384px"
            dialoguePortBg.style.filter = "grayscale(75%)"
            dialogueName.style.textAlign = "left"
        } else if (data[x].side == "right"){
            dialoguePortBg.style.marginLeft = "384px"
            dialoguePortBg.style.filter = ""
            dialogueName.style.textAlign = "right"
        } else {
            dialoguePortBg.style.marginLeft = "-128px"
            dialogueName.style.textAlign = "left"
        }

        if (data[x].audio != undefined){
            let sound = new Audio(data[x].audio)
            sound.play()
        }

        let splitText = data[x].text.split("")

        dialogueText.innerHTML = ""
        dialogueName.innerHTML = data[x].name

        dialoguePort.style.backgroundImage = `url("${data[x].img}")`

        player.dialogue.confirm = false

        dialogueText.innerHTML += " "

        for (let y = 0; y < splitText.length; y++){
            if (player.dialogue.confirm){player.dialogue.confirm = false; break}
            dialogueText.innerHTML = splitText.slice(0, y+1).join("").replaceAll("\n", "<br>")

            let delay = 20
            if (splitText[y] == ","){delay = 200}
            if (splitText[y] == "."){delay = 400}

            const sleepUntil = async () => {
                return new Promise((resolve) => {
                    const wait = setInterval(function() {
                        clearInterval(wait)
                        resolve()
                    }, delay)
                })
            }

            player.dialogue.confirm = false

            await sleepUntil()
        }

        dialogueText.innerHTML = splitText.join("").replaceAll("\n", "<br>")

        const sleepUntil = async () => {
            return new Promise((resolve) => {
                const wait = setInterval(function() {
                    if (player.dialogue.confirm) {
                        clearInterval(wait)
                        resolve()
                    }
                }, 20)
            })
        }

        await sleepUntil()
    }

    dialogueWindow.style.display = "none"
}

function gameloop(){
    document.querySelector(".rgb_filter").style.backgroundImage = `url(img/filter/${["none", "cymw", "cymk", "rgbw", "rgbk"][player.settings.crt]}.png)`
    if (player.room == "credits"){
        let creditsMusic = document.querySelector(".credits_music")
        let creditsText = document.querySelector(".credits_text")

        let creditsScroll = creditsText.getBoundingClientRect().height*(creditsMusic.currentTime / creditsMusic.duration)
        creditsText.style.marginTop = "-" + Math.round(creditsScroll) + "px"

        // frame rate of the credits drops if you don't have this?
        if (creditsMusic.playbackRate = 1){
            creditsMusic.playbackRate = 0.999
        } else {
            creditsMusic.playbackRate = 1
        }

        if ((creditsMusic.currentTime / creditsMusic.duration) >= 1){
            console.log(creditsText.getBoundingClientRect().height)
            loadroom("title")
        }
    }
}