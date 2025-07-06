
// $("h1").css("color", "red");

// $("h1").text("Bye");

// $("h1").html("<em>Bye</em>");

$("a").attr("href", "https://www.bing.com");

$("h1").click(function() {
    $("h1").css("color", "purple");
});

// for( var i=0; i < 5; i++) {
//     document.querySelectorAll("button")[i].addEventListener("click", function() {
//         document.querySelector("h1").style.color = "blue";
//     });
// }

// this can be done through jQuery

// $("button").click(function() {
//     $("h1").css("color", "purple");
// });

$(document).keypress(function(event) {
    $("h1").text(event.key);
});

// $("button").click(function() {    
//     $("h1").fadeToggle(); //fadeOut fadwIn
// });

$("button").click(function() {    
    $("h1").slideToggle(); //slideOut slideIn
});

// $("button").on("click",function() {    
//     $("h1").animate({opacity: 0.5});  // only numeric values can be animated
// });

// $("button").click(function() {    
//     $("h1").slideUP().slideDown().animate({opacity: 0.5}); 
// });