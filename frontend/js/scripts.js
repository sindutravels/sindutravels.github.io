var carousel = {
    autoplay: true,
    autoControl: undefined,
    init: function() {
        $('.carousel').carousel({full_width: true, indicators: true});
        $('.slide-controller').click(function(ev) {
            ev.preventDefault();
            carousel.stopAutoPlay();
            if ($(this).hasClass('prev')) carousel.prev();
            if ($(this).hasClass('next')) carousel.next();
        });
        if (carousel.autoplay) {
            carousel.autoControl = setInterval(function(){
                carousel.next();
            }, 5000);
        }
    },
    next: function() {
        $('.carousel').carousel('next');
    },
    prev: function() {
        $('.carousel').carousel('prev');
    },
    stopAutoPlay: function() {
        if (carousel.autoControl) {
            clearInterval(carousel.autoControl);
            carousel.autoControl = undefined;
        }
    }

};



$(document).ready(function() {
    $('.button-collapse').sideNav();
    carousel.init();
});
