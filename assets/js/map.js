// seperate js file for a map

var mymap = L.map('mapid', {
    center: [52.0500000, -9.5166700],
    zoom: 2,
    
    });

L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}{r}.png?apikey=5f689cbf6660484fa5c1a63e197f6d32', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> , Maps © <a href="http://www.thunderforest.com/">thunderforest</a>',
    maxZoom: 18,
    tileSize: 256,
}).addTo(mymap);