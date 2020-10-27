class Pose extends HTMLElement{
    id;
    urlImage;
    disabled = true;
    audio;

    constructor(pose, soundUrl) {
        super();
        //this.audio = this.createAudioEl(soundUrl);
        this.initListeners();
        this.className = "pose-element";
        this.innerHTML = "hjhkhkhkjhkjhkhk";
    }

    createAudioEl(soundUrl){
        const audio = new Audio();
        audio.setAttribute('style','display: none;');
        this.appendChild(audio);
        audio.src = 'assets/sounds/' + soundUrl + '.wav';
        return audio;
    }

    initListeners(){
        this.onclick = function () {
            this.playsSound().then(function () {

            });
            /*var event = new CustomEvent("poseClicked", {
                detail: "pose" + this.id
            });
            this.dispatchEvent(event);*/
        }
    }

    createPose(){
        this.setAttribute("data-id", this.id);
        this.setAttribute("class", "poseBtn");
        this.setAttribute("disabled", this.disabled.toString());
        var poseImg = document.createElement('img');
        poseImg.setAttribute("class", "poseImg");
        poseImg.setAttribute("url", "assets/pictures/" + this.urlImage + ".jpg");
        this.appendChild(poseImg);
    }

    playsSound(){
        this.audio.play();
    }

}
window.customElements.define('pose-element', Pose);