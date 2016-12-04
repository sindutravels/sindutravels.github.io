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

function adjustCards(cards) {
    var height = 0;
    cards.each(function(idx, elem) {
        height = Math.max(height, $(elem).height());
    });
    if (height > 0) {
        cards.each(function(idx, elem) {
            $(elem).height(height);
        });
    }
}



function formHandler(button) {
    var form = $("#contact_form");
    var dataArray = form.serializeArray();
    var data = {};

    var resetForm = function () {
        form.find("textarea:visible").val("");
        form.find("input:visible").val("");
    };

    validateForm = function(data) {
        var error = false;
        if (!data.firstname) {
            error = true;
            $('input#fname').addClass('invalid');
            $('input#fname').siblings('label').addClass('active');
        }
        if (!data.email && !data.phone) {
            error=true;
            $('input#phone').addClass('invalid');
            $('input#phone').siblings('label').addClass('active');
        }
        if (!data.comments && !data.tripdetails) {
            error=true;
            $('textarea#comments').addClass('invalid');
            $('input#phone').siblings('label').addClass('active');
        }
        return !error;
    };

    $(dataArray).each(function(idx, item) {
        data[item.name] = item.value;
    });
    if (!validateForm(data)) {
        button.removeClass("disabled");
    } else {
        var today = new Date().toDateString();
        data._subject = data._subject +" by " + data.firstname.substring(0, 10) + " @ " + today;
        $.ajax({
            url: "https://formspree.io/ashiksujath2@gmail.com",
            method: "POST",
            data: data,
            dataType: "json",
            success: function(data) {
                $("#contactModal").modal('show');
                button.removeClass("disabled");
                resetForm();
            }
        });
    }
}

$(document).ready(function() {
    // initialise animations
    new WOW().init();
    // equilise card height
    adjustCards($("#best-features div.card-block"));
    adjustCards($("#best-features div.view"));
    $("#btn-submit-contact").click(function(ev) {
        ev.preventDefault();
        if ($(this).hasClass("disabled")) return;
        $(this).addClass("disabled");
        formHandler($(this));
    });
    google.maps.event.addDomListener(window, 'load', init_map);
    navigation();
});

