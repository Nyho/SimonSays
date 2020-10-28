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
        this.onclick = function () {
            console.log(!this.disabled);
            if(!this.disabled){
                this.playsSound().then(function () {

                });
                var event = new CustomEvent("poseClicked", {
                    detail: this.poseName
                });
                this.dispatchEvent(event);
            }
        }
    }

    createAudioEl(soundName){
        const audio = new Audio();
        audio.setAttribute('style','display: none;');
        this.appendChild(audio);
        audio.src = 'assets/sounds/' + soundName + '.mp3';
        audio.preload;
        return audio;
    }

    isDisabled(status){
        this.disabled = status;
    }

    playsSound(){
        var me = this;
        return new Promise(function (resolve, reject) {
            me.audio.play();
            me.audio.onended = function () {
                console.log("Tout s'est correctement déroulé.");
                resolve();
            };
            me.audio.onerror = function (err) {
                reject(err)
            }
        })
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