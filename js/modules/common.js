import YouTubePlayer from "youtube-player";

export default class Home {
    /* ===================================
     *  CONSTRUCTOR
     * =================================== */
    constructor() {
        this.bindEvents();
    }

    /* ===================================
     *  EVENTS
     * =================================== */
    bindEvents() {
        this.PayModalSetup();

        // Sub Menu Toggle On Mobile
        if (window.innerWidth < 480) {
            this.SetupMbMenuToggle();
        }
        this.SmoothScrollingSetup();
    }

    /* ===================================
     *  METHODS
     * =================================== */
    SmoothScrollingSetup() {
        $('a[href*="#"]')
            // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function(event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
                    location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $("html, body").animate({
                                scrollTop: target.offset().top,
                            },
                            700,
                            function() {
                                // Callback after animation
                                // Must change focus!
                                var $target = $(target);
                                $target.focus();
                                if ($target.is(":focus")) {
                                    // Checking if the target was focused
                                    return false;
                                } else {
                                    $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                                    $target.focus(); // Set focus again
                                }
                            }
                        );
                    }
                }
            });
    }

    // Mobile Menu Toggle
    SetupMbMenuToggle() {
        this.allowToggle = true;
        this.$closeSubMenuBtn = $(".close-sub-menu");
        this.$menuToggleButton = $(".sub-menu-toggler");
        this.$subHeader = $(".custom-header");
        this.$subMenu = $(".sub-menu-main");

        this.$menuToggleButton.on("click", (e) => {
            if (this.allowToggle) {
                // After 300ms, allow Toggle back to true
                this.allowToggle = false;
                setTimeout(() => {
                    this.allowToggle = true;
                }, 300);

                if (!this.$subHeader.hasClass("showing-sub-menu")) {
                    this.$subHeader.addClass("showing-sub-menu");
                    this.$subMenu.slideDown("fast");
                } else {
                    this.$subHeader.removeClass("showing-sub-menu");
                    this.$subMenu.slideUp("fast");
                }
            }
        });

        this.$closeSubMenuBtn.on("click", (e) => {
            if (this.allowToggle) {
                // After 300ms, allow Toggle back to true
                this.allowToggle = false;
                setTimeout(() => {
                    this.allowToggle = true;
                }, 300);

                this.$subHeader.removeClass("showing-sub-menu");
                this.$subMenu.slideUp("fast");
            }
        });
    }

    // Tragop Modal
    PayModalSetup() {
        this.$payModal = $(".tra-gop-information-modal");
        this.$openPayModalBtn = $(".open-tragop-modal");
        this.$closePayModalBtn = $(".close-tragop-modal");

        this.$openPayModalBtn.on("click", () => {
            $("body").addClass("show-modal");
            this.$payModal.addClass("active");
        });

        this.$closePayModalBtn.on("click", () => {
            $("body").removeClass("active");
            this.$payModal.removeClass("active");
        });
    }
}