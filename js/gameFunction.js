const image = [image1, image2, image3, image4, image5, image6]
const son = [son1, son2, son3, son4, son5, son6]

function generateStaticPoses() {
    for (var i = 1; i < 6; i++) {
        let pose = new Pose(i, image[i], son[i]);
        document.body.appendChild(pose);
    }
}

function generatePoses() {
    var poses = [];
    for (var i = 1; i < 6; i++) {
        poses.push(new Pose(i, image[i], son[i]));
    }
    return poses;
}

function getRandomPoses(poses) {
    return poses[Math.floor(Math.random() * poses.length)];
}

const sequence = [
    getRandomPoses(generatePoses())
];

// Pour chaque séquence, appeler une promesse qui affiche une pose, qui attend qu'elle disparaisse pour afficher
// la pose suivante s'il n'y a pas de suivante c'est au joueur de jouer et appeler l'eventListener
// avec la promesse (ci-dessous).


//         pose.addEventListener('poseClicked', function (ev) {
//             // MA PROMESSE qui compare le click du joueur et la sequence
//          });
