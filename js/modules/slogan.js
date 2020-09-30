export default class Slogan {
    /* ===================================
     *  CONSTRUCTOR
     * =================================== */
    constructor() {
        // Elements Variables
        this.$SloganSection = $("#yadea-xmen-slogan");
        this.$SloganBg = this.$SloganSection.find(".bg-holder");
        this.$SloganMainContent = this.$SloganSection.find(".main-content");
        this.$SloganMainContent_Context = this.$SloganMainContent.find("> *");

        this.$OpenProductModalBtn = this.$SloganMainContent.find(".open-gallery-popup");

        // Modal Elements
        this.$ProductPopup = $(".product-image-modal");
        this.$CloseModal = this.$ProductPopup.find(".close-product-modal");
        this.$ModalSelectItem = this.$ProductPopup.find(".bike-selection .bike-item");
        this.$ModalSelectDecor = this.$ProductPopup.find(".bike-selection .bike-select-decor");
        this.$ModalColorLayout = this.$ProductPopup.find(".content-body .colors-layout");

        this.SloganAnimTimeline = new TimelineMax({
            paused: true,
            onComplete: () => {
                this.ProductModalTogglingSetup();
            },
        });

        this.bindEvents();
    }

    /* ===================================
     *  EVENTS
     * =================================== */
    bindEvents() {
        // Product Modal Setup
        this.ProductModalSetup();
        // Animation Setup
        this.InitSection();
        YADEAXmenListener.on("yadea-xmen-slogan-anim", () => {
            this.SloganAnimTimeline.play();
        });
    }

    /* ===================================
     *  METHODS
     * =================================== */
    InitSection() {
        // Set Init State
        TweenMax.set(this.$SloganBg, { autoAlpha: 0, scale: 1.2 });
        TweenMax.set(this.$SloganMainContent_Context, { autoAlpha: 0, y: window.innerWidth * 0.02 });

        // Animation Build
        this.SloganAnimTimeline.add("anim-start");
        this.SloganAnimTimeline.to(this.$SloganBg, 0.75, { autoAlpha: 1, scale: 1 }, "anim-start");
        this.SloganAnimTimeline.staggerTo(this.$SloganMainContent_Context, 0.5, { autoAlpha: 1, y: 0 }, 0.2, "anim-start");
    }

    ProductModalTogglingSetup() {
        this.$OpenProductModalBtn.on("click", (e) => {
            // Get Correct Elements With data
            let $target = $(e.target);
            if ($target.parents(".open-gallery-popup").length > 0) {
                $target = $target.parents(".open-gallery-popup");
            }

            let dataTarget = $target.data("product");

            // Update and Show Modal
            this.OpenModal(dataTarget);
            this.$ProductPopup.addClass("show-modal");
        });
    }

    ProductModalSetup() {
        // Close Modal
        this.$CloseModal.on("click", () => {
            this.$ProductPopup.removeClass("show-modal");
        });

        // Modal Select Click
        this.$ModalSelectItem.on("click", (e) => {
            let $target = $(e.target);
            if (!$target.hasClass("active")) {
                let dataTarget = $target.data("product");

                // Toggling Active Button
                this.OpenModal(dataTarget);
            }
        });
    }

    OpenModal(type = "xmen") {
        this.$ModalSelectItem.removeClass("active");
        $(`#product-swap-to-${type}`).addClass("active");

        // Update Decoration
        this.$ModalSelectDecor.removeClass("active-xmen active-x5");
        this.$ModalSelectDecor.addClass(`active-${type}`);

        // Audate Layout
        $(".product-image-modal .colors-layout.active").removeClass("active");
        $(`#${type}-product-images-layout`).addClass("active");
    }
}