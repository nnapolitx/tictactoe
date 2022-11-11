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

//need a game input function that creates player based on user input

//need a reset game function that can be called and resets back to user input screen

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
            space.setAttribute('data', i)
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
            gameFlow.checkWinner(playerOne.board, playerOne)
        } else if (gameFlow.getTurn() === false) {
            gameboard.board.splice(index, 1, 'o')
            selectedSpace.textContent = 'o'
            playerTwo.move(Number(index))
            gameFlow.checkWinner(playerTwo.board, playerTwo)
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

    function win (player, arr) {
        console.log(`${player.getName()} WINS!`)
        //const line = document.createElement('div')
        //line.classList.add('win-line')
        const beginLine = document.querySelector(`[data="${arr[0]}"]`)
        beginLine.classList.add('win-line')
        const middleLine = document.querySelector(`[data="${arr[1]}"]`)
        middleLine.classList.add('win-line')
        const endLine = document.querySelector(`[data="${arr[2]}"]`)
        endLine.classList.add('win-line')
        //drawBoard.resetGame()
    }

    const checkWinner = (checkBoard, player) => {
        for (const key in winCombos) {
            if (winCombos[key].every(v => checkBoard.includes(v))){
                let arr = winCombos[key]
                win(player, arr)
            }
        }
        if (playerOne.board.length === 5 && playerTwo.board.length === 4) {
            console.log('it is a tie')
            drawBoard.resetGame()
        }
    }
    
    return {getTurn, checkWinner}
})()

/*To dos
-add a user interface that:
    -asks user to input a name and select either player 2 or computer
    -begins the game and counts wins
    -change reset button to 'New Match'
    -add a reset game button that resets the page to ask the user to enter a new name
-create a line ~animation-ish thingy for the winner
-begin creating AI by having it pick random available squares from the gameboard Object
-give the AI some knowledge with own logic
-finally, have the AI become impossible with minmax() theorem
*/