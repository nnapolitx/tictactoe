//select the div to append the gameboard to
const gameWrap = document.querySelector('.board-wrap')

//Factory for players 1 and 2
const Player = (name) => {
    const getName = () => name
    const board = []

    const resetPlayerBoard = () => {
        board.length=0;
    }

    const move = (index) => {
        board.push(index)
    }

    return {getName, resetPlayerBoard, board, move}
}
//hardcoded Players with factory
const playerOne = Player('p1')
const playerTwo = Player('p2')

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
        const index = selectedSpace.getAttribute('data')

        if (gameFlow.getTurn() === true) {
            gameboard.board.splice(index, 1, 'x')
            selectedSpace.textContent = 'x'
            playerOne.move(Number(index))
            gameFlow.checkWinner(playerOne.board, playerOne.getName())
        } else if (gameFlow.getTurn() === false) {
            gameboard.board.splice(index, 1, 'o')
            selectedSpace.textContent = 'o'
            playerTwo.move(Number(index))
            gameFlow.checkWinner(playerTwo.board, playerTwo.getName())
        }
    }

    function resetGame() {
        let child = gameWrap.lastElementChild
        while (child) {
            gameWrap.removeChild(child)
            child = gameWrap.lastElementChild
        }
        playerOne.resetPlayerBoard()
        playerTwo.resetPlayerBoard()
        gameboard.board = [
            '', '', '',
            '', '', '', 
            '', '', ''
        ]
        drawSpaces()
    }

    //select reset button and add clickEvent for ResetGame()
    const resetBtn = document.querySelector('.reset')
    resetBtn.addEventListener('click', resetGame)

    drawSpaces()

    return {resetGame}
})()


const gameFlow = (() => {
    const getTurn = () => {
        let turns = gameboard.board.filter(String).length
        if (turns % 2 === 0) return true
        else return false
    }

    const winCombos = {
        a: [0, 1, 2],
        b: [3, 4, 5],
        c: [6, 7, 8],
        d: [0, 4, 8],
        e: [2, 4, 6],
        f: [0, 3, 6],
        g: [1, 4, 7],
        h: [2, 5, 8]
    };

    function win (player) {
        console.log(`${player} WINS!`)
        drawBoard.resetGame()
    }

    const checkWinner = (checkBoard, player) => {
        for (const key in winCombos) {
            if (winCombos[key].every(v => checkBoard.includes(v))){
                win(player)
            }
        }
        if (playerOne.board.length === 5 && playerTwo.board.length === 4) {
            console.log('it is a tie')
            drawBoard.resetGame()
        }
    }
    
    return {getTurn, checkWinner}
})()