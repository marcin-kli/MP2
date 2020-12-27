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

    var xhr = new XMLHttpRequest();
    var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=1727-11-10&endtime=2020-12-31&minmagnitude=8";
    xhr.open("GET",url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            data = JSON.parse(this.responseText);
            // cb(data);
            console.log(data);
            
          };
    }