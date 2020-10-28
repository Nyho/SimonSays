function testStart() {
    var pose = new Pose("highKick", "test1", "test1");
    var poseBtn = document.getElementById("mainContainer").appendChild(pose);
    poseBtn.addEventListener("poseClicked",function (e) {
        console.log(this);
    });
}
testStart();