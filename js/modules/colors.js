export default class Colors {
    /* ===================================
     *  CONSTRUCTOR
     * =================================== */
    constructor() {
        // Elements
        this.$ColorSection = $("#yadea-xmen-variation");

        //Background Elements
        this.$BgHolder = this.$ColorSection.find(".bg-holder");
        this.BgElements = {
            teal: this.$BgHolder.find(".bg-item.bg-teal"),
            red: this.$BgHolder.find(".bg-item.bg-red"),
            orange: this.$BgHolder.find(".bg-item.bg-orange"),
            blue: this.$BgHolder.find(".bg-item.bg-blue"),
            green: this.$BgHolder.find(".bg-item.bg-green"),
        };

        // Product Name Holder Elements
        this.$ProductName = this.$ColorSection.find(".product-name-holder");
        this.ProductNames = {
            xmen: [this.$ProductName.find(".xmen-name-line1"), this.$ProductName.find(".xmen-name-line2")],
            x5: this.$ProductName.find(".x5-name"),
        };

        // Color Control
        this.$ColorControl = this.$ColorSection.find(".main-content .color-control-holder");
        this.$SwitcProductBtn = this.$ColorControl.find(".product-name-item");
        this.$SwitchProductDecor = this.$ColorControl.find(".decor-line");

        // Color List Group
        this.$XMenColorList = this.$ColorSection.find(".color-group-list.for-xmen");
        this.$X5ColorList = this.$ColorSection.find(".color-group-list.for-x5");

        // Switch Color Button
        this.$SwitchColorXmenBtn = this.$XMenColorList.find(".color-item");
        this.$SwitchColorX5Btn = this.$X5ColorList.find(".color-item");

        // Bike Images
        this.$BikeImagesHolder = this.$ColorSection.find(".product-image-holder");
        this.$BikeXmenImagesGroup = this.$BikeImagesHolder.find(".color-group-holder.xmen-color-images-group");
        this.XmenImages = {
            red: this.$BikeXmenImagesGroup.find(".img-item.xmen-red"),
            blue: this.$BikeXmenImagesGroup.find(".img-item.xmen-blue"),
            green: this.$BikeXmenImagesGroup.find(".img-item.xmen-green"),
            orange: this.$BikeXmenImagesGroup.find(".img-item.xmen-orange"),
        };

        this.$BikeX5ImagesGroup = this.$BikeImagesHolder.find(".color-group-holder.x5-color-images-group");
        this.X5Images = {
            red: this.$BikeX5ImagesGroup.find(".img-item.x5-red"),
            white: this.$BikeX5ImagesGroup.find(".img-item.x5-white"),
            orange: this.$BikeX5ImagesGroup.find(".img-item.x5-orange"),
        };

        // Paging
        this.$PagingHolder = this.$ColorSection.find(".paging-holder");
        this.$PagingX5 = this.$PagingHolder.find(".paging-group.for-x5");
        this.$PagingXmen = this.$PagingHolder.find(".paging-group.for-xmen");

        this.$PagingXmenNext = this.$PagingXmen.find(".next-btn");
        this.$PagingXmenPrev = this.$PagingXmen.find(".prev-btn");
        this.$PagingXmenCurrentPage = this.$PagingXmen.find(".current-page");

        this.$PagingX5Next = this.$PagingX5.find(".next-btn");
        this.$PagingX5Prev = this.$PagingX5.find(".prev-btn");
        this.$PagingX5CurrentPage = this.$PagingX5.find(".current-page");

        // Matching Info To Do Animation
        this.MATCHING_INFO = {
            "xmen-red": { name: "xmen", bike: "red", bg: "red", page: 2 },
            "xmen-blue": { name: "xmen", bike: "blue", bg: "blue", page: 1 },
            "xmen-green": { name: "xmen", bike: "green", bg: "green", page: 3 },
            "xmen-orange": { name: "xmen", bike: "orange", bg: "orange", page: 4 },
            "x5-red": { name: "x5", bike: "red", bg: "red", page: 2 },
            "x5-white": { name: "x5", bike: "white", bg: "teal", page: 1 },
            "x5-orange": { name: "x5", bike: "orange", bg: "orange", page: 3 },
        };

        // Start with XMEN Neo Red
        this.OldMatching = null;
        this.CurrentMatching = Object.assign({}, this.MATCHING_INFO["xmen-blue"]);
        this.isAnimating = false;

        this.bindEvents();
    }

    /* ===================================
     *  EVENTS
     * =================================== */
    bindEvents() {
        this.InitState();
        this.SwitchProductSetup();

        YADEAXmenListener.on("yadea-xmen-variation-anim", () => {
            this.isAnimating = true;
            this.DoSwitchAnimation();
        });
    }

    /* ===================================
     *  METHODS
     * =================================== */
    SwitchProductSetup() {
        // Swapping Between Product Button Click
        this.$SwitcProductBtn.on("click", (e) => {
            if (!this.isAnimating) {
                this.isAnimating = true;
                let $targetEl = $(e.target);

                // Note current bike, switch bike, else ignore
                if (!$targetEl.hasClass("active")) {
                    // Get Product Name
                    let targetName = $targetEl.data("select");

                    // Toggling Product Item Active
                    this.$SwitcProductBtn.removeClass("active");
                    $targetEl.addClass("active");

                    switch (targetName) {
                        case "xmen":
                            this.CurrentMatching = Object.assign({}, this.MATCHING_INFO["xmen-blue"]);
                            this.$SwitchProductDecor.removeClass("active-2").addClass("active-1");
                            this.DoSwitchAnimation();
                            break;
                        case "x5":
                            this.CurrentMatching = Object.assign({}, this.MATCHING_INFO["x5-white"]);
                            $targetEl.addClass("active");
                            this.$SwitchProductDecor.removeClass("active-1").addClass("active-2");
                            this.DoSwitchAnimation();
                            break;
                    }
                }
            }
        });

        // Swapping Between Color Click
        this.$SwitchColorXmenBtn.on("click", (e) => {
            if (!this.isAnimating) {
                // Lock the flag
                this.isAnimating = true;

                // Check The Click Target
                let $clickTarget = $(e.target);
                if ($clickTarget.parents(".color-item").length > 0) {
                    $clickTarget = $clickTarget.parents(".color-item");
                }

                if (!$clickTarget.hasClass("active")) {
                    let nextTargetValue = $clickTarget.data("target");
                    this.CurrentMatching = Object.assign({}, this.MATCHING_INFO[nextTargetValue]);

                    this.$SwitchColorXmenBtn.removeClass("active");
                    $clickTarget.addClass("active");

                    this.DoSwitchAnimation();
                }
            }
        });

        // Swapping Between Color Click
        this.$SwitchColorX5Btn.on("click", (e) => {
            if (!this.isAnimating) {
                // Lock the flag
                this.isAnimating = true;

                // Check The Click Target
                let $clickTarget = $(e.target);
                if ($clickTarget.parents(".color-item").length > 0) {
                    $clickTarget = $clickTarget.parents(".color-item");
                }

                if (!$clickTarget.hasClass("active")) {
                    let nextTargetValue = $clickTarget.data("target");
                    this.CurrentMatching = Object.assign({}, this.MATCHING_INFO[nextTargetValue]);

                    this.$SwitchColorX5Btn.removeClass("active");
                    $clickTarget.addClass("active");

                    this.DoSwitchAnimation();
                }
            }
        });

        this.$PagingXmenNext.on("click", (e) => {
            if (this.OldMatching !== null) {
                this.GetNext("xmen");
            }
        });

        this.$PagingXmenPrev.on("click", (e) => {
            if (this.OldMatching !== null) {
                this.GetPrev("xmen");
            }
        });

        this.$PagingX5Prev.on("click", (e) => {
            if (this.OldMatching !== null) {
                this.GetPrev("x5");
            }
        });

        this.$PagingX5Next.on("click", (e) => {
            if (this.OldMatching !== null) {
                this.GetNext("x5");
            }
        });
    }

    DoSwitchAnimation() {
        let SwitchingTimeline = new TimelineMax({
            onComplete: () => {
                this.OldMatching = Object.assign({}, this.CurrentMatching);
                this.isAnimating = false;
            },
        });

        let isAnimatingName = this.OldMatching == null || this.OldMatching.name !== this.CurrentMatching.name;

        // Starting Label
        SwitchingTimeline.add("anim-start");

        // Hide Old Elements First
        if (this.OldMatching !== null) {
            SwitchingTimeline.add("hide-start");
            SwitchingTimeline.to(this.BgElements[this.OldMatching.bg], 0.25, { autoAlpha: 0 }, "hide-start");

            switch (this.OldMatching.name) {
                case "xmen":
                    // Update New Page
                    this.$PagingXmenCurrentPage.html(this.CurrentMatching.page);

                    // Old Bike Go Away, then back to init position
                    SwitchingTimeline.to(
                        this.XmenImages[this.OldMatching.bike],
                        0.25, {
                            autoAlpha: 0,
                            x: -window.innerWidth * 0.05,
                            onComplete: () => {
                                TweenMax.set(this.XmenImages[this.OldMatching.bike], { autoAlpha: 0, x: window.innerWidth * 0.1 });
                            },
                        },
                        "hide-start"
                    );

                    // Need to do name change too
                    if (isAnimatingName) {
                        // Fade out the name
                        SwitchingTimeline.to(
                            this.ProductNames.xmen[0],
                            0.25, { autoAlpha: 0, x: window.innerWidth * 0.05 },
                            "hide-start"
                        );

                        // Fade out the name
                        SwitchingTimeline.to(
                            this.ProductNames.xmen[1],
                            0.25, {
                                autoAlpha: 0,
                                x: -window.innerWidth * 0.05,
                                onComplete: () => {
                                    TweenMax.set(this.ProductNames.xmen[0], { autoAlpha: 0, x: -window.innerWidth * 0.1 });
                                    TweenMax.set(this.ProductNames.xmen[1], { autoAlpha: 0, x: window.innerWidth * 0.1 });
                                },
                            },
                            "hide-start"
                        );

                        // Fade out color set
                        SwitchingTimeline.to(this.$XMenColorList, 0.25, {
                            autoAlpha: 0,
                            onComplete: () => {
                                TweenMax.set(this.$XMenColorList, { autoAlpha: 0, y: window.innerWidth * 0.025 });
                                this.$SwitchColorXmenBtn.removeClass("active");
                                $(".color-group-list.for-xmen .color-item.blue").addClass("active");
                            },
                        });

                        // Fade out old Paging
                        SwitchingTimeline.to(this.$PagingXmen, 0.25, { autoAlpha: 0, y: window.innerWidth * 0.015 }, "hide-start");
                    }
                    break;
                case "x5":
                    // Update New Page
                    this.$PagingX5CurrentPage.html(this.CurrentMatching.page);

                    // Old Bike Go Away, then back to init position
                    SwitchingTimeline.to(
                        this.X5Images[this.OldMatching.bike],
                        0.25, {
                            autoAlpha: 0,
                            x: -window.innerWidth * 0.05,
                            onComplete: () => {
                                TweenMax.set(this.X5Images[this.OldMatching.bike], { autoAlpha: 0, x: window.innerWidth * 0.1 });
                            },
                        },
                        "hide-start"
                    );

                    // Need to do name change too
                    if (isAnimatingName) {
                        SwitchingTimeline.to(
                            this.ProductNames.x5,
                            0.25, {
                                autoAlpha: 0,
                                x: window.innerWidth * 0.05,
                                onComplete: () => {
                                    TweenMax.set(this.ProductNames.x5, { autoAlpha: 0, x: window.innerWidth * 0.1 });
                                },
                            },
                            "hide-start"
                        );

                        // Fade out color set
                        SwitchingTimeline.to(this.$X5ColorList, 0.25, {
                            autoAlpha: 0,
                            onComplete: () => {
                                TweenMax.set(this.$X5ColorList, { autoAlpha: 0, y: window.innerWidth * 0.025 });
                                this.$SwitchColorX5Btn.removeClass("active");
                                $(".color-group-list.for-x5 .color-item.white").addClass("active");
                            },
                        });

                        // Fade out old Paging
                        SwitchingTimeline.to(this.$PagingX5, 0.25, { autoAlpha: 0, y: window.innerWidth * 0.015 }, "hide-start");
                    }
                    break;
            }
        }

        // Start Show New Bike Animation
        SwitchingTimeline.to(this.BgElements[this.CurrentMatching.bg], 0.75, { autoAlpha: 1 }, "anim-start");

        // The current name is different
        switch (this.CurrentMatching.name) {
            case "xmen":
                if (isAnimatingName) {
                    // Show Bike Name
                    SwitchingTimeline.to(
                        [this.ProductNames.xmen[0], this.ProductNames.xmen[1]],
                        0.5, { autoAlpha: 1, x: 0 },
                        "anim-start+=0.5"
                    );

                    // Show Color Listing
                    SwitchingTimeline.to(this.$XMenColorList, 0.5, { autoAlpha: 1, y: 0 }, "anim-start+=0.5");

                    // Show New Paging
                    SwitchingTimeline.to(this.$PagingXmen, 0.5, { autoAlpha: 1, y: 0 }, "anim-start+=0.5");
                }

                SwitchingTimeline.to(this.XmenImages[this.CurrentMatching.bike], 0.7, { autoAlpha: 1, x: 0 }, "-=0.2");

                break;

            case "x5":
                // Show Bike Name
                if (isAnimatingName) {
                    // Show New Name
                    SwitchingTimeline.to(this.ProductNames.x5, 0.5, { autoAlpha: 1, x: 0 }, "anim-start+=0.5");

                    // Show Color Listing
                    SwitchingTimeline.to(this.$X5ColorList, 0.5, { autoAlpha: 1, y: 0 }, "anim-start+=0.5");

                    // Show New Paging
                    SwitchingTimeline.to(this.$PagingX5, 0.5, { autoAlpha: 1, y: 0 }, "anim-start+=0.5");
                }

                SwitchingTimeline.to(this.X5Images[this.CurrentMatching.bike], 0.7, { autoAlpha: 1, x: 0 }, "-=0.2");

                break;
        }
    }

    InitState() {
        // Background
        for (const item in this.BgElements) {
            TweenMax.set(this.BgElements[item], { autoAlpha: 0 });
        }

        // Name
        TweenMax.set([this.ProductNames.x5, this.ProductNames.xmen[0]], { autoAlpha: 0, x: -window.innerWidth * 0.1 });
        TweenMax.set(this.ProductNames.xmen[1], { autoAlpha: 0, x: window.innerWidth * 0.1 });

        // Bike Images
        for (const item in this.XmenImages) {
            console.log(this.XmenImages[item]);
            TweenMax.set(this.XmenImages[item], { autoAlpha: 0, x: window.innerWidth * 0.1 });
        }

        for (const item in this.X5Images) {
            console.log(this.X5Images[item]);
            TweenMax.set(this.X5Images[item], { autoAlpha: 0, x: window.innerWidth * 0.1 });
        }

        TweenMax.set([this.$XMenColorList, this.$X5ColorList], { autoAlpha: 0, y: window.innerWidth * 0.025 });

        TweenMax.set([this.$PagingX5, this.$PagingXmen], { autoAlpha: 0, y: window.innerWidth * 0.015 });
    }

    GetNext(type = "xmen") {
        if (type == "xmen") {
            for (const [key, value] of Object.entries(this.MATCHING_INFO)) {
                if (value.page === this.OldMatching.page + 1 && value.name == "xmen") {
                    this.isAnimating = true;
                    this.CurrentMatching = Object.assign({}, value);
                    this.$SwitchColorXmenBtn.removeClass("active");
                    $(`.color-item.xmen[data-target=${key}]`).addClass("active");
                    this.DoSwitchAnimation();
                }
            }
        } else {
            for (const [key, value] of Object.entries(this.MATCHING_INFO)) {
                if (value.page === this.OldMatching.page + 1 && value.name == "x5") {
                    this.isAnimating = true;
                    this.CurrentMatching = Object.assign({}, value);
                    this.$SwitchColorX5Btn.removeClass("active");
                    $(`.color-item.x5[data-target=${key}]`).addClass("active");
                    this.DoSwitchAnimation();
                }
            }
        }
    }

    GetPrev(type = "xmen") {
        if (type == "xmen") {
            for (const [key, value] of Object.entries(this.MATCHING_INFO)) {
                if (value.page === this.OldMatching.page - 1 && value.name === "xmen") {
                    this.isAnimating = true;
                    this.CurrentMatching = Object.assign({}, value);
                    this.$SwitchColorXmenBtn.removeClass("active");
                    $(`.color-item.xmen[data-target=${key}]`).addClass("active");
                    this.DoSwitchAnimation();
                }
            }
        } else {
            for (const [key, value] of Object.entries(this.MATCHING_INFO)) {
                if (value.page === this.OldMatching.page - 1 && value.name === "x5") {
                    this.isAnimating = true;
                    this.CurrentMatching = Object.assign({}, value);
                    this.$SwitchColorX5Btn.removeClass("active");
                    $(`.color-item.x5[data-target=${key}]`).addClass("active");
                    this.DoSwitchAnimation();
                }
            }
        }
    }
}