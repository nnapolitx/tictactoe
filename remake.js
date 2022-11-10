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
    function drawSpaces () {
        for (let i=0; i<gameboard.board.length; i++){
            const space = document.createElement('div')
            gameWrap.appendChild(space)
            space.textContent=gameboard.board[i]
            space.setAttribute('data', `${i}`)
            space.addEventListener('click', clickedSpace, {once:true})
        }
    }

    function clickedSpace(e){
        console.log('clicked')
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