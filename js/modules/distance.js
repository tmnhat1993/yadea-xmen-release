export default class Distance {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor() {
    // Elements Variables
    this.$DistanceSection = $("#yadea-xmen-distance");
    this.$DistanceBg = this.$DistanceSection.find(".road-images-bg");
    this.$DistanceMainContent = this.$DistanceSection.find(".main-content");
    this.$DistacenMainContent_Context = this.$DistanceMainContent.find("> *");

    this.$DistanceBikeImage = this.$DistanceSection.find(".bikes-holder");
    this.$DistanceTagHolder = this.$DistanceSection.find(".distance-tags-holder");

    this.DistanceAnimation = new TimelineMax({
      paused: true,
      onComplete: () => {
        $(".road-bg-img.road-night").addClass("anim");
        this.$DistanceMainContent.addClass("anim");
      },
    });

    this.bindEvents();
  }

  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents() {
    this.InitSection();
    YADEAXmenListener.on("yadea-xmen-distance-anim", () => {
      this.DistanceAnimation.play();
    });
  }

  /* ===================================
   *  METHODS
   * =================================== */
  InitSection() {
    // Set Init State
    TweenMax.set(this.$DistacenMainContent_Context, { autoAlpha: 0, y: window.innerWidth * 0.02 });
    TweenMax.set(this.$DistanceBg, { autoAlpha: 0, scale: 1.1 });
    TweenMax.set(this.$DistanceBikeImage, { x: -window.innerWidth * 0.7 });
    TweenMax.set(this.$DistanceTagHolder, { autoAlpha: 0, y: window.innerWidth * 0.02 });

    // Animation Build
    this.DistanceAnimation.add("anim-start");
    this.DistanceAnimation.to(this.$DistanceBg, 0.75, { scale: 1, autoAlpha: 1 }, "anim-start");
    this.DistanceAnimation.staggerTo(this.$DistacenMainContent_Context, 0.5, { y: 0, autoAlpha: 1 }, 0.2, "anim-start");
    this.DistanceAnimation.to(this.$DistanceBikeImage, 1.5, { x: 0, autoAlpha: 1, ease: Power2.easeOut }, "-=0.4");
    this.DistanceAnimation.to(this.$DistanceTagHolder, 0.5, { y: 0, autoAlpha: 1, ease: Power2.easeOut }, "-=0.8");
  }
}
