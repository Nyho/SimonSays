/////////////////////////////////////// GLOBALS-START ///////////////////////////////////////

const poseParameters = [
    { poseName : 'test1', soundName : 'test1', imageName : '6'},
    { poseName : 'test2', soundName : 'test1', imageName : '6'},
    { poseName : 'test3', soundName : 'test1', imageName : '6'},
    { poseName : 'test4', soundName : 'test1', imageName : '6'}
]

let playerScore = 3000;
let playerName;
let isWin;
let isPlayDisabled;
let play = '#playBtn';

//////////////////////////////////////// GLOBALS-END ////////////////////////////////////////

//////////////////////////////////// INITIALISATION-START ///////////////////////////////////

/**
 * Initialisation du jeu
 */
function initGame() {
    createGameHTML();
    afficheScore(getScoreFromLs());
    activePlayBtn();
    resetMenu();
    quitGame();
}

/*------------------------- test-Module-Start -------------------------*/
/**
 * Switch manuel entre mainMenu & gameBoard
 */
$('#hideMenu').click(function () {
    toggleMenu(100);
});
/*-------------------------- test-Module-End --------------------------*/

/**
 * Lancement du jeu
 */
function launchGame() {
    $(play).off("mouseenter", "mouseleave");
    classToggle(play, false, "pbHover");
    let name = $('#playerName').val();
    playerName = name.trim();
    toggleMenu(500);
    /*>>>>>>>>>> GAME START HERE! <<<<<<<<<<*/
}

/**
 * Activer le boutton play
 */
function activePlayBtn() {
    $(play).click(function () {
        if (!isPlayDisabled) {
            launchGame();
        } else {
            console.log("invalid");
        }
    });
}

/**
 * Switch entre mainMenu & gameBoard
 */
function toggleMenu(timing) {
    $('.mainMenu').fadeToggle(timing);
}

/**
 * Switch de class
 */
function classToggle(el, add, className) {
    add !== true?
        $(el).removeClass(className):
        $(el).addClass(className);
}

/**
 * Controle de la valeur de playerName
 */
function isValidName() {
    let name = $('#playerName').val();
    return name.trim() !== '';
}

/**
 * Status de isDisabled
 */
function playBtnStatus() {
    let status = isValidName();
    if (!status) {
        isPlayDisabled = true;
        classToggle('#playerName', true, "pnBlinking");
    } else {
        isPlayDisabled = false;
        classToggle(play, true, "pbHover");
    }
}

/**
 * Activation de l'event "hover" sur playBtn
 */
function playBtnHover() {
    $(play).on({
        mouseenter: function () {
            playBtnStatus();
        },
        mouseleave: function () {
            classToggle(this, false, "pbHover");
            classToggle('#playerName', false, "pnBlinking");
        }
    });
}

///////////////////////////////////// INITIALISATION-END ////////////////////////////////////

////////////////////////////////////// STRUCTURE-START //////////////////////////////////////

/**
 * génère des poses dans le document html
 */
function generatePosesBtn() {
    let tabLenght = poseParameters.length
    for (let i = 0; i < tabLenght; i++) {
        let poseData = poseParameters[i];
        let pose = new Pose(poseData.poseName, poseData.soundName, poseData.imageName);
        $('.poseTouch').append(pose);
    }
}

/**
 * génère la structure html
 */
function createGameHTML(){
    let gameHTML =
        '<div class="mainMenu">' +
            '<div class="score" id="highScoresTable"></div>' +
            '<div class="playBtnBox">' +
                '<input name="play" type="button" id="playBtn">' +
            '</div>' +
        '</div>' +
        '<div class="gameBoard">' +
            '<div class="scoreQuitContainer">' +
                '<div class="scoreQuit">' +
                    '<div id="score">000000000</div>' +
                    '<button id="quit">QUIT GAME</button>' +
                '</div>' +
            '</div>' +
            '<div class="poseTouch"></div>' +
        '</div>';
    $('#mainContainer').append(gameHTML);
    generatePosesBtn()
}

/////////////////////////////////////// STRUCTURE-END ///////////////////////////////////////

//////////////////////////////////// GAME-SEQUENCE-START ////////////////////////////////////

/**
 * génère un tableau de pose
 */
