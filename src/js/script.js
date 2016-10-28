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

$(document).ready(function() {
    // initialise animations
    new WOW().init();
    google.maps.event.addDomListener(window, 'load', init_map);
});

