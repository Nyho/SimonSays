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
        var me = this;
        if(me.disabled){
            return Promise.resolve();
        }

        return new Promise(function (resolve, reject) {
            me.audio.play();

            me.audio.onended = function () {
                me.eventHandler();
                resolve();
            };
            me.audio.onerror = function (err) {
                reject(err)
            }
        })
    }

    eventHandler(){
        var event = new CustomEvent("poseClicked", {
            detail: this.poseName
        });
        this.dispatchEvent(event);
    }

    createPose(imageName){
        this.setAttribute("data-name", this.poseName);
        this.setAttribute("class", "poseBtn");
        var poseImg = document.createElement("img");
        poseImg.setAttribute("class", "poseImg");
        poseImg.setAttribute("src", "assets/pictures/" + imageName + ".jpg");
        this.appendChild(poseImg);
    }

}
customElements.define('pose-element', Pose);