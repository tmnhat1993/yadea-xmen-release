export default class Banner {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor() {
    // Elements Variables
    this.$BannerSection = $("#yadea-xmen-banner");
    this.$BannerBg = this.$BannerSection.find(".bg-holder");
    this.$MainContent = this.$BannerSection.find(".main-content");

    this.BannerAnimation = new TimelineMax({ paused: true });

    this.bindEvents();
  }

  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents() {
    this.InitSection();
    YADEAXmenListener.on("yadea-xmen-banner-anim", () => {
      this.BannerAnimation.play();
    });
  }

  /* ===================================
   *  METHODS
   * =================================== */
  InitSection() {
    // Init First State
    TweenMax.set(this.$BannerBg, { autoAlpha: 0, scale: 1.1 });
    TweenMax.set(this.$MainContent, { autoAlpha: 0, y: window.innerWidth * 0.0075 });

    this.BannerAnimation.to(this.$BannerBg, 0.75, { autoAlpha: 1, scale: 1 });
    this.BannerAnimation.to(this.$MainContent, 0.5, { autoAlpha: 1, y: 0 }, "-=0.15");
  }
}
