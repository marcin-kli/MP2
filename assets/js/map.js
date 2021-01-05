// seperate js file for a map
// get map API
var mymap = L.map('mapid', {
    center: [21.8358, 33.4233],
    zoom: 2,
    
    });

L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}{r}.png?apikey=5f689cbf6660484fa5c1a63e197f6d32', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> , Maps © <a href="http://www.thunderforest.com/">thunderforest</a>',
    minZoom: 2,
    maxZoom: 11,
    tileSize: 256,
}).addTo(mymap);

 var marker="";
 var geoJsonLayer="";

// add data to the layer on the map https://leafletjs.com/reference-1.7.1.html#geojson
function getmap(){
    $('section').css('margin-top','7vh');
    $('section').css('padding','0');
    $('section').css('margin-bottom','5.5vh')
geoJsonLayer = L.geoJSON(data) .addTo(mymap);
geoJsonLayer.eachLayer(function(layer) {
   
   layer.bindTooltip("Place: "+layer.feature.properties.place+"<br>Magnitude: "+layer.feature.properties.mag+"<br>Date: "+(new Date(layer.feature.properties.time)).toISOString().substring(0, 10));
})
}

function getpoint(ooo){
    $('section').css('margin-top','7vh');
    $('section').css('padding','0');
    $('section').css('margin-bottom','5.5vh')
    marker = L.marker([ooo[4].innerHTML, ooo[3].innerHTML]) .addTo(mymap);
    
    mymap.setView([ooo[4].innerHTML, ooo[3].innerHTML],3, {
        animate: true,
        duration: 4
        });
        //mymap.setView([ooo[4].innerHTML, ooo[3].innerHTML],6, {animate:true, duration:10.0});
    marker.bindTooltip("Place: "+ooo[1].innerHTML+"<br>Magnitude: "+ooo[2].innerHTML+"<br>Date: "+ooo[0].innerHTML);
}
// remove layer from the map
function removemap(){
    if (geoJsonLayer._initHooksCalled==true){
        geoJsonLayer.removeFrom(mymap);
    } 
    if(marker._initHooksCalled==true){
         marker.remove(mymap);
    }
}