/////////////////////////////////////// GLOBALS-START ///////////////////////////////////////

var poseParameters = [
    { poseName : 'test1', soundName : 'test1', imageName : '6'},
    { poseName : 'test2', soundName : 'test1', imageName : '6'},
    { poseName : 'test3', soundName : 'test1', imageName : '6'},
    { poseName : 'test4', soundName : 'test1', imageName : '6'}
]

var playerScore = 3000;
var playerName;
var isWin;

//////////////////////////////////////// GLOBALS-END ////////////////////////////////////////

//////////////////////////////////// INITIALISATION-START ///////////////////////////////////

/**
 * Initialisation du jeu
 */
function initGame() {
    createGameHTML();
    clickEvent();
    afficheScore(getScoreFromLs());
    quitGame();
}

/**
 * Evenements click
 */
function clickEvent() {
    /*------------------------- test-Module-Start -------------------------*/
        $('#hideMenu').click(function () {
            $('.mainMenu').fadeToggle(500);
        });
    /*-------------------------- test-Module-End --------------------------*/
    $('#scoreBtn').click(function() {
        playerName = $('input[name=playerName]').val();
        if (playerName.trim() !== ""){
            $('.mainMenu').fadeToggle(200);
            /*>>>>>>>>>> GAME START HERE! <<<<<<<<<<*/
        } else {
            alert("Entre un nom correct fdp!");
            playerName;
            console.log(playerName)
        }
    });
}

///////////////////////////////////// INITIALISATION-END ////////////////////////////////////

////////////////////////////////////// STRUCTURE-START //////////////////////////////////////

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
function createGameHTML(){
    let gameHTML =
        '<div class="mainMenu">' +
            '<div class="score" id="highScoresTable"></div>' +
            '<div class="scoreBtnBox">' +
                '<input name="play" type="button" id="scoreBtn">' +
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

///////////////////////////////////// GAME-SEQUENCE-END /////////////////////////////////////

/////////////////////////////////// GAME-COMPARISON-START ///////////////////////////////////
//////////////////////////////////// GAME-COMPARISON-END ////////////////////////////////////

/////////////////////////////////////// ENDGAME-START ///////////////////////////////////////

/**
 * Lorsque le jeu se termine
 */
function endGame() {
    if (isWin === false) {
        alert('Game Over!');
        getPlayerScore();
        $('.mainMenu').fadeToggle(200);
    } else {
        getPlayerScore();
        $('.mainMenu').fadeToggle(200);
    }
}

/**
 * Lorsque le joueur quitte le jeu
 */
function quitGame() {
    $('#quit').click(function () {
        isWin = true;
        var quitGameChoice = confirm('Quit game?');
        if (quitGameChoice === true) {
            endGame();
        }
    })
}

//////////////////////////////////////// ENDGAME-END ////////////////////////////////////////

//////////////////////////////////////// SCORE-START ////////////////////////////////////////

function getPlayerScore() {
    var score = { nom: playerName, valeur : playerScore };
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
    var scoreStr = localStorage.getItem('simon-score');
    score = JSON.parse(scoreStr);
    console.log(score);
    if (!score){
        var score = createScore();
    }
    return score;
}

/**
 * Création de la structure HTML du tableau des meilleurs scores
 */
function composeHtmlScore(tabScore){
    var scoreHtml  = "<div class='scoresTitle'>HIGHSCORES</div>";
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
        scoreHtml += "<form id='formulaire' name='scoreForm'>";
        scoreHtml += "<input type='text' name='playerName' placeholder='Enter your name here'>";
        scoreHtml += "</form>";
    return scoreHtml;
}

/**
 * Affichage du tableau des meilleurs scores
 */
function afficheScore(tabScore){
    var scoreHtml = composeHtmlScore(tabScore);
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
        var va = a.valeur;
        var vb = b.valeur;
        if ( va > vb ) return -1;
        if ( vb >= va ) return 1;
    });
}

/**
 * Remplissage du tableaux des meilleurs scores
 */
function putScoreInTabScore( newScore ){
    var tabScore = getScoreFromLs();
    tabScore.push(newScore);
    tabScore = sortTabScore(tabScore);
    tabScore = getOnlyTop(tabScore);
    saveTabScoreInLs(tabScore);
    afficheScore(tabScore);
}

///////////////////////////////////////// SCORE-END /////////////////////////////////////////