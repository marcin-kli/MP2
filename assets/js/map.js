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

// remove layer from the map
function removemap(){
    if (geoJsonLayer._initHooksCalled==true){
        geoJsonLayer.removeFrom(mymap);
    }   
}
 
// add data to the layer on the map https://leafletjs.com/reference-1.7.1.html#geojson
function getmap(){
    $('section').css('margin-top','7vh');
    $('section').css('padding','0');
    $('section').css('margin-bottom','5.5vh')
geoJsonLayer = L.geoJSON(data) .addTo(mymap);
geoJsonLayer.eachLayer(function(layer) {
   layer.bindPopup("Place: "+layer.feature.properties.place+"<br>Magnitude: "+layer.feature.properties.mag);
})
}
var marker;
function getpoint(ooo){
    $('section').css('margin-top','7vh');
    $('section').css('padding','0');
    $('section').css('margin-bottom','5.5vh')
    marker = L.marker([ooo[4].innerHTML, ooo[3].innerHTML]) .addTo(mymap);
    marker.bindTooltip(ooo[1].innerHTML);
}
function removemarker(){
    marker.remove();
}