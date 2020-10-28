function generatePosesBtn() {
    var tabLenght = poseParameters.length
    for (var i = 0; i < tabLenght; i++) {
        var poseData = poseParameters[i];
        let pose = new Pose(poseData.poseName, poseData.soundName, poseData.imageName);
        $('.poseTouch').append(pose);
    }
}

function createGameboard(){
    let gameBoardHTML = '<div class="mainMenu"></div>' +
        '<div class="gameBoard">' +
        '<div class="poseTouch"></div>' +
        '<div class="mainDisplay">' +
        '<div class="screenDisplay">' +
        '<div class="scoreDisplayBox">' +
        '<div id="score">000000000</div>' +
        '</div>' +
        '<div class="quitBtnBox">' +
        '<button id="quit"></button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('#mainContainer').append(gameBoardHTML);
    generatePosesBtn()
}

function initGame() {
    createGameboard();
}

var poseParameters = [
    { poseName : 'test1', soundName : 'test1', imageName : 'test1'},
    { poseName : 'test2', soundName : 'test1', imageName : 'test1'},
    { poseName : 'test3', soundName : 'test1', imageName : 'test1'},
    { poseName : 'test4', soundName : 'test1', imageName : 'test1'},
    { poseName : 'test5', soundName : 'test1', imageName : 'test1'},
    { poseName : 'test6', soundName : 'test1', imageName : 'test1'}
];
