$(document).ready(function(){

/** ===== Game slider ==== **/

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots: false,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
            nav:true
        },
        600:{
            items:4,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    }
})


/** ===== Signup country code with flag ==== **/

var input = document.querySelector("#phone");
window.intlTelInput(input, {
    separateDialCode: true,
    excludeCountries: ["in", "il"],
    preferredCountries: ["ru", "jp", "pk", "no"]
});

/** ===== Header Button on click Active ==== **/

$('.categoryBtn .gameBtn').on('click', function(){
    $('.categoryBtn button.active').removeClass('active');
    $(this).addClass('active');
});


/** ===== Money Custom Drop-Down ==== **/

$(document).ready(function() {
    $('#spell').prettyDropdown({
        afterLoad: function() {
        console.log('Spells are ready!');
        }
    });
});


$(".mobileSearchBtn").click(function(){
    $(".searchInput").toggleClass("mobileSearchInput");
});

/** ===== Progress Bar ==== **/

$('.progress-value > span').each(function(){
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    },{
        duration: 1500,
        easing: 'swing',
        step: function (now){
            $(this).text(Math.ceil(now));
        }
    });
});


});