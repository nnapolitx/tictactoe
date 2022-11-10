//select the div to append the gameboard to
const gameWrap = document.querySelector('.board-wrap')

const gameboard = {
    'board':
    [
        '_', '_', '_',
        '_', '_', '_', 
        '_', '_', '_'
    ]
};

const drawBoard = (() => {
    function drawSpaces () {
        console.log('draw')
        for (let i=0; i<gameboard.board.length; i++){
            console.log(`draw space ${i}`)
            
        }
    }

    function resetGame() {
        let child = boardWrap.lastElementChild
        while (child) {
            boardWrap.removeChild(child)
            child = boardWrap.lastElementChild
        }
        drawspaces()
    }

    drawSpaces()
    return {resetGame}
})()