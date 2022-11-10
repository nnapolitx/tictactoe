//select the div to append the gameboard to
const gameWrap = document.querySelector('.board-wrap')

const gameboard = {
    'board':
    [
        '', '', '',
        '', '', '', 
        '', '', ''
    ]
};

const drawBoard = (() => {
    //draw spaces based on the gameboard object
    const drawSpaces = () => {
        for (let i=0; i<gameboard.board.length; i++){
            const space = document.createElement('div')
            gameWrap.appendChild(space)
            space.textContent=gameboard.board[i]
            space.setAttribute('data', `${i}`)
            space.addEventListener('click', clickedSpace, {once:true})
        }
    }

    function clickedSpace(e){
        const selectedSpace = e.target
        console.log(selectedSpace.getAttribute('data'))
    }

    function resetGame() {
        let child = gameWrap.lastElementChild
        while (child) {
            gameWrap.removeChild(child)
            child = gameWrap.lastElementChild
        }
        drawSpaces()
    }

    drawSpaces()
    return {resetGame}
})()

//select reset button and add clickEvent for ResetGame()
const resetBtn = document.querySelector('.reset')
resetBtn.addEventListener('click', drawBoard.resetGame)

const gameFlow = (() => {
    console.log('flow')
})()