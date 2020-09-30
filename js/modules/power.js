export default class Power {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor() {
    // Elements Variables
    this.$PowerSection = $("#yadea-xmen-power");
    this.$PowerBg = $("#yadea-xmen-power-smartkey > .bg-holder");
    this.$PowerMainContent = this.$PowerSection.find(".main-content");
    this.$PowerMainContent_Context = this.$PowerMainContent.find("> *");

    this.PowerAnimTimeline = new TimelineMax({ paused: true });

    this.bindEvents();
  }

  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents() {
    this.InitSection();
    YADEAXmenListener.on("yadea-xmen-power-anim", () => {
      // TweenMax.staggerTo(this.$PowerMainContent_Context, 0.5, { autoAlpha: 1, y: 0 }, 0.2);
      this.PowerAnimTimeline.play();
    });

    YADEAXmenListener.on("yadea-xmen-power-smartkey-anim", () => {
      TweenMax.to(this.$PowerBg, 0.75, { autoAlpha: 1, scale: 1 }, "anim-start");
    });
  }

  /* ===================================
   *  METHODS
   * =================================== */
  InitSection() {
    // Init First State
    TweenMax.set(this.$PowerBg, { autoAlpha: 0, scale: 1.1, transformOrigin: "50% 0%" });
    TweenMax.set(this.$PowerMainContent_Context, {
      autoAlpha: 0,
      y: window.innerWidth * 0.02,
    });

    // Animation Build
    this.PowerAnimTimeline.add("anim-start");
    this.PowerAnimTimeline.staggerTo(
      this.$PowerMainContent_Context,
      0.5,
      { autoAlpha: 1, y: 0 },
      0.2,
      "anim-start+=0.3"
    );
  }
}
