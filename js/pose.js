class Pose extends HTMLElement {
    poseName;
    urlImage;
    disabled = true;
    audio;

    constructor(pose, soundUrl) {
        super();
        this.poseName = pose;
        this.audio = this.createAudioEl(soundUrl);
        this.initListeners();
        this.createPose();
    }

    createAudioEl(soundUrl){
        const audio = new Audio();
        audio.setAttribute('style','display: none;');
        this.appendChild(audio);
        audio.src = 'assets/sounds/' + soundUrl + '.mp3';
        return audio;
    }

    initListeners(){
        this.onclick = function () {
            this.playsSound().then(function () {

            });
            var event = new CustomEvent("poseClicked", {
                detail: "pose" + this.id
            });
            this.dispatchEvent(event);
        }
    }

    createPose(){
        /*this.setAttribute("data-id", this.id);*/
        this.setAttribute("class", "poseBtn");
        /*this.setAttribute("disabled", this.disabled.toString());*/
        var poseImg = document.createElement("img");
        poseImg.setAttribute("class", "poseImg");
        poseImg.setAttribute("src", "assets/pictures/test1.jpg");
        this.appendChild(poseImg);
    }

    playsSound(){
        this.audio.play();
    }

}
customElements.define('pose-element', Pose);