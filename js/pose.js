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

    createPose(){
        this.setAttribute("data-id", this.id);
        this.setAttribute("class", "poseBtn");
        var poseImg = document.createElement('img');
        poseImg.setAttribute("class", "poseImg");
        poseImg.setAttribute("url", "assets/pictures/" + this.urlImage + ".jpg");

    }

}
customElements.define('pose', Pose);