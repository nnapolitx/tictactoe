const gameboard = []
const boardWrap = document.querySelector('.board-wrap')

//add a IIFE for creating gameboard
const makeGameBoard = (() => {
    if (gameboard.length === 0) {
        for (let i=0; i<9; i++) {
            const space = document.createElement('div')
            boardWrap.appendChild(space)
            gameboard.push(space)
            space.addEventListener('click', spaceClicked)
        }
    }
})();

function spaceClicked (e) {
    console.log('click', e.target)
}


//add factory for two players

// 