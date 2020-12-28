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
function openUSGSAPI(USGS,callback){
    var magnitude = 8.4
    var xhr = new XMLHttpRequest();
    var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=1727-11-10&endtime=2020-12-31&minmagnitude=";
    xhr.open("GET",url + magnitude);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            callback(data);
          };
    }
}
function printGratestData(USGS) {
    
    $('#greatest-data').html("")

    openUSGSAPI(USGS, function(data){
        console.log(data);
        data=data.features;
        $('#greatest-data').html("<table class='table-active'><thead><tr><th rowspan='2'>Magnitude</th> <th rowspan='2'>Place</th><th rowspan='2'>Date</th><th colspan='2'>Coordinates</th></tr><tr><th>Longitude</th><th>Latitude</th></tr></thead></table>")
        data.forEach(function(item) {
            document.getElementById('greatest-data').innerHTML += "<table><tr><td>" +item.properties.mag+"</td>"+"<td>"+item.properties.place+"</td>"+"<td>"
            + (new Date(item.properties.time)).toLocaleDateString() +"</td>"+"<td>"+ item.geometry.coordinates[0]+ "</td><td>" +item.geometry.coordinates[1]+"</td></tr></table>"
        });
    console.log(data.length);
    $('#loading_data').html("")

    })
}