var poseParameters = [
    { poseName : 'test1', soundName : 'test1', imageName : '1'},
    { poseName : 'test2', soundName : 'test1', imageName : '2'},
    { poseName : 'test3', soundName : 'test1', imageName : '3'},
    { poseName : 'test4', soundName : 'test1', imageName : '4'},
    { poseName : 'test5', soundName : 'test1', imageName : '5'},
    { poseName : 'test6', soundName : 'test1', imageName : '6'}
]

/**
 * génère des poses dans le document html
 */
function generateStaticPoses() {
    var tabLenght = poseParameters.length
    for (var i = 0; i < tabLenght; i++) {
        var poseData = poseParameters[i];
        let pose = new Pose(poseData.poseName, poseData.soundName, poseData.imageName);
       var poseBtn = document.getElementById("mainContainer").appendChild(pose)
        poseBtn.addEventListener("poseClicked",function (e) {
            console.log(this);
        });
    }
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
    return pose.playsSound();
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

document.body.onclick = function() {
    playPoses(sequence).then(function(data){
        console.log(data);
    });
}