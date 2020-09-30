export default class Maintain {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor() {
    // Elements Variables
    this.$BrakeSection = $("#yadea-xmen-brake");
    this.$BrakeMainContent = this.$BrakeSection.find(".main-content");
    this.$BrakeMainContent_Context = this.$BrakeMainContent.find(".context-wrapper > *");

    this.$BrakeBg = this.$BrakeSection.find(".bg-holder");
    this.$BrakeBg_Effect = this.$BrakeBg.find(".brake-highlight");

    this.$BrakeAnimTimeline = new TimelineMax({
      paused: true,
      onComplete: () => {
        this.$BrakeEffectTimeline.play();
      },
    });

    this.$BrakeEffectTimeline = new TimelineMax({ repeat: -1, paused: true, repeatDelay: 1.5, delay: 0.5 });

    this.bindEvents();
  }

  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents() {
    this.InitSection();
    YADEAXmenListener.on("yadea-xmen-brake-anim", () => {
      this.$BrakeAnimTimeline.play();
    });
  }

  /* ===================================
   *  METHODS
   * =================================== */
  InitSection() {
    // Set Init State
    TweenMax.set(this.$BrakeMainContent_Context, { autoAlpha: 0, y: window.innerWidth * 0.02 });
    TweenMax.set(this.$BrakeMainContent, { autoAlpha: 0, x: -window.innerWidth * 0.3 });
    TweenMax.set(this.$BrakeBg, { autoAlpha: 0, scale: 1.2 });
    TweenMax.set(this.$BrakeBg_Effect, { autoAlpha: 0 });

    this.$BrakeAnimTimeline.add("anim-start");
    this.$BrakeAnimTimeline.to(this.$BrakeBg, 0.75, { autoAlpha: 1, scale: 1 }, "anim-start");
    this.$BrakeAnimTimeline.to(this.$BrakeMainContent, 0.75, { autoAlpha: 1, x: 0 }, "anim-start");
    this.$BrakeAnimTimeline.staggerTo(this.$BrakeMainContent_Context, 0.5, { autoAlpha: 1, y: 0 }, 0.2, "-=0.1");

    this.$BrakeEffectTimeline.add("anim-start");
    this.$BrakeEffectTimeline.fromTo(
      this.$BrakeBg_Effect,
      0.35,
      { autoAlpha: 0, scale: 0.99, ease: Power3.easeIn },
      { autoAlpha: 1, scale: 1 },
      "anim-start"
    );
    this.$BrakeEffectTimeline.to(this.$BrakeBg_Effect, 0.4, { autoAlpha: 0 }, "+=2");
  }
}
