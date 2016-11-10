function init_map() {

    var location = new google.maps.LatLng(9.42073984, 76.34804964);

    var mapoptions = {
        center: location,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Sindu Travels"
    });

    var map = new google.maps.Map(document.getElementById("map-container"), mapoptions);

    marker.setMap(map);

    var infowindow = new google.maps.InfoWindow({
       content: "Sindu Travels <br/> 04772282666 <br/> +91-9447896784"
    });


    google.maps.event.addListener(marker, 'click', function() {
       infowindow.open(map, marker);
    });

}

function navigation() {
    var offset = $('nav.navbar').height() + 15;
    $('.nav-link').click(function(ev) {
        ev.preventDefault();
        $('.nav-item').removeClass('active');
        $(this).parent().addClass('active');
        var elem = "#" + $(this).data('target');
        scroll_to($(elem).offset() ? $(elem).offset().top - offset : 0);
    });
    $('.footer-nav-link').click(function(ev) {
        ev.preventDefault();
        var target = ".nav-link." + $(this).data('target');
        $(target).click();
    });
}

function scroll_to(pos) {
    $('html, body').animate({
        scrollTop: pos
    }, 1000);
}

$(document).ready(function() {
    // initialise animations
    new WOW().init();
    google.maps.event.addDomListener(window, 'load', init_map);
    navigation();
});

