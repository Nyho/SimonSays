var poseParameters = [
    { poseName : 'test1', soundName : 'test1', imageName : 'test1'},
    { poseName : 'test2', soundName : 'test1', imageName : 'test2'},
    { poseName : 'test3', soundName : 'test1', imageName : 'test3'},
    { poseName : 'test4', soundName : 'test1', imageName : 'test4'},
    { poseName : 'test5', soundName : 'test1', imageName : 'test5'},
    { poseName : 'test6', soundName : 'test1', imageName : 'test6'}
]

/**
 * génère des poses dans le document html
 */

function generateStaticPoses() {
    var tabLenght = poseParameters.length
    for (var i = 0; i < tabLenght; i++) {
        var poseData = poseParameters[i];
        console.log(i);
        let pose = new Pose(poseData.poseName, poseData.soundName, poseData.imageName);
        document.getElementById("mainContainer").appendChild(pose)
    }
}

/**
 * génère un tableau de pose
 */
// function generatePoses() {
//     var poses = [];
//     for (var i = 1; i < 6; i++) {
//         poses.push(new Pose(i, image[i], son[i]));
//     }
//     return poses;
// }

/**
 * randomize un tableau de pose
 */
// function getRandomPoses(poses) {
//     return poses[Math.floor(Math.random() * poses.length)];
// }

/**
 * Récupère une pose aléatoire et la stock dans un tableau sequence
 */
// const sequence = [
//     getRandomPoses(generatePoses())
// ];

// Pour chaque séquence, appeler une promesse qui affiche une pose, qui attend qu'elle disparaisse pour afficher
// la pose suivante s'il n'y a pas de suivante c'est au joueur de jouer et appeler l'eventListener
// avec la promesse (ci-dessous).

//         pose.addEventListener('poseClicked', function (ev) {
//             // MA PROMESSE qui compare le click du joueur et la sequence
//          });
