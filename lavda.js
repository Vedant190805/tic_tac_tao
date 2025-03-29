const boxElements = document.querySelectorAll(".box")
let winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
]

const Message = document.getElementById("message")
const PlayAgain = document.getElementById("button")
const Result = document.getElementById("result")

var click = 0;
let xAttempts = []
let oAttempts = []
let wonTheGame = 0;

boxElements.forEach((el, i, arr) => {
    console.log(el)

    el.addEventListener("click", () => {
        handleClick(event)
    })
})

function handleClick(e) {

    let i = e.target.id;
    let p = document.createElement("p")
    p.setAttribute("id", "text");
    boxElements[i - 1].append(p);

    if (click % 2 == 0) {
        p.innerHTML = "X"
        p.style.color = "yellow"
        xAttempts.push(parseInt(i - 1))
        result(winningCombination, xAttempts, "X")
    } else {
        p.innerHTML = "O"
        p.style.color = "orange"
        oAttempts.push(parseInt(i - 1))
        result(winningCombination, oAttempts, "O")
    }

    click++

    if (click == 9 && wonTheGame == 0) {
        Result.style.visibility = "visible";
        Message.innerHTML = "Its a Tie"
    }

}

function result(winningCombination, attempts, players) {
    let count = 0;
    let checker = [];

    for (let i = 0; i < winningCombination.length; i++) {
        if (Array.isArray(winningCombination[i])) {
            result(winningCombination[i], attempts, players)
        } else {
            if (attempts.includes(winningCombination[i])) {
                checker.push(true)
                count++
            } else {
                checker.push(false)
            }
        }

    }

    if (checker.every(el => el === true) && count > 2) {
        Result.style.visibility = "visible"
        Message.innerHTML = "The winner is" + players + "!";
        wonTheGame = 1
    }
}

PlayAgain.onclick = () => { 
    history.go(0)
}