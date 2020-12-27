$(document).ready(function () {
    
    $("#map").hide();
    $(".card-body").hide();
    
    $("#last button").click(function(){
    $("#last .card-body").toggle();
    });

    $("#greatest button").click(function(){
    $("#greatest .card-body").toggle();
    });

    $("#knowledge button").click(function(){
    $("#knowledge .card-body").toggle();
  })
});