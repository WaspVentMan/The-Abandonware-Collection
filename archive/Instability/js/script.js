const instabilityText = document.querySelector(".stability")
let reality = {"instability": 0, "cash": 0, "highcash": 0, "gen": [], "gencount": 2, "realityFrags": 0, "selgen": 0}
// Cap gens at 12, price becomes infinite after that
let Itick = Date.now()
let Gtick = Date.now()
let start = Date.now()

function updateDisp(value){
    if (Math.round(value).toString().length <= 10){
        newval = Math.round(value).toString().split("", 1)
        return newval + " " + Math.round(value).toString().slice(1)
    } else {
        let cashDisp = Math.round(value).toExponential(5).split("+")
        cashDisp[1] = numeral(cashDisp[1]).format("000")
        return cashDisp[0] + "" + cashDisp[1]
    }
}

function selgen(){
    GNteDisplay.setValue("G EN " + (reality.selgen+1))
    GNnuDisplay.setValue(updateDisp(reality.gen[reality.selgen][0]))
    GNcoDisplay.setValue(updateDisp(reality.gen[reality.selgen][2]))
    GNmuDisplay.setValue("x " + updateDisp(reality.gen[reality.selgen][1]))
}

function runSetup(){
    reality.cash = 0
    reality.instability = 0
    reality.gen = []
    Itick = Date.now()
    Gtick = Date.now()
    start = Date.now()

    HSnuDisplay.colorOn = "#ff2c0f"
    HSnuDisplay.setValue(updateDisp(reality.highcash))

    for (let x = 0; x < reality.gencount; x++){
        let fib = Math.round((Math.pow((1 + Math.sqrt(5)) / 2, (x+2)) - Math.pow((1 - Math.sqrt(5)) / 2, (x+2))) / Math.sqrt(5))
        reality.gen.push([0, 1, Math.pow(10, fib)])
    }

    reality.gen[1][0] += 1

    let gameloop = setInterval(function(){
        if (reality.cash == 0){
            Itick = Date.now()
            start = Date.now()
        }

        for (let x = 0; x < reality.gen.length; x++){
            if (x == 0){
                reality.cash += ((reality.gen[x][0] * reality.gen[x][1])/1000)*(Date.now()-Gtick)
            } else {
                reality.gen[x-1][0] += ((reality.gen[x][0] * reality.gen[x][1])/1000)*(Date.now()-Gtick)
            }
        }
        Gtick = Date.now()
    
        if (reality.cash != 0 && Number.isFinite(reality.cash)){
            reality.instability += (((((reality.instability/10)+0.1)/1000)*(Date.now()-Itick))*100)/100
            Itick = Date.now()
            let instability = numeral((100-reality.instability)/100).format("0.00%")

            FSnuDisplay.setValue(updateDisp(Math.floor(Math.cbrt(reality.cash))))
            if (100-reality.instability >= 0) {
                let instaBonus = " "
                if (100-reality.instability < 10){
                    instaBonus += " "
                }
                instDisplay.setValue(instaBonus + instability)
            }

            if (reality.instability >= 100){
                instDisplay.setValue("  0.00%")
                reality.realityFrags += Math.floor(Math.cbrt(reality.cash))
                RSnuDisplay.setValue(updateDisp(reality.realityFrags))
                console.log(Date.now() - start + "ms")
                clearInterval(gameloop)
            }
        }
        
        if (!Number.isFinite(reality.cash)) {
            CAnuDisplay.setValue("  INFINITE")
        } else {
            CAnuDisplay.setValue(updateDisp(reality.cash))
            if (reality.cash >= reality.highcash){
                reality.highcash = reality.cash
                HSnuDisplay.setValue(updateDisp(reality.cash))
                HSnuDisplay.colorOn = "#e95d0f"
            }

            if (reality.cash < 0){
                CAteDisplay.setValue("I N DEBT")
            } else {
                CAteDisplay.setValue("    CASH")
            }
        }

        selgen()
    }, 10)

    instDisplay.setValue('100.00%')
    CAteDisplay.setValue("    CASH")
    CAnuDisplay.setValue("0.00000E000")
    textDisplay1.setValue("s tability")
    textDisplay2.setValue("")
    HSteDisplay.setValue("    BEST")
    FSteDisplay.setValue("A NGEL GIFT")
    RSteDisplay.setValue("F RAGMENTS")
    RSnuDisplay.setValue(updateDisp(reality.realityFrags))
    FSnuDisplay.setValue("0")
}

runSetup()