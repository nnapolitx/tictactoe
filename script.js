let gameboard = []
const boardWrap = document.querySelector('.board-wrap')
const resetBtn = document.querySelector('.reset')

// add a IIFE for creating gameboard
const makeGameBoard = (() => {
    function drawspaces() {
        for (let i = 0; i < 9; i++) {
            const space = document.createElement('div')
            boardWrap.appendChild(space)
            gameboard.push(space)
            space.addEventListener('click', spaceClicked)
        }
    }

    function spaceClicked(e) {
        let clickedSpace = e.target
        if (clickedSpace.style.backgroundColor === 'red') {
            clickedSpace.style.backgroundColor = 'white'
        } else clickedSpace.style.backgroundColor = 'red'


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

//
