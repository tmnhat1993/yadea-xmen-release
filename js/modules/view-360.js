import { pageListener } from './utils'
export default class View360 {
    /* ===================================
     *  CONSTRUCTOR
     * =================================== */
    constructor() {
        window.ProductViewPageListener = new pageListener();

        // Elements Variables
        this.$ViewProductSection = $('#yadea-xmen-360-view');
        this.$MainContent = this.$ViewProductSection.find('.main-content');
        this.$MainContent_Context = this.$MainContent.find('> *');
        this.$ProductToggleBtn = this.$MainContent.find('.bike-selection .bike-item');
        this.$ProductSelectDecor = this.$MainContent.find('.bike-list .decor-line');
        this.$X5ViewBg = this.$ViewProductSection.find('#x5-360-bg');
        this.$XmenViewBg = this.$ViewProductSection.find('#xmen-360-bg');
        this.$X5ViewGroup = $('#x5-product-360-view-group');
        this.$XMenViewGroup = $('#xmen-product-360-view-group');
        this.$X5NameImage = this.$ViewProductSection.find('.name-layer-back .x5-name');
        this.$XMenNameImage_Back = this.$ViewProductSection.find('.name-layer-back .xmen-name');
        this.$XMenNameImage_Front = this.$ViewProductSection.find('.name-layer-front .xmen-name');
        this.$NameFrontLayer = this.$ViewProductSection.find('.name-layer.name-layer-front')
        this.isReceiveInput = false;

        this.ViewX5ProductAnim = new TimelineMax({
            paused: true,
            onComplete: () => {
                this.blockInteraction = false;
                //Reset Xmen View
                this.ViewXmenProductAnim.stop();
                this.ViewXmenProductAnim.progress(0);
                //Reset Xmen Rotation Product
                $(`#xmen-product-360-view-group .image-item.active`).removeClass('active');
                $(`#xmen-product-360-view-group .image-item[data-image="1"]`).addClass('active');
            }
        });

        this.ViewXmenProductAnim = new TimelineMax({
            paused: true,
            onComplete: () => {
                this.blockInteraction = false;
                //Reset X5 View
                this.ViewX5ProductAnim.stop();
                this.ViewX5ProductAnim.progress(0);
                //Reset Xmen Rotation Product
                $(`#x5-product-360-view-group .image-item.active`).removeClass('active');
                $(`#x5-product-360-view-group .image-item[data-image="1"]`).addClass('active');
            }
        });


        this.MainAnimation = new TimelineMax({
            paused: true,
            onComplete: () => {
                this.ProductViewSetup();
                this.ProductToggleSetup();
            }
        });

        // Rotating Variables
        this.currentProd = 'xmen';
        this.DELAY_DISTANCE = IS_MOBILE ? 2 : 15;
        this.IMAGES_NO = 8;
        this.right_delay = 0;
        this.left_delay = 0;
        this.oldx = 0;
        this.blockInteraction = false;

        this.bindEvents();
    }

    /* ===================================
     *  EVENTS
     * =================================== */
    bindEvents() {
        this.InitSection();
        YADEAXmenListener.on('yadea-xmen-360-view-anim', () => {
            this.MainAnimation.play();
        })
    }

    /* ===================================
     *  METHODS
     * =================================== */
    SwitchToProduct(product = "xmen") {
        switch (product) {
            case 'xmen':
                this.ViewXmenProductAnim.play();
                break;
            case 'x5':
                this.ViewX5ProductAnim.play();
                break;
        }
    }

