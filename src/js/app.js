/*
 | ----------------------------------------------------------------------------------
 | TABLE OF CONTENT
 | ----------------------------------------------------------------------------------
 -SETTING
 -Sticky Header
 -Dropdown Menu Fade
 -Animated Entrances
 -Accordion
 -Filter accordion
 -Chars Start
 -Ð¡ustomization select
 -Zoom Images
 -HOME SLIDER
 -CAROUSEL PRODUCTS
 -PRICE RANGE
 -SLIDERS
 -Animated WOW
 */


$(document).ready(function () {

    "use strict";

/////////////////////////////////////////////////////////////////
// SETTING
/////////////////////////////////////////////////////////////////

    var windowHeight = $(window).height();
    var windowWidth = $(window).width();


    var tabletWidth = 767;
    var mobileWidth = 640;

    $(function () {
        objectFitImages()
    });

////////////////////////////////////////////
//  Animate the scroll to top
///////////////////////////////////////////

    $('.scroll').on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });

/////////////////////////////////////
//  Sticky Header
/////////////////////////////////////

    if (windowWidth > tabletWidth) {
        $('.header').affix({
            offset: 50
        });

        $('.header').on('affix.bs.affix', function () {
            $('.header').addClass("animated");
            $('.header').addClass("bounce");
        });

        $('.header').on('affixed-top.bs.affix', function () {
            $('.header').removeClass("bounce");
            $('.header').removeClass("animated");
            $('.header').removeClass("animation-done");
        });
    }

    /////////////////////////////////////
    //  HOME PAGE SLIDER
    /////////////////////////////////////

    $('.main-slider').flexslider({
        animation: 'fade', 		//String: Select your animation type, "fade" or "slide"
        controlNav: false,   	//Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
        directionNav: true,		//Boolean: Create navigation for previous/next navigation? (true/false)
        slideshowSpeed: 7000,   //Integer: Set the speed of the slideshow cycling, in milliseconds
        animationSpeed: 600,    //Integer: Set the speed of animations, in milliseconds
        pauseOnHover: true,     //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
        prevText: "",           //String: Set the text for the "previous" directionNav item
        nextText: "",		    //String: Set the text for the "next" directionNav item
        useCSS: true,           //{NEW} Boolean: Slider will use CSS3 transitions if available
        touch: true,            //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
        pauseInvisible: true,   //{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.

        before: function (slider) {
            $(slider).find(".flex-active-slide").find('.flex-caption').each(function () {
                $(this).removeClass("animated fadeInRight");
                $(this).addClass("animated fadeOut");
            });
        },
        after: function (slider) {
            $(slider).find(".flex-active-slide").find('.flex-caption').removeClass("animated fadeOut").addClass("animated fadeInRight");
        },
    });

/////////////////////////////////////
//  Disable Mobile Animated
/////////////////////////////////////

    if (windowWidth < mobileWidth) {
        $("body").removeClass("animated-css");
    }


    $('.animated-css .animated:not(.animation-done)').waypoint(function () {
        var animation = $(this).data('animation');
        $(this).addClass('animation-done').addClass(animation);

        new WOW().init();
    }, {
        triggerOnce: true,
        offset: '90%'
    });

/////////////////////////////////////
//  Chars Start
/////////////////////////////////////

    if ($('body').length) {
        $(window).on('scroll', function () {
            var winH = $(window).scrollTop();

            $('.list-progress').waypoint(function () {
                $('.chart').each(function () {
                    CharsStart();
                });
            }, {
                offset: '80%'
            });
        });
    }

    function CharsStart() {
        $('.chart').easyPieChart({
            barColor: false,
            trackColor: false,
            scaleColor: false,
            scaleLength: false,
            lineCap: false,
            lineWidth: false,
            size: false,
            animate: 7000,

            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });

    }

/////////////////////////////////////////////////////////////////
// Customization select
/////////////////////////////////////////////////////////////////

    $('.jelect').select2({
        theme: "netcar",
        minimumResultsForSearch: 5
    });

/////////////////////////////////////////////////////////////////
// Customization datepicker
/////////////////////////////////////////////////////////////////

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        weekStart: 1,
        startDate: tomorrow,
        todayBtn: "linked",
        clearBtn: true,
        language: "it",
        orientation: "bottom auto"
    });

});
