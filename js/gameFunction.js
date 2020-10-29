var poseParameters = [
    { poseName : 'test1', soundName : 'test1', imageName : '6'},
    { poseName : 'test2', soundName : 'test1', imageName : '6'},
    { poseName : 'test3', soundName : 'test1', imageName : '6'},
    { poseName : 'test4', soundName : 'test1', imageName : '6'}
]

/**
 * Initialisation du jeu
 */
function initGame() {
    createGameboard();
    quitGame();
}

/**
 * génère des poses dans le document html
 */
function generatePosesBtn() {
    var tabLenght = poseParameters.length
    for (var i = 0; i < tabLenght; i++) {
        var poseData = poseParameters[i];
        let pose = new Pose(poseData.poseName, poseData.soundName, poseData.imageName);
        $('.poseTouch').append(pose);
    }
}

/**
 * génère la structure html
 */
function createGameboard(){
    let gameBoardHTML =
        '<div class="mainMenu"></div>' +
        '<div class="gameBoard">' +
        '<div class="scoreQuitContainer">' +
        '<div class="scoreQuit">' +
        '<div id="score">000000000</div>' +
        '<button id="quit">QUIT GAME</button>' +
        '</div>' +
        '</div>' +
        '<div class="poseTouch"></div>' +
        '</div>';
    $('#mainContainer').append(gameBoardHTML);
    generatePosesBtn()
}

/**
 * génère un tableau de pose
 */
function generatePoses() {
    var poses = [];
    var tabLength = poseParameters.length
    for (var i = 0; i < tabLength; i++) {
        var poseData = poseParameters[i];
        poses.push(new Pose(poseData.poseName, poseData.soundName, poseData.imageName));
    }
    return poses;
}

/**
 * randomize un tableau de poses
 */
function getRandomPoses(poses) {
    return poses[Math.floor(Math.random() * poses.length)];
}

/**
 * Récupère une pose aléatoire et la stock dans un tableau sequence
 */
const sequence = [
    getRandomPoses(generatePoses()),
    getRandomPoses(generatePoses()),
    getRandomPoses(generatePoses())
];

function generateRandomPoseHTML(){
    for (let poses of sequence) {
        document.getElementById("secondContainer").appendChild(poses);
    }
}


function playPose(pose) {
    return pose.playSound();
}
function playPoses(sequence){
    return new Promise(function(resolve, reject){
        var i = 0;
        function playByloop(e){
            var note = sequence[e];
            if (!note){
                return resolve('TOUTE LA MELODIE EST JOUEE');
            }
            return playPose(note).then( function(){
                e++;
                return playByloop(e);
            });
        }
        playByloop(i);
    });
}

/*document.body.onclick = function() {
    playPoses(sequence).then(function(data){
        console.log(data);
    });
}*/

/**
 * Lorsque le joueur perd la partie
 */
function endGame() {
    var victory = false;
    if (victory === false) {
        alert('Game Over!');
        /*putScoreInTabScore(scoreJoueur);*/
        /*initGame();*/
    }
}

/**
 * Lorsque le joueur quitte le jeu
 */
function quitGame() {
    $('#quit').click(function () {
        console.log("click!");
        var quitGameChoice = confirm('Quit game?');
        if (quitGameChoice === true) {
            console.log("Game over!");
            endGame();
        }
    })
}