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


////////////////////////////////////////////
//  Animate the scroll to top
///////////////////////////////////////////


    /*$(function () {
     $('.scroll[href*=#]:not([href=#])').click(function () {
     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
     var target = $(this.hash);
     target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
     if (target.length) {
     $('html,body').animate({
     scrollTop: target.offset().top
     }, 1000);
     return false;
     }
     }
     });
     });*/


/////////////////////////////////////
//  Sticky Header
/////////////////////////////////////

    if (windowWidth > tabletWidth) {

        $('.header').affix({
            offset: 50
        })

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
        animation: 'fade', 		   //String: Select your animation type, "fade" or "slide"
        controlNav: false,   	  //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
        directionNav: true,		 //Boolean: Create navigation for previous/next navigation? (true/false)
        slideshowSpeed: 7000,   //Integer: Set the speed of the slideshow cycling, in milliseconds
        animationSpeed: 600,   //Integer: Set the speed of animations, in milliseconds
        pauseOnHover: true,   //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
        prevText: "",        //String: Set the text for the "previous" directionNav item
        nextText: "",		//String: Set the text for the "next" directionNav item

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
    }, {
        triggerOnce: true,
        offset: '90%'
    });

/////////////////////////////////////////////////////////////////
// Accordion
/////////////////////////////////////////////////////////////////

    /* $(".btn-collapse").on('click', function () {
     $(this).parents('.panel-group').children('.panel').removeClass('panel-default');
     $(this).parents('.panel').addClass('panel-default');
     if ($(this).is(".collapsed")) {
     $('.panel-title').removeClass('panel-passive');
     }
     else {
     $(this).next().toggleClass('panel-passive');
     }
     ;
     });*/


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

    $('.jelect').select2();

});


/////////////////////////////////////////////////////////////////
// Animated WOW
/////////////////////////////////////////////////////////////////
new WOW().init();
