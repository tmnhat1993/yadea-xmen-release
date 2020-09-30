// Libraries And Utils
import ScrollOut from "scroll-out";
import TweenMax from "gsap";
import { pageListener } from "./utils";

// Common Bahavior
import Common from "./common";
import SignUpInfo from './_signup-info';

// SECTIONS
import Banner from "./banner";
import Slogan from "./slogan";
import Color from "./colors";
import Battery from "./battery";
import Distance from "./distance";
import Power from "./power";
import Features from "./features";
import SmartKey from "./smartkeys";
import Maintain from "./maintain";
import Brake from "./brake";
import Comparision from "./comparision";
import Gallery from "./gallery";
import View360 from "./view-360";

export default class Demo {
    /* ===================================
     *  CONSTRUCTOR
     * =================================== */
    constructor() {
        // Device Detect id < 768px
        window.IS_MOBILE = window.innerWidth <= 768;
        $(window).on("resize", () => {
            window.IS_MOBILE = window.innerWidth <= 768;
        });

        // Global TweenMax Object
        window.TweenMax = TweenMax;

        // Page Listener
        window.YADEAXmenListener = new pageListener();

        // Common Behavior
        let common = new Common();
        let signupInfo = new SignUpInfo();

        // Section Behaviors
        let banner = new Banner();
        let slogan = new Slogan();
        let color = new Color();
        let battery = new Battery();
        let distance = new Distance();
        let power = new Power();
        let features = new Features();
        let smartkey = new SmartKey();
        let brake = new Brake();
        let maintain = new Maintain();
        let comparision = new Comparision();
        let view360 = new View360();
        let gallery = new Gallery();

        this.bindEvents();
    }

    /* ===================================
     *  EVENTS
     * =================================== */
    bindEvents() {
        // Page Listener on Scroll
        this.ScrollOutSetup();
    }

    /* ===================================
     *  METHODS
     * =================================== */
    ScrollOutSetup() {
        ScrollOut({
            onShown: (el) => {
                // use the web animation API
                let elementID = $(el).attr("id");

                // Emit event when section inside the view
                YADEAXmenListener.emit(`${elementID}-anim`);
            },
            onHidden: (el) => {
                let elementID = $(el).attr("id");

                // Emit event when section out of the view
                YADEAXmenListener.emit(`${elementID}-hide`);
            },
            threshold: 0.125,
        });

        ScrollOut({
            targets: ".custom-header",
            offset: 50,
        });
    }
}