function generatePoses() {
    let poses = [];
    let tabLength = poseParameters.length
    for (let i = 0; i < tabLength; i++) {
        let poseData = poseParameters[i];
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
        let i = 0;
        function playByloop(e){
            let note = sequence[e];
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

///////////////////////////////////// GAME-SEQUENCE-END /////////////////////////////////////

/////////////////////////////////// GAME-COMPARISON-START ///////////////////////////////////
//////////////////////////////////// GAME-COMPARISON-END ////////////////////////////////////

/////////////////////////////////////// ENDGAME-START ///////////////////////////////////////

/**
 * Réinitialise le jeu
 */
function resetMenu() {
    playerName = "";
    playBtnHover();
}

/**
 * Lorsque le jeu se termine
 */
function endGame() {
    if (isWin === false) {
        alert('Game Over!');
        getPlayerScore();
        resetMenu();
        toggleMenu();
    } else {
        getPlayerScore();
        resetMenu();
        toggleMenu();
    }
}

/**
 * Lorsque le joueur quitte le jeu
 */
function quitGame() {
    $('#quit').click(function () {
        isWin = true;
        let quitGameChoice = confirm('Quit game?');
        if (quitGameChoice === true) {
            endGame();
        }
    })
}

//////////////////////////////////////// ENDGAME-END ////////////////////////////////////////

//////////////////////////////////////// SCORE-START ////////////////////////////////////////

function getPlayerScore() {
    let score = { nom: playerName, valeur : playerScore };
    putScoreInTabScore(score);
}

/**
 * Création d'un tableau de scores par défaut
 */
function createScore(){
    return [
        { nom : 'PLAYER', valeur: '000000000'},
        { nom : 'PLAYER', valeur: '000000000'},
        { nom : 'PLAYER', valeur: '000000000'},
        { nom : 'PLAYER', valeur: '000000000'},
        { nom : 'PLAYER', valeur: '000000000'},
        { nom : 'PLAYER', valeur: '000000000'}
    ];
}

/**
 * Récupération des scores dans le local storage
 */
function getScoreFromLs() {
    let scoreStr = localStorage.getItem('simon-score');
    let score = JSON.parse(scoreStr);
    if (!score){
        score = createScore();
    }
    return score;
}

/**
 * Création de la structure HTML du tableau des meilleurs scores
 */
function composeHtmlScore(tabScore){
    let scoreHtml  = "<div class='scoresTitle'>HIGH SCORE</div>";
        scoreHtml += "<table class='highscores'>";
            scoreHtml += "<tbody>";
            for (let i = 0; i < tabScore.length; i++) {
                scoreHtml += "<tr>";
                    scoreHtml += "<td class='nameLign'>"+ tabScore[i].nom +"</td>";
                    scoreHtml += "<td class='scoreLign'>"+ tabScore[i].valeur +"</td>";
                scoreHtml += "</tr>";
            }
            scoreHtml += "</tbody>";
        scoreHtml += "</table>";
        scoreHtml += "<form id='formulaire' onsubmit='return false' name='scoreForm'>";
        scoreHtml += "<input type='text' id='playerName' name='playerName' placeholder='Enter your name here!'>";
        scoreHtml += "</form>";
    return scoreHtml;
}

/**
 * Affichage du tableau des meilleurs scores
 */
function afficheScore(tabScore){
    let scoreHtml = composeHtmlScore(tabScore);
    $("#highScoresTable").html(scoreHtml);
}

/**
 * Enregistrement du score dans le local storage
 */
function saveTabScoreInLs(tabScore) {
    localStorage.setItem('simon-score', JSON.stringify(tabScore));
}

/**
 * Selection des 6 meilleurs scores
 */
function getOnlyTop(tabScore){
    return tabScore.splice(0, 6);
}

/**
 * Tri du tableau des meilleurs scores
 */
function sortTabScore(tabScore) {
    return tabScore.sort(function(a, b){
        let va = a.valeur;
        let vb = b.valeur;
        if ( va > vb ) return -1;
        if ( vb >= va ) return 1;
    });
}

/**
 * Remplissage du tableaux des meilleurs scores
 */
function putScoreInTabScore( newScore ){
    let tabScore = getScoreFromLs();
    tabScore.push(newScore);
    tabScore = sortTabScore(tabScore);
    tabScore = getOnlyTop(tabScore);
    saveTabScoreInLs(tabScore);
    afficheScore(tabScore);
}

///////////////////////////////////////// SCORE-END /////////////////////////////////////////