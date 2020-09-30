export default class Maintain {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor() {
    // Elements Variables
    this.$MaintainSection = $("#yadea-xmen-maintain");
    this.$MaintainMainContent = this.$MaintainSection.find(".main-content");
    this.$MaintainMainContent_Context = this.$MaintainMainContent.find("> *");

    this.$MaintainBg = this.$MaintainSection.find(".bg-holder");

    this.MaintainAnimTimline = new TimelineMax({
      paused: true,
    });

    this.bindEvents();
  }

  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents() {
    this.InitSection();
    YADEAXmenListener.on("yadea-xmen-maintain-anim", () => {
      this.MaintainAnimTimline.play();
    });
  }

  /* ===================================
   *  METHODS
   * =================================== */
  InitSection() {
    // Set Init State
    TweenMax.set(this.$MaintainMainContent_Context, { autoAlpha: 0, y: window.innerWidth * 0.02 });
    TweenMax.set(this.$MaintainBg, { autoAlpha: 0, scale: 1.1 });

    this.MaintainAnimTimline.add("anim-start");
    this.MaintainAnimTimline.staggerTo(
      this.$MaintainMainContent_Context,
      0.5,
      { autoAlpha: 1, y: 0 },
      0.2,
      "anim-start"
    );
    this.MaintainAnimTimline.to(this.$MaintainBg, 0.75, { autoAlpha: 1, scale: 1 }, "anim-start");
  }
}
