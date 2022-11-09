let gameboard = []
const boardWrap = document.querySelector('.board-wrap')
const resetBtn = document.querySelector('.reset')

// add a IIFE for creating gameboard
const makeGameBoard = (() => {
    function drawspaces() {
        for (let i = 0; i < 9; i++) {
            const space = document.createElement('div')
            boardWrap.appendChild(space)
            
            space.addEventListener('click', spaceClicked)
        }
    }

    function spaceClicked(e) {
        let clickedSpace = e.target
        let playerTurn = gamePlay.getTurn()
        if (playerTurn === true){
            const xImg = document.createElement('img')
            xImg.src = 'img/x.svg'
            clickedSpace.appendChild(xImg)
        } else if (playerTurn === false) {
            const oImg =document.createElement('img')
            oImg.src = 'img/o.svg'
            clickedSpace.appendChild(oImg)
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

//gameflow object
const gamePlay = (() => {
    let turn=false

    const getTurn = ()=>{
        if (turn===true) turn = false
        else turn=true
        return turn
    }

    return {getTurn}
})()
