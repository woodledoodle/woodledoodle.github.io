
//keeps track of computer light sequence
let sequence = [];

//keep track of player sequence
let playerSequence = [];

//show the level you are on
const turnLevel = document.querySelector('#level');

// declare and assign start button and p tag to display who is playing
const startButton = document.querySelector('#start')

const isPlaying = document.getElementById('playing');

// declare randomSquares for computer play and squares for player play
var randomSquare = document.querySelectorAll('.square');
var squares = document.getElementById("squares");

// declare variables for whos turn it is, the number of rounds, and the current round
let turn = 'computer';
let rounds = 8;
let gameRound = 1;

startButton.addEventListener('click', function(event){
    // this starts the game
    if(gameRound == 1){
        play(gameRound);
        gameRound++; 
    } else {
        alert("Hurry before you get caught!")
    }
});

function play(gameRound){
    sequence = [];
    playerSequence = [];
    computerPlay(gameRound);
    turnLevel.innerHTML = gameRound;
}

function clearGame(){
    gameRound = 1; 
    
}


// this is for player play
squares.addEventListener('click', function(event) {
    let square = event.target;
    // this pushes the players selection onto array
    if(square.id !== 'squares' && turn === 'player' && playerSequence.length < sequence.length) {
        playerSequence.push( Number(square.id.split('-')[1]));   
    }
    // this checks the computers choices against players choices after finished selecting
    if(turn === 'player' &&  playerSequence.length === sequence.length && square.id !== 'squares') {
        if(JSON.stringify(playerSequence) !== JSON.stringify(sequence)){
            alert("Uh Oh, Wrong Code. You have been caught!");
            clearGame(); // might not need this if the browser if reloaded
            window.location.reload(); // reload the browser
        } else {
            // first check if it is last round ..
            if((gameRound - 1) == rounds){
                alert("YOU WON THE WHOLE GAME!");
            } else { // if not, then continue playing with computer turn
                alert("Nice Job... Next Round!");
                setTimeout(function(){
                    turn = 'computer';
                    play(gameRound);
                    gameRound++;
                }, 1000)
            }
        }
    }
})
// when the mouse presses down and up, the selected square will light up accordingly
squares.addEventListener('mousedown', function(event){
    let square = event.target;
    if(square.id !== 'squares' && turn === 'player') {
        square.style.opacity = .2;
        window.addEventListener('mouseup', function() {
            square.style.opacity = 1;
        })
    }
    
}) // end code player play


// this is for the computer play
function computerPlay(numPlay){
    
    if (numPlay > 0){
        isPlaying.innerText = "Computer Playing";
        computerLightSquare(numPlay);
        setTimeout(function(){
            computerPlay(numPlay -1)
        },1000)
    }
}

function computerLightSquare(numPlay){
    let index = Math.floor(Math.random() * 4)
    sequence.push(index);
    randomSquare[index].style.opacity = .2;
    setTimeout(function(){
        randomSquare[index].style.opacity = 1;  
        if(numPlay === 1) {
            isPlaying.innerText = "Your turn";
            turn = 'player';
            console.log("seq: ", sequence)
        }  
    },500)
} // end code for computer play




