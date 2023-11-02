// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelector('.btn-open');

const openModal = (e) => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

openModalBtn.addEventListener('click', () => {
    openModal,
    location.reload();
});

// Gameboard display
const gameboard = (() =>{
    const gameboardContainer = document.querySelector('.gameboard-container');

    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        div.classList.add('spot');
        div.id = 'spot-' + [i];
        gameboardContainer.appendChild(div);
    }

    const div0 = document.getElementById('spot-0');
    const div1 = document.getElementById('spot-1');
    const div2 = document.getElementById('spot-2');
    const div3 = document.getElementById('spot-3');
    const div4 = document.getElementById('spot-4');
    const div5 = document.getElementById('spot-5');
    const div6 = document.getElementById('spot-6');
    const div7 = document.getElementById('spot-7');
    const div8 = document.getElementById('spot-8');

    const gameboardArray = [div0, div1, div2, div3, div4, div5, div6, div7, div8];

    return {gameboardArray};

})();

const boardArray = gameboard.gameboardArray;


const player = (name, mark) => {
    
    const symbol = (div, mark) => {
        
        div.classList.add(mark);
        
        if (gameFlow.winner(mark)) {
            gameFlow.endGame(false, name, mark);
        }
        else if (gameFlow.draw(mark)) {
            gameFlow.endGame(true, name, mark);
        };
    };
    
    return { name, mark, symbol };
    
};

const x = document.querySelector('#x');
const circle = document.querySelector('#circle');
const playerOneInput = document.querySelector('#playerOneInput').value;
const playerTwoInput = document.querySelector('#playerTwoInput').value;

const formHandler = () => {

    
    const check = (e) => {
        if (e == 'circle') {
        firstMark = circle.id;
        secondMark = x.id;
        }
        else {
            firstMark = x.id;
            secondMark = circle.id;
        };
    }
            
        const playerOne = player(playerOneInput, check.firstMark);
        const playerTwo = player(playerTwoInput, check.secondMark);
            
        return [ check, playerOne, playerTwo ];
}

const [check, playerOne, playerTwo] = formHandler();

circle.addEventListener('click', (e) => {
    check(e.target.id);
    console.log(e);
    closeModal();
});


x.addEventListener('click', (e) => {
    check(e.target.id);
    closeModal();
});

let switcher = true;

const gameFlow = (() => {

const switchTurns = () => {
boardArray.forEach(div => {
    
    div.addEventListener('click', () => {
        
        if(switcher) {
            switcher = !switcher;
            playerOne.symbol(div, firstMark);
        }
        else {
            switcher = true;
            playerTwo.symbol(div, secondMark);
        };
    }, {once: true});
});
}

const winner = (e) => {
    const winnerCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    return winnerCombos.some(combination => {
        return combination.every(index => {
            return boardArray[index].classList.contains(e);
        }); 
    });          
};

const draw = (mark) => {
    return [...boardArray].every(div => {
        return div.classList.contains("circle") || div.classList.contains("x");
    });
}

const endGame = (draw, name, mark) => {
    if(draw) {
       alert('it is a draw!');
       location.reload();
    }
    else {
        alert(name + ' with ' + mark + ' has won');
        location.reload();
    }
};
    return { switchTurns, winner, draw, endGame }
})();

gameFlow.switchTurns();
