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

var navbar = {
    display: true,
    init: function() {
        var options = [
            {
                selector: '.carousel',
                offset: 1000,
                callback: function(el) {
                    Materialize.toast("This is our ScrollFire Demo!", 1500 );
                }
            },
            {
                selector: '.carousel',
                offset: 1500,
                callback: function(el) {
                    Materialize.toast("Please continue scrolling!", 1500 );
                }
            },
        ];
        Materialize.scrollFire(options);
        var disso = navbar.dissolve();
        $(window).on('scroll', function() {
            if (disso) {
                clearTimeout(disso);
                disso = undefined;
            }
            var offset = $(this).scrollTop() - $('.carousel').height();
            if (offset > 0) {
                $('#navigation').removeClass('float');
            } else {
                $('#navigation').addClass('float');
            }
            navbar.show();
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                offset > 0 ? navbar.show() : navbar.hide();
            }, 2050));
        });
    },
    dissolve: function() {
        navbar.show();
        return setTimeout(navbar.hide, 2000);
    },
    hide: function() {
        if (navbar.display) {
            $("#navigation").fadeOut('slow');
            navbar.display = false;
        }
    },
    show: function() {
        if (!navbar.display) {
            $("#navigation").fadeIn('fast');
            navbar.display = true;
        }
    }
};



$(document).ready(function() {
    $('.button-collapse').sideNav();
    carousel.init();
    navbar.init();
});
