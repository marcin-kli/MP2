$(document).ready(function () {
    
    // hide all card bodys and map 
    $(".card-body").hide();
    $("#map").hide();

    //hide buttons and features
    $("#lastEarthquakesButton-back").hide();
    $("#greatestButton-back").hide();
    $("#knowledge-hide").hide();
    $("#customRange").hide();

    //show buttons to select on main page

    $("#knowledge-show").click(function(){
    $("#knowledge .card-body").toggle();
    })
});

    //open USGS API//
function openUSGSAPI(magnitude,callback){
    
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

 //display data from USGS API to the table
function printintable(magnitude){
    $('#datadisplay-table').html("");
    openUSGSAPI(magnitude, function(data){
        data=data.features;
        $('#datadisplay-table').html("<table class='table-active'><thead><tr><th rowspan='2'>Magnitude</th> <th rowspan='2'>Place</th><th rowspan='2'>Date</th><th colspan='2'>Coordinates</th></tr><tr><th>Longitude</th><th>Latitude</th></tr></thead></table>")
        data.forEach(function(item) {
            document.getElementById('datadisplay-table').innerHTML += "<table><tr><td>" +item.properties.mag+"</td>"+"<td>"+item.properties.place+"</td>"+"<td>"
            + (new Date(item.properties.time)).toLocaleDateString() +"</td>"+"<td>"+ item.geometry.coordinates[0]+ "</td><td>" +item.geometry.coordinates[1]+"</td></tr></table>"
        });
    console.log(data.length);
    $('#loadingData').html("")
    })
}

    //show 20 GREATEST EARTHQUAKES data
function showGratestData() {

    $('section').css('padding','0');
    $('section').css('margin-bottom','5vh');
    $('#lastEarthquakes').hide();
    $('#knowledge').hide();
    $("#greatestButton-show").hide();
    $("#greatestButton-back").show();
    $('#card-body').show();
    //print greatest earthquakes to table
    var magnitude = 8.4
    printintable(magnitude)
}

    //back button for 20 GREATEST EARTHQUAKES data
function hideGratestData(){

    $('#loadingData').html("<h1>LOADING</h1>");
    $('#card-body').hide();
    $("#greatestButton-show").show();
    $("#greatestButton-back").hide();
    $('#lastEarthquakes').show();
    $('#knowledge').show();
    $('section').css('padding','25vh 0');
    $('section').css('margin-bottom','0');
}

   //show LAST EARTHQUAKES data 
function showLastEarthquakesData(){
    
    $('section').css('padding','0');
    $('section').css('margin-bottom','5vh');
    $('#greatest').hide();
    $('#knowledge').hide();
    $("#lastEarthquakesButton-show").hide();
    $("#lastEarthquakesButton-back").show();
    $("#customdata").show();
}

    // select custom magnitude in custom search
function search(){
    $('#magnitudeCustom').val(0);
    var magnitude = $('input[name="magnitude"]:checked').val();
    if ((magnitude != "on") && (magnitude > 0)){
        magnitude = $("input[name='magnitude']:checked").val();
    } else {
        magnitude = $("#customRangeInput").val();
    }
    console.log(magnitude);
    $("#customdata").hide();
    $('#card-body').show();
    printintable(magnitude);
}

    //set "Custom" radio input to checked state in custom search @ LAST EARTHQUAKES
function setCustomMagnitude(){

     document.formcustomdata.magnitude[3].checked=true;
}

 //back button for LAST EARTHQUAKES data 
function hideLastEarthquakesData(){

    $('#loadingData').html("<h1>LOADING</h1>");
    $('#card-body').hide();
    $("#lastEarthquakesButton-show").show();
    $("#lastEarthquakesButton-back").hide();
    $('#greatest').show();
    $('#knowledge').show();
    $('section').css('padding','25vh 0');
    $('section').css('margin-bottom','0');
}