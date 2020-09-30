export default class Comparision {
    /* ===================================
     *  CONSTRUCTOR
     * =================================== */
    constructor() {
        // Elements Variables
        this.$ComparisionSection = $("#yadea-xmen-comparision");
        this.$ComparisionTitle = this.$ComparisionSection.find(".section-title");
        this.$ComparisionLayout = this.$ComparisionSection.find(".comparision-layout");

        this.$AspectDecorLine = this.$ComparisionLayout.find(".aspect-list .aspect-decor");
        this.$AspectBtn = this.$ComparisionLayout.find(".aspect-list .aspect-item");
        this.$AspectRow = this.$ComparisionLayout.find(".row.aspect-row");

        this.bindEvents();
    }

    /* ===================================
     *  EVENTS
     * =================================== */
    bindEvents() {
        this.InitSection();
        YADEAXmenListener.on("yadea-xmen-comparision-anim", () => {
            TweenMax.staggerTo(
                [this.$ComparisionTitle, this.$ComparisionLayout],
                0.5, {
                    autoAlpha: 1,
                    y: 0,
                    onComplete: () => {
                        this.BindComparisionSwitch();
                    },
                },
                0.2
            );
        });
    }

    /* ===================================
     *  METHODS
     * =================================== */
    InitSection() {
        // Set Init State
        TweenMax.set([this.$ComparisionTitle, this.$ComparisionLayout], { autoAlpha: 0, y: window.innerWidth * 0.02 });
    }

    BindComparisionSwitch() {
        this.$AspectBtn.on("click", (e) => {
            let $target = $(e.target);

            if (!$target.hasClass("active")) {
                let dataTarget = $target.data("aspect");

                this.$AspectBtn.removeClass("active");
                $target.addClass("active");

                // Hide Old Aspect
                this.$AspectRow.removeClass("active");
                $(`#${dataTarget}-aspect-table`).addClass("active");

                this.$AspectDecorLine.removeClass("size-active frame-active engine-active performance-active utils-active");
                this.$AspectDecorLine.addClass(`${dataTarget}-active`);
            }
        });
    }
}