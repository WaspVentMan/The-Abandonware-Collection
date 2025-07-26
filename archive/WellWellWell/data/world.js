let world = {
    "error": [
        {
            "name": "ui_background",
            "size": [512, 512],
            "bgimg": "img/area/well/bg.png"
        },
        {
            "name": "title_text",
            "pos": [416, 32],
            "size": [64, 75],
            "padding": [0, 9],
            "text": ["I<br>AM<br>ERROR<br>:)", "center"],
            "bgimg": "img/button/button64_84.png"
        }
    ],
    "title": [
        {
            "name": "ui_background",
            "size": [512, 512],
            "bgimg": "img/area/well/bg.png"
        },
        {
            "name": "title_text",
            "pos": [416, 32],
            "size": [64, 75],
            "padding": [0, 9],
            "text": ["Well<br>Well<br>Well<br>...", "center"],
            "bgimg": "img/button/button64_84.png"
        },
        {
            "name": "title_credits",
            "pos": [32, 448],
            "size": [128, 23],
            "padding": [0, 9],
            "click": function(){loadroom("credits")},
            "text": ["CREDITS", "center"],
            "bgimg": "img/button/button128_32.png"
        },
        {
            "name": "title_continue",
            "pos": [352, 448],
            "size": [128, 23],
            "padding": [0, 9],
            "click": function(){loadroom(player.room)},
            "text": ["CONTINUE", "center"],
            "bgimg": "img/button/button128_32.png"
        },
        {
            "name": "title_new_game",
            "pos": [352, 400],
            "size": [128, 23],
            "padding": [0, 9],
            "click": function(){loadroom("well"); textbox(dialogue.introtext)},
            "text": ["NEW GAME", "center"],
            "bgimg": "img/button/button128_32.png"
        }
    ],
    "credits": [
        {
            "name": "ui_background",
            "size": [512, 512],
            "bgimg": "img/area/well/bg.png"
        },
        {
            "name": "credits_text",
            "size": [512],
            "text": [credits, "center"]
        },
        {
            "name": "credits_music",
            "type": "audio",
            "audio": "music/hoa_06_small"
        }
    ],
    "well": [
        {
            "name": "ui_background",
            "size": [512, 512],
            "bgimg": "img/area/well/bg.png"
        },
        {
            "name": "fade_hover",
            "pos": [384, 0],
            "size": [128, 512],
            "rot": 180,
            "bgimg": "img/exitV.png",
            "click": function(){loadroom("bimble")}
        },
        {
            "name": "fade_hover",
            "pos": [10, 50],
            "size": [256, 400],
            "click": function(){loadroom("well_hole")},
            "bgcol": "#ffffff55",
            "filter": "blur(20px)"
        }
    ],
    "well_hole": [
        {
            "name": "ui_background",
            "size": [512, 512],
            "bgimg": "img/area/well_hole/bg.png"
        },
        {
            "name": "fade_hover",
            "pos": [0, 384],
            "size": [512, 128],
            "bgimg": "img/exitH.png",
            "click": function(){loadroom("well")}
        }
    ],
    "bimble": [
        {
            "name": "ui_background",
            "size": [512, 512],
            "bgimg": "img/area/bimble/bg.png"
        },
        {
            "name": "fade_hover",
            "pos": [64, 64],
            "size": [384, 384],
            "borderRadius": "100%",
            "click": function(){textbox(dialogue.bimble)},
            "bgcol": "#ffffff55",
            "filter": "blur(20px)"
        },
        {
            "name": "fade_hover",
            "pos": [0, 0],
            "size": [128, 512],
            "bgimg": "img/exitV.png",
            "click": function(){loadroom("well")}
        },
        {
            "name": "fade_hover",
            "pos": [384, 0],
            "size": [128, 512],
            "rot": 180,
            "bgimg": "img/exitV.png",
            "click": function(){loadroom("heckler")}
        },
        {
            "type": "audio",
            "audio": "sfx/maow"
        }
    ],
    "heckler": [
        {
            "name": "ui_background",
            "size": [512, 512],
            "bgimg": "img/area/heckler/bg.png"
        },
        {
            "name": "fade_hover",
            "pos": [64, 64],
            "size": [384, 384],
            "borderRadius": "100%",
            "click": function(){textbox(dialogue.heckler)},
            "bgcol": "#ffffff55",
            "filter": "blur(20px)"
        },
        {
            "name": "fade_hover",
            "pos": [0, 0],
            "size": [128, 512],
            "bgimg": "img/exitV.png",
            "click": function(){loadroom("bimble")}
        }
    ],
}