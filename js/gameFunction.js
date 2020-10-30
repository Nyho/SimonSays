var poseParameters = [
    {poseName: 'test1', soundName: 'test1', imageName: '1'},
    {poseName: 'test2', soundName: 'test2', imageName: '2'},
    {poseName: 'test3', soundName: 'test3', imageName: '3'},
    {poseName: 'test4', soundName: 'test4', imageName: '4'}
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
        pose.addEventListener('poseClicked', function (ev) {
            compareSequence(ev);
        });
    }
}

/**
 * génère la structure html
 */
function createGameboard() {
    let gameBoardHTML =
        '<div class="mainMenu"></div>' +
        '<div class="gameBoard">' +
        '<div class="scoreQuitContainer">' +
        '<div class="scoreQuit">' +
        '<div id="score">000000000</div>' +
        '<button id="quit">QUIT GAME</button>' +
        '</div>' +
        '</div>' +
        '<div class="middle-img"></div>' +
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
];
let sequenceToGuess = [...sequence];

function compareSequence(ev) {
    const expected = sequenceToGuess.shift();

    let expectedSequence = expected.getAttribute('data-name');

    if (expectedSequence === ev.detail) {
        console.log('Excellent petite pute');
        if (sequenceToGuess.length === 0) {
            sequence.push(getRandomPoses(generatePoses()));
            sequenceToGuess = [...sequence];
            playPoses(sequenceToGuess).then(function (data) {
                    for (let pose of sequenceToGuess) {
                        pose.isDisabled(true);
                    }
                }
            );
        }
    } else {
        alert('Tu es une bite mon pauvre');
    }
}

function playPose(pose) {
    return pose.playSound();
}

function playPoses(sequenceToGuess) {
    return new Promise(function (resolve, reject) {
        var i = 0;

        function playByloop(e) {
            var pose = sequenceToGuess[e];
            if (!pose) {
                return resolve('TOUTE LA MELODIE EST JOUEE');
            }
            $('.middle-img').append(pose);
            return playPose(pose).then(function () {
                // pose.className += ' active';
                e++;
                return playByloop(e);
            });

        }

        playByloop(i);
    });
}

document.body.onclick = function () {
    playPoses(sequenceToGuess).then(function (data) {
        for (let pose of sequenceToGuess) {
            pose.isDisabled(true);
        }
    }
    );
}

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