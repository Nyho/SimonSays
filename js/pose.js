class Pose extends HTMLElement{
    id;
    disabled = true;
    urlImage;
    urlSound;

    constructor(id, urlImage) {
        super();
        this.id = id;
        this.urlImage = image;
        this.urlSound = sound;
        this.createPose();
        this.initListeners();
    }

    initListeners(){
        var event = new CustomEvent("poseClicked", {
            detail: "pose" + this.id 
        });
        this.dispatchEvent(event);
    }

    createPose(){
        this.setAttribute("data-id", this.id);
        this.setAttribute("class", "poseBtn");
        this.setAttribute("disabled", this.disabled);
        var poseImg = document.createElement('img');
        poseImg.setAttribute("class", "poseImg");
        poseImg.setAttribute("url", "assets/pictures/" + this.urlImage + ".jpg");
        var poseSound = document.createElement("audio");
        poseSound.setAttribute("class", "poseSound");
        poseSound.setAttribute("src", "assets/sounds/" + this.urlSound + ".mp3");
        this.appendChild(poseImg);
        this.appendChild(poseSound);
    }

    playsSound(){
        
    }

}
customElements.define('pose', Pose);