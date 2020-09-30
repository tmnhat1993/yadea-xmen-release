export default class Battery {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor() {
    // Elements Variables
    this.$BatterySection = $("#yadea-xmen-battery");
    // Background Layer
    this.$MainBg = this.$BatterySection.find(".bg-holder");

    // Effect Layer
    this.$EffectHolder = this.$BatterySection.find(".effect-holder");
    this.$WaveLayer = this.$EffectHolder.find(".wave-effect-layer");
    this.$FeatureIcoLayer = this.$EffectHolder.find(".icons-features-layer");
    this.$Feature_Ico = this.$FeatureIcoLayer.find(".feature-ico");
    this.$Feature_Label = this.$FeatureIcoLayer.find(".feature-detail .label");
    this.$Feature_Value = this.$FeatureIcoLayer.find(".feature-detail .value");

    // Main Content
    this.$MainContent = this.$BatterySection.find(".main-content");
    this.$MainContent_Context = this.$MainContent.find("> *");

    this.ShowingEffect = new TimelineMax({ pause: true });

    this.bindEvents();
  }

  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents() {
    this.InitSection();
    YADEAXmenListener.on("yadea-xmen-battery-anim", () => {
      this.ShowingEffect.play();
    });
  }

  /* ===================================
   *  METHODS
   * =================================== */
  InitSection() {
    // Preset Init State
    TweenMax.set(this.$MainBg, { autoAlpha: 0, scale: 1.1 });
    TweenMax.set([this.$WaveLayer, this.$Feature_Ico], { autoAlpha: 0 });
    TweenMax.set([this.$Feature_Label, this.$Feature_Value], { autoAlpha: 0, y: -window.innerWidth * 0.01 });
    TweenMax.set(this.$MainContent_Context, { autoAlpha: 0, y: window.innerWidth * 0.02 });

    // Animation Build
    this.ShowingEffect.add("anim-start");
    this.ShowingEffect.staggerTo(this.$MainContent_Context, 0.5, { autoAlpha: 1, y: 0 }, 0.2, "anim-start");
    this.ShowingEffect.to(this.$MainBg, 0.75, { autoAlpha: 1, scale: 1 }, "anim-start");
    this.ShowingEffect.to(this.$WaveLayer, 0.5, { autoAlpha: 1 }, "-=0.2");
    this.ShowingEffect.to(this.$Feature_Ico, 0.5, { autoAlpha: 1 }, "-=0.2");
    this.ShowingEffect.to([this.$Feature_Label, this.$Feature_Value], 0.35, { autoAlpha: 1, y: 0 }, "-=0.25");
  }
}
