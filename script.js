let gameboard = []
const boardWrap = document.querySelector('.board-wrap')
const resetBtn = document.querySelector('.reset')

// add a IIFE for creating gameboard
const makeGameBoard = (() => {
    function drawspaces() {
        for (let i = 0; i < 9; i++) {
            const space = document.createElement('div')
            space.setAttribute('data', `${i}`)
            boardWrap.appendChild(space)
            space.addEventListener('click', spaceClicked, {once:true})
        }
    }

    function spaceClicked(e) {
        let clickedSpace = e.target
        let playerTurn = gamePlay.getTurn()
        if (playerTurn === true){
            const xImg = document.createElement('img')
            xImg.src = 'img/x.svg'
            clickedSpace.appendChild(xImg)
            gameboard[clickedSpace.getAttribute('data')] = 'x'
        } else if (playerTurn === false) {
            const oImg =document.createElement('img')
            oImg.src = 'img/o.svg'
            clickedSpace.appendChild(oImg)
            gameboard[clickedSpace.getAttribute('data')] = 'o'
        }
    }

    function resetGame() {
        let child = boardWrap.lastElementChild
        while (child) {
            boardWrap.removeChild(child)
            child = boardWrap.lastElementChild
        }
        gameboard = []
        drawspaces()
    }

    drawspaces()
    return {resetGame}
})();

resetBtn.addEventListener('click', makeGameBoard.resetGame)

// add factory for two players
const Player = (symbol, name) => {
    const getSymbol = () => symbol
    const getName = () => name
    const moves = []

    return {getSymbol, getName}
}

//gameflow object
const gamePlay = (() => {
    const getTurn = () => {
        let turns = gameboard.filter(String).length
        if (turns % 2 === 0) return true
        else return false
    }

    //not sure if I should create this, then check in the player objects to see if their spaces match any of these combinations, or if I should do this another way
    const winArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    return {getTurn, winArray}
})()

//TOP gives instructions to create a gameboard using an array inside of an object. Not sure how to do this
gameObject = {
    'Player1': [],
    'Player2': []
    }


/* ------TO DO's--------
-have the game notice and announce a winner
-begin adding AI


*/

