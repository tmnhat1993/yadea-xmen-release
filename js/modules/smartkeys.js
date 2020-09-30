export default class SmartKey {
    /* ===================================
     *  CONSTRUCTOR
     * =================================== */
    constructor() {
        // Elements Variables
        this.$SmartkeySection = $("#yadea-xmen-smartkey");
        this.$SmartkeyMainContent = this.$SmartkeySection.find(".main-content");
        this.$SmartkeyMainContent_Context = this.$SmartkeyMainContent.find("> *");

        // Smartkey Elements
        this.$SmartkeyEffect = this.$SmartkeySection.find(".effect-holder");
        this.$RemoteControl = this.$SmartkeyEffect.find(".remote-control");
        this.$RemoteControl_Image = this.$SmartkeyEffect.find(".remote-image");
        this.$RemoteControl_Wave1 = this.$SmartkeyEffect.find(".remote-effect.effect-1");
        this.$RemoteControl_Wave2 = this.$SmartkeyEffect.find(".remote-effect.effect-2");

        this.$BikeImage = this.$SmartkeySection.find(".bike-image");
        this.$BikeImage_Bike = this.$SmartkeySection.find(".main-bike-img");
        this.$BikeImage_Shadow = this.$SmartkeySection.find(".bike-shadow-img");

        // Main Appear Timeline
        this.SmartKeyTimeline = new TimelineMax({
            paused: true,
            onComplete: () => {
                this.SmartKeyAnimationSetup();
            },
        });

        this.SmartKeyEffectTimeline = new TimelineMax({
            paused: true,
            repeat: -1,
            delay: 0.4,
            repeatDelay: 1.5,
        });

        this.bindEvents();
    }

    /* ===================================
     *  EVENTS
     * =================================== */
    bindEvents() {
        this.InitSection();

        YADEAXmenListener.on("yadea-xmen-smartkey-anim", () => {
            // TweenMax.staggerTo(this.$PowerMainContent_Context, 0.5, { autoAlpha: 1, y: 0 }, 0.2);
            this.SmartKeyTimeline.play();
        });
    }

    /* ===================================
     *  METHODS
     * =================================== */
    InitSection() {
        // Init First State
        TweenMax.set(this.$SmartkeyMainContent_Context, { autoAlpha: 0, y: window.innerWidth * 0.02 });
        TweenMax.set([this.$RemoteControl_Wave1, this.$RemoteControl_Wave2], { autoAlpha: 0, scale: 0.5 });
        TweenMax.set(this.$BikeImage_Shadow, { autoAlpha: 0 });
        TweenMax.set(this.$RemoteControl_Image, { autoAlpha: 0, y: window.innerWidth * 0.02 });
        TweenMax.set(this.$BikeImage_Bike, { autoAlpha: 0, y: -window.innerWidth * 0.05 });

        // Build Init Timeline
        this.SmartKeyTimeline.add("anim-start");
        this.SmartKeyTimeline.staggerTo(this.$SmartkeyMainContent_Context, 0.5, { autoAlpha: 1, y: 0 }, 0.2, "anim-start");
        this.SmartKeyTimeline.to(this.$BikeImage_Bike, 0.75, { autoAlpha: 1, y: 0 }, "anim-start+=0.7");
        this.SmartKeyTimeline.to(this.$BikeImage_Shadow, 0.5, { autoAlpha: 0.15 }, "anim-start+=1");
        this.SmartKeyTimeline.to(this.$RemoteControl_Image, 0.5, { autoAlpha: 1, y: 0 }, "-=0.1");

        // Build Smartkey Effect Anim
        this.SmartKeyEffectTimeline.add("anim-start");
        this.SmartKeyEffectTimeline.fromTo(
            this.$RemoteControl_Wave1,
            0.3, { autoAlpha: 0, scale: 0.5, ease: Power0.easeNone }, { autoAlpha: 1, scale: 1, ease: Power0.easeNone },
            "anim-start"
        );
        this.SmartKeyEffectTimeline.to(
            this.$RemoteControl_Wave1,
            0.6, { autoAlpha: 0, scale: 2, ease: Power0.easeNone },
            "anim-start+=0.3"
        );

        this.SmartKeyEffectTimeline.fromTo(
            this.$RemoteControl_Wave2,
            0.3, { autoAlpha: 0, scale: 0.5, ease: Power0.easeNone }, { autoAlpha: 1, scale: 1, ease: Power0.easeNone },
            "anim-start+=0.3"
        );
        this.SmartKeyEffectTimeline.to(
            this.$RemoteControl_Wave2,
            0.6, { autoAlpha: 0, scale: 2, ease: Power0.easeNone },
            "anim-start+=0.6"
        );

        this.SmartKeyEffectTimeline.to(this.$BikeImage_Shadow, 0.3, { autoAlpha: 1 }, '-=0.4');
        this.SmartKeyEffectTimeline.to(this.$BikeImage_Shadow, 0.3, { autoAlpha: 0.5 });
        this.SmartKeyEffectTimeline.to(this.$BikeImage_Shadow, 0.3, { autoAlpha: 1 });
        this.SmartKeyEffectTimeline.to(this.$BikeImage_Shadow, 0.3, { autoAlpha: 0.5 });
        this.SmartKeyEffectTimeline.to(this.$BikeImage_Shadow, 0.3, { autoAlpha: 1 });
        this.SmartKeyEffectTimeline.to(this.$BikeImage_Shadow, 0.3, { autoAlpha: 0.15 });
    }

    SmartKeyAnimationSetup() {
        this.SmartKeyEffectTimeline.play();
    }
}