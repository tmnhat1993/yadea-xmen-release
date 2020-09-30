export default class Gallery {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor() {
    // Elements Variables
    this.$GallerySection = $("#yadea-xmen-gallery-layout");
    this.$GalleryLayout = this.$GallerySection.find(".gallery-layout");

    this.$GalleryGroup = this.$GalleryLayout.find(".gallery-group");
    this.$GalleryGroup_Item = this.$GalleryGroup.find(".img-item .inner");

    this.GalleryAnimation = new TimelineMax({
      paused: true,
      repeat: -1,
      repeatDelay: 3.5,
    });

    this.bindEvents();
  }

  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents() {
    this.InitSection();
    YADEAXmenListener.on("yadea-xmen-gallery-layout-anim", () => {
      this.GalleryAnimation.play();
    });
  }

  /* ===================================
   *  METHODS
   * =================================== */
  InitSection() {
    // Set Init State

    this.GalleryAnimation.add("anim-start");
    this.GalleryAnimation.staggerTo(this.$GalleryGroup_Item, 1.25, { rotationY: 180 }, 0.15, "anim-start");
    this.GalleryAnimation.staggerTo(this.$GalleryGroup_Item, 1.25, { rotationY: 0 }, 0.15, "+=3.5");
  }
}