    InitSection() {
        //Init State
        TweenMax.set(this.$MainContent_Context, { autoAlpha: 0, y: window.innerWidth * 0.02 });
        TweenMax.set([this.$X5ViewGroup, this.$XMenViewGroup], { autoAlpha: 0, x: window.innerWidth * 0.075 })
        TweenMax.set([this.$X5NameImage, this.$XMenNameImage_Front], { autoAlpha: 0, x: -window.innerWidth * 0.075 });
        TweenMax.set(this.$XMenNameImage_Back, { autoAlpha: 0, x: window.innerWidth * 0.075 });
        TweenMax.set([this.$X5ViewBg, this.$XmenViewBg], { autoAlpha: 0, scale: 1.1 });

        //Animation Build
        // Main Animation Fade In - Start With XMEN
        this.MainAnimation.add('anim-start');
        this.MainAnimation.to(this.$XmenViewBg, 0.75, { autoAlpha: 1, scale: 1 }, 'anim-start');
        this.MainAnimation.staggerTo(this.$MainContent_Context, 0.5, { autoAlpha: 1, y: 0 }, 0.2, 'anim-start');
        this.MainAnimation.to([this.$XMenNameImage_Front, this.$XMenNameImage_Back], 0.5, { autoAlpha: 1, x: 0 })
        this.MainAnimation.to(this.$XMenViewGroup, 0.5, { autoAlpha: 1, x: 0 }, '-=0.3');


        // Animation To X5
        this.ViewX5ProductAnim.add('anim-start')
            // Xmen out
        this.ViewX5ProductAnim.to(this.$XmenViewBg, 0.5, { autoAlpha: 0, scale: 1.1 }, 'anim-start')
        this.ViewX5ProductAnim.to([this.$XMenNameImage_Front, this.$XMenViewGroup], 0.5, { autoAlpha: 0, x: -window.innerWidth * 0.075 }, 'anim-start')
        this.ViewX5ProductAnim.to(this.$XMenNameImage_Back, 0.5, { autoAlpha: 0, x: window.innerWidth * 0.075 }, 'anim-start');
        //X5 In
        this.ViewX5ProductAnim.to(this.$X5ViewBg, 0.75, { autoAlpha: 1, scale: 1 }, 'anim-start+=0.25');
        this.ViewX5ProductAnim.to(this.$X5NameImage, 0.5, { autoAlpha: 1, x: 0 });
        this.ViewX5ProductAnim.to(this.$X5ViewGroup, 0.5, { autoAlpha: 1, x: 0 }, '-=0.3');

        // Animation To Xmen
        this.ViewXmenProductAnim.add('anim-start');
        // X5 Out
        this.ViewXmenProductAnim.to(this.$X5ViewBg, 0.5, { autoAlpha: 0, scale: 1.1 }, 'anim-start');
        this.ViewXmenProductAnim.to(this.$X5NameImage, 0.5, { autoAlpha: 0, x: window.innerWidth * 0.075 }, 'anim-start');
        this.ViewXmenProductAnim.to(this.$X5ViewGroup, 0.5, { autoAlpha: 0, x: -window.innerWidth * 0.075 }, 'anim-start');
        // Xmen In
        this.ViewXmenProductAnim.to(this.$XmenViewBg, 0.75, { autoAlpha: 1, scale: 1 }, 'anim-start+=0.25');
        this.ViewXmenProductAnim.to([this.$XMenNameImage_Front, this.$XMenNameImage_Back], 0.75, { autoAlpha: 1, x: 0 });
        this.ViewXmenProductAnim.fromTo(this.$XMenViewGroup, 0.5, { autoAlpha: 0, x: window.innerWidth * 0.075 }, { autoAlpha: 1, x: 0 }, '-=0.5');

    }

    ProductToggleSetup() {
        this.$ProductToggleBtn.on('click', (e) => {
            // Get Correct element
            let $clickTarget = $(e.target);
            if ($clickTarget.parents('.bike-item').length > 0) {
                $clickTarget = $clickTarget.parents('.bike-item')
            }

            if (!$clickTarget.hasClass('active')) {
                // Block Interaction 
                this.blockInteraction = true;

                // Button Process
                let dataTarget = $clickTarget.data('bike');
                this.currentProd = dataTarget;
                this.$ProductToggleBtn.removeClass('active');
                $clickTarget.addClass('active');
                this.$ProductSelectDecor.removeClass('active-xmen active-x5');
                this.$ProductSelectDecor.addClass(`active-${this.currentProd}`);

                // Do the animation
                this.SwitchToProduct(this.currentProd);
            }
        })
    }

    ProductViewSetup() {
        // Mouse Down, Start Receive Input
        this.$ViewProductSection.on('mousedown touchstart', (e) => {
            if (!this.blockInteraction) {
                this.isReceiveInput = true;
                this.oldx = e.pageX;

                this.$NameFrontLayer.css('z-index', '1');
            }
        });

        // Mouse up, stop receive input
        this.$ViewProductSection.on('mouseup touchend', (e) => {
            this.isReceiveInput = false;
            this.$NameFrontLayer.css('z-index', '3');
        });

        this.$ViewProductSection.on("mousemove touchmove", (e) => {
            let pageX = e.pageX
            if (e.originalEvent.touches) {
                let touch = e.originalEvent.touches[0];
                pageX = touch.pageX;
            }
            if (this.isReceiveInput) {
                if (pageX > this.oldx) {
                    ProductViewPageListener.emit('right');

                } else if (pageX < this.oldx) {
                    ProductViewPageListener.emit('left');
                }

                this.oldx = pageX;
            }
        });

        ProductViewPageListener.on('right', () => {
            if (this.right_delay >= this.DELAY_DISTANCE) {
                this.right_delay = 0;
                let $currentActive = $(`#${this.currentProd}-product-360-view-group .image-item.active`);
                let currentCount = $currentActive.data('image');
                let nextCount = currentCount + 1;
                if (currentCount == this.IMAGES_NO) {
                    nextCount = 1
                }
                $(`#${this.currentProd}-product-360-view-group .image-item[data-image="${currentCount}"]`).removeClass('active');
                $(`#${this.currentProd}-product-360-view-group .image-item[data-image="${nextCount}"]`).addClass('active');
            } else {
                this.right_delay += 1;
            }
        })

        ProductViewPageListener.on('left', () => {
            if (this.left_delay >= this.DELAY_DISTANCE) {
                this.left_delay = 0;
                let $currentActive = $(`#${this.currentProd}-product-360-view-group .image-item.active`);
                let currentCount = $currentActive.data('image');
                let nextCount = currentCount - 1;
                if (nextCount == 0) {
                    nextCount = this.IMAGES_NO;
                }
                $(`#${this.currentProd}-product-360-view-group .image-item[data-image="${currentCount}"]`).removeClass('active');
                $(`#${this.currentProd}-product-360-view-group .image-item[data-image="${nextCount}"]`).addClass('active');
            } else {
                this.left_delay += 1;
            }
        })
    }
}