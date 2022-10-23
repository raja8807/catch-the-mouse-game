const player = document.getElementById("player")
const opponent = document.getElementById("opponent")
const message = document.getElementById("message")
const scoreOut = document.getElementById('score')
const cage = document.getElementById('cage');
const meat = document.getElementById('meat');



player.style.top = "0px"
player.style.left = "0px"

opponent.style.top = "290px"
opponent.style.left = "490px"

var playerInterval;
var opponentInterval;
var gameInterval;

var playerSpeed = 8;

let score = 0
var gameStarted = false

var meatCatched = false
meat.style.display = "none"
var x;
var y;


document.body.addEventListener("keydown", (event) => {
    let key = event.key
    let playerTop = parseInt(player.style.top)
    let playerLeft = parseInt(player.style.left)

    if (key == " ") {
        if (!gameStarted) {
            message.style.visibility = "hidden"
            cage.style.visibility = "hidden"
            startGame()
        } else {
            cage.style.visibility = "visible"
            clearInterval(playerInterval)
            clearInterval(opponentInterval)
            clearInterval(x)
            clearInterval(y)
            message.style.visibility = "visible"
            // meat.style.display = "none"
        }
        gameStarted = !gameStarted
    }

    if (key == "Escape") {
        score = 0
        scoreOut.innerText = score
        clearInterval(playerInterval)
        clearInterval(opponentInterval)

        message.style.visibility = "visible"

        player.style.top = "0px"
        player.style.left = "0px"
        player.style.transform = "scaleX(-1)"

        opponent.style.top = "290px"
        opponent.style.left = "490px"

        cage.style.visibility = "visible"
        gameStarted = false

        clearInterval(x)
        clearInterval(y)
        meat.style.display = "none"

    }

    if (gameStarted) {
        if (key == "ArrowDown") {
            clearInterval(playerInterval)
            player.style.transform = "rotate(-90deg)"

            playerInterval = setInterval(() => {
                checkWin()
                if (playerTop < 520) {
                    player.style.top = `${playerTop}px`
                    playerTop += 2
                } else {
                    clearInterval(playerInterval)
                }
            }, playerSpeed)
        }

        if (key == "ArrowUp") {
            clearInterval(playerInterval)
            player.style.transform = "rotate(90deg) "

            playerInterval = setInterval(() => {
                checkWin()
                if (playerTop >= 0) {
                    player.style.top = `${playerTop}px`
                    playerTop -= 2
                } else {
                    clearInterval(playerInterval)
                }
            }, playerSpeed)
        }

        if (key == "ArrowRight") {
            clearInterval(playerInterval)
            player.style.transform = "scaleX(-1)"

            playerInterval = setInterval(() => {
                checkWin()
                if (playerLeft < 920) {
                    player.style.left = `${playerLeft}px`
                    playerLeft += 2
                } else {
                    clearInterval(playerInterval)
                }
            }, playerSpeed)
        }

        if (key == "ArrowLeft") {
            clearInterval(playerInterval)
            player.style.transform = "scaleX(1)"
            playerInterval = setInterval(() => {
                checkWin()
                if (playerLeft >= 0) {
                    player.style.left = `${playerLeft}px`
                    playerLeft -= 2
                } else {
                    clearInterval(playerInterval)
                }
            }, playerSpeed)
        }
    }

})

// Opponent

const getRandomDirection = () => {
    const directions = ["down", "up", "right", 'left']
    return directions[Math.floor(Math.random() * 4)]
}

function moveOpponent(direction) {

    if (opponentInterval) { clearInterval(opponentInterval) }
    let opponentTop = parseInt(opponent.style.top)
    let opponentLeft = parseInt(opponent.style.left)

    if (direction == "down") {
        opponent.style.transform = "rotate(-90deg)"

        opponentInterval = setInterval(() => {
            if (opponentTop <= 550) {
                opponent.style.top = `${opponentTop}px`
                opponentTop += 3
            }
        }, 3)
    }

    if (direction == "up") {
        opponent.style.transform = "rotate(90deg)"

        opponentInterval = setInterval(() => {
            if (opponentTop >= 0) {
                opponent.style.top = `${opponentTop}px`
                opponentTop -= 3
            }
        }, 3)
    }

    if (direction == "right") {
        opponent.style.transform = "scaleX(-1)"

        opponentInterval = setInterval(() => {
            if (opponentLeft <= 960) {
                opponent.style.left = `${opponentLeft}px`
                opponentLeft += 3
            }
        }, 3)
    }

    if (direction == "left") {
        opponent.style.transform = "scaleX(1)"
        opponentInterval = setInterval(() => {
            if (opponentLeft >= 0) {
                opponent.style.left = `${opponentLeft}px`
                opponentLeft -= 3
            }
        }, 3)
    }
}

function checkWin() {
    let playerTop = parseInt(player.style.top)
    let opponentTop = parseInt(opponent.style.top)

    let playerLeft = parseInt(player.style.left)
    let opponentLeft = parseInt(opponent.style.left)

    let distanceY = playerTop - opponentTop
    let distanceX = playerLeft - opponentLeft

    if (distanceY > -50 && distanceY < 20) {
        if (distanceX > -50 && distanceX < 20) {
            // catch
            score = score + 1
            scoreOut.innerText = score
            player.style.top = "0px"
            player.style.left = "0px"
            opponent.style.top = "290px"
            opponent.style.left = "490px"
        }
    }
}

function startGame() {
    gameInterval = setInterval(() => {
        if (gameStarted) {
            moveOpponent(getRandomDirection())
        }
    }, 500)

    // meat

    // meat.style.display = "none"

    y = setInterval(() => {
        clearInterval(x)
        if (gameStarted) {
            if (!meatCatched) {
                meat.style.display = "initial"
                meat.style.top = `${Math.floor(Math.random() * 561)}px`
                meat.style.left = `${Math.floor(Math.random() * 961)}px`
                setTimeout(() => {
                    meat.style.display = "none"
                }, 4000)
            }
        }
        if (meat.style.display = "initial") {
            checkmeatCatch()
        }
    }, 5000)
}

function meatCatch() {
    clearInterval(x)
    playerSpeed = 2;
    meatCatched = true
    meat.style.display = "none"

    setTimeout(() => {
        playerSpeed = 8;
        meatCatched = false
        meat.style.display = "initial"
    }, 5000)
}

function checkmeatCatch() {
    x = setInterval(() => {
        let playerTop = parseInt(player.style.top)
        let meatTop = parseInt(meat.style.top)

        let playerLeft = parseInt(player.style.left)
        let meatLeft = parseInt(meat.style.left)

        let distanceY = playerTop - meatTop
        let distanceX = playerLeft - meatLeft

        if (distanceY > -50 && distanceY < 20) {
            if (distanceX > -50 && distanceX < 20) {
                meatCatch()
            }
        }
    }, 10)
}