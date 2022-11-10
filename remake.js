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
        const index = selectedSpace.getAttribute('data')

        if (gameFlow.getTurn() === true) {
            gameboard.board.splice(index, 1, 'x')
            selectedSpace.textContent = 'x'
        } else if (gameFlow.getTurn() === false) {
            gameboard.board.splice(index, 1, 'o')
            selectedSpace.textContent = 'o'
        }

        gameFlow.checkWinner()
    }

    function resetGame() {
        let child = gameWrap.lastElementChild
        while (child) {
            gameWrap.removeChild(child)
            child = gameWrap.lastElementChild
        }
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

//Factory for players 1 and 2
const Player = (name) => {
    const getName = () => name
    const board = [
        '', '', '',
        '', '', '', 
        '', '', ''
    ]

    const resetPlayerBoard = () => {
        console.log(`reset ${name}'s board`)
    }

    const move = () => {
        console.log(`${name} moved`)
    }

    return {getName, resetPlayerBoard, move}
}



const gameFlow = (() => {
    const getTurn = () => {
        let turns = gameboard.board.filter(String).length
        if (turns % 2 === 0) return true
        else return false
    }

    function win (player) {
        console.log(`${player} WINS!`)
        drawBoard.resetGame()
    }

    const checkWinner = () => {
        console.log('checking winner')
        let winner;

        switch (gameboard.board) {
            case [
                'x', 'x', 'x',
                '', '', '', 
                '', '', ''
                ]: 
            winner = 'player 1'
            break
            case [
                'x', '', '',
                '', 'x', '', 
                '', '', 'x'
                ]: 
            winner = 'player 1'
            break
            case [
                '', '', 'x',
                '', 'x', '', 
                'x', '', ''
                ]: 
            winner = 'player 1'
            break
            case [
                '', '', '',
                'x', 'x', 'x', 
                '', '', ''
                ]: 
            winner = 'player 1'
            break
            case [
                '', '', '',
                '', '', '', 
                'x', 'x', 'x'
                ]: 
            winner = 'player 1'
            break
            case [
                'x', '', '',
                'x', '', '', 
                'x', '', ''
                ]: 
            winner = 'player 1'
            break
            case [
                '', 'x', '',
                '', 'x', '', 
                '', 'x', ''
                ]: 
            winner = 'player 1'
            break
            case [
                '', '', 'x',
                '', '', 'x', 
                '', '', 'x'
                ]: 
            winner = 'player 1'
            break
        }
        if (winner === 'player1') win(winner)
    }
    
    return {getTurn, checkWinner}
})()