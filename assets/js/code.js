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

    //open USGS API//

    var magnitude = 8.4
    var xhr = new XMLHttpRequest();
    var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=1727-11-10&endtime=2020-12-31&minmagnitude=";
    xhr.open("GET",url + magnitude);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
          };
    }

function printGratestData() {

    data=data.features;
    data.forEach(function(item) { 
        document.getElementById('greatest-data').innerHTML += "<p>"+ item.properties.mag +"</p>"+
        "<p>"+ item.properties.place +"</p>"+"<p>"+ item.properties.time +"</p>"+"<p>"+ item.geometry.coordinates +"</p>"
    });
    console.log(data.length);
}