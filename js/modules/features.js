export default class Features {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor() {
    // Elements Variables
    this.$FeatureSection = $("#yadea-xmen-features");

    // Name List
    this.$FeatureNameList = this.$FeatureSection.find(".features-name-list");
    this.$FeatureNameList_Item = this.$FeatureSection.find(".feature-item");
    this.$FeatureDecorLine = this.$FeatureNameList.find(".decor-underline");

    // Description Detail
    this.$FeatureDescription = this.$FeatureSection.find(".feature-description-list");
    this.$FeatureDescription_Item = this.$FeatureSection.find(".description-item");

    // Images
    this.$FeatureImages = this.$FeatureSection.find(".feature-images-list");
    this.$FeatureImages_Item = this.$FeatureImages.find(".image-item ");

    // Main Appear Timeline
    this.FeaturesTimeline = new TimelineMax({ paused: true, onComplete: this.BindSwappingFeature() });

    this.bindEvents();
  }

  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents() {
    this.InitSection();
    YADEAXmenListener.on("yadea-xmen-features-anim", () => {
      // TweenMax.staggerTo(this.$PowerMainContent_Context, 0.5, { autoAlpha: 1, y: 0 }, 0.2);
      this.FeaturesTimeline.play();
    });
  }

  /* ===================================
   *  METHODS
   * =================================== */
  InitSection() {
    TweenMax.set([this.$FeatureNameList, this.$FeatureDescription, this.$FeatureImages], {
      autoAlpha: 0,
      y: window.innerWidth * 0.03,
    });

    this.FeaturesTimeline.staggerTo(
      [this.$FeatureNameList, this.$FeatureDescription, this.$FeatureImages],
      0.75,
      { autoAlpha: 1, y: 0 },
      0.2
    );
  }

  BindSwappingFeature() {
    this.$FeatureNameList_Item.on("click", (e) => {
      let $target = $(e.target);
      if (!$target.hasClass("active")) {
        // Get Next Target Name
        let dataTarget = $target.data("feature");

        // Swap to next active
        this.$FeatureNameList_Item.removeClass("active");
        $target.addClass("active");

        this.$FeatureDecorLine.removeClass(
          "active-anti-shock active-bike-frame active-bike-under active-water-resistant active-bike-engine active-bike-wheel"
        );

        this.$FeatureDecorLine.addClass(`active-${dataTarget}`);

        // Update Description
        this.$FeatureDescription_Item.removeClass("active");
        $(`.description-item#${dataTarget}-detail`).addClass("active");

        // Update Image
        this.$FeatureImages_Item.removeClass("active");
        $(`.image-item#${dataTarget}-image`).addClass("active");
      }
    });
  }
}
