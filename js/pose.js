class Pose extends HTMLElement {
    poseName;
    imageName;
    audio;
    disabled = false;

    constructor(poseName, soundName, imageName) {
        super();
        this.poseName = poseName;
        this.imageName = imageName;
        this.audio = this.createAudioEl(soundName);
        this.createPose(imageName);
        this.initListeners();
    }

    initListeners(){
        let me = this;
        this.onclick = function () {
            me.playSound();
            console.log(me);
        }
    }

    createAudioEl(soundName){
        const audio = new Audio();
        audio.setAttribute('style','display: none;');
        this.appendChild(audio);
        audio.src = 'assets/sounds/' + soundName + '.mp3';
        return audio;
    }

    isDisabled(status){
        this.disabled = status;
    }

    playSound(){
        let me = this;
        if(me.disabled){
            return Promise.resolve();
        }
        return new Promise(function (resolve, reject) {
            me.audio.play();
            me.audio.onended = function () {
                me.eventHandler();
                console.log("sound has been played!")
                resolve();
            };
            me.audio.onerror = function (err) {
                reject(err)
            }
        })
    }

    eventHandler(){
        let event = new CustomEvent("poseClicked", {
            detail: this.poseName
        });
        this.dispatchEvent(event);
    }

    createPose(imageName){
        this.setAttribute("data-name", this.poseName);
        this.setAttribute("class", "poseBtn");
        let poseImg = document.createElement("img");
        poseImg.setAttribute("class", "poseImg");
        poseImg.setAttribute("src", "assets/pictures/" + imageName + ".jpg");
        this.appendChild(poseImg);
    }

}
customElements.define('pose-element', Pose);