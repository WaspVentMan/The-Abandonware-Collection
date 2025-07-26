const input = document.querySelector(".input")
const output = document.querySelector(".output")
const terminal = document.querySelector(".terminal")

let rain = false
let command = ""

let cash = 0

let servers = [
    {
        "id": "A",
        "status": true
    },
    {
        "id": "B",
        "status": true
    }
]
input.innerHTML = "> "

function print(text, colour = null){
    text = String(text).replaceAll(" ", "&nbsp;")
    let temp = document.createElement("p")
    temp.innerHTML = text

    if (colour != null){
        temp.style.color = colour
    }

    output.appendChild(temp)
}

function help(){
    print("HELP:")
    print("clear : Clears the screen.")
    print("cls   : Same as above")
    print("help  : Displays this very help message")
    print("colour: Changes text colour")
    print("color : For the filthy Americans")
    print("print : Prints a message into the terminal")
    print("title : Prints the title")
}

function execute(com){
    if (com == "help"){
        help()
    } else if (com == "clear" || com == "cls"){
        output.innerHTML = ""
    } else if (com.startsWith("colour") || com.startsWith("color")){
        console.log(com)
        console.log(com.split(" "))
        if (com.split(" ").length < 2){
            print("No colour provided.")
        } else {
            terminal.style.color = com
        }
    } else if (com == "title"){
        title()
    } else if (com == "ping"){
        for (let x = 0; x < servers.length; x++){
            print("")

            print(`      SERVER ID | ${servers[x].id.slice(0, 8)}`)
            print("----------------|----------------")
            if (servers[x].status){
                print("         Status | Online")
            } else {
                print("         Status | Offline")
            }
        }
    } else if (com.startsWith("print")){
        try {
            print(com.split(" ")[1])
        } catch {
            print("COMMAND ERROR", "red")
        }
    } else {
        print("UNKNOWN COMMAND", "red")
    }
}

window.addEventListener('keydown', function (e) {
    if (e.key == "Enter"){
        comm = command.split(";")
        print("> " + comm)
        for (let x = 0; x < comm.length; x++){
            com = comm[x].trim()
            execute(com)
        }

        input.innerHTML = ">&nbsp;"
        command = ""
    } else {
        if (e.key.length == 1){
            command += e.key
        } else if (e.key == "Backspace"){
            command = command.slice(0, command.length-1)
        } else if (e.key == "Delete"){
            command = ""
        } else {
            console.log(e.key)
        }

        input.innerHTML = "> " + command.replaceAll(" ", "&nbsp;")
    }
})

print("====================================================================================")
print("__      ____   ____  __  __      __   _   _____              _           _       _ ")
print("\\ \\    / /\\ \\ / /  \\/  | \\ \\    / /__| |_|_   _|__ _ _ _ __ (_)_ _  __ _| | __ _/ |")
print(" \\ \\/\\/ /  \\ V /| |\\/| |  \\ \\/\\/ / -_) '_ \\| |/ -_) '_| '  \\| | ' \\/ _` | | \\ V | |")
print("  \\_/\\_/    \\_/ |_|  |_|   \\_/\\_/\\___|_.__/|_|\\___|_| |_|_|_|_|_||_\\__,_|_|  \\_/|_|")
print("")
print("====================================================================================")
print("")


rainbow = 0
setInterval(function(){
}, 10)