// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelector('.btn-open');
const closeModalBtn = document.querySelector('.btn-close');

const openModal = (e) => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

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

let firstMark = '';
let secondMark = '';
const playerOneInput = document.querySelector('#playerOneInput').value;
const playerTwoInput = document.querySelector('#playerTwoInput').value;

const player = (name, mark) => {

    const circle = document.querySelector('#circle');
    const x = document.querySelector('#x');

    circle.addEventListener('click', () => {
        firstMark = circle.value;
        secondMark = x.value;
    });

    x.addEventListener('click', () => {
        firstMark = x.value;
        secondMark = circle.value;
    });

    return { name, mark };

};

    const playerOne = player(playerOneInput);
    const playerTwo = player(playerTwoInput);

let switcher = true;

gameboard.gameboardArray.forEach(div => {
    
    div.addEventListener('click', () => {
        
        if (firstMark == '' && secondMark == '') {
            alert("You haven't selected a mark");
        }
        else{
            if(switcher) {
            switcher = !switcher;
            div.classList.add(firstMark);
            console.log(switcher);
        }
        else {
            switcher = true;
            div.classList.add(secondMark);
            console.log(switcher);
        };
    }
    });
});