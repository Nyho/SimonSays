$(document).ready(function(){
    initGame();
});

generateRandomPoseHTML()


var victory = false;
var endGameBtn = document.getElementById('quit');

/* When the user lost the game! */
function endGame() {
    if (victory == false) {
        alert('Game Over!');
        /*putScoreInTabScore(scoreJoueur);*/
        /*initGame();*/
    }
}

/* When the user quit the game! */
function quitGame() {
    endGameBtn.onclick = function() {
        var quitGameChoice = confirm('Quit game?');
        if (quitGameChoice == true) {
            console.log("Game over!");
            endGame();
        }
    }
}

quitGame();
