const currentDay = (new Date());
console.log(currentDay);

$(document).ready(function () {
    
    // hide all card bodys and map 
    $(".card-body").hide();
    $("#map").hide();

    //hide buttons and features
    $("#lastEarthquakesButton-back").hide();
    $("#greatestButton-back").hide();
    $("#knowledge-hide").hide();
    $("#customRange").hide();
    $("#customTime").hide();

    //show buttons to select on main page

    $("#knowledge-show").click(function(){
    $("#knowledge .card-body").toggle();
    })

    //date settings
    document.getElementById("datefrom").defaultValue = "2020-11-10";
    document.getElementById("dateuntil").defaultValue = currentDay.getFullYear()+"-0"+(currentDay.getMonth()+1)+"-0"+currentDay.getDate(); 
});

    //open USGS API//
function openUSGSAPI(magnitude, previousDay, callback){
var xhr = new XMLHttpRequest();
var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=";
xhr.open("GET",`${url + previousDay}&${currentDay}&minmagnitude=${magnitude}`);
xhr.send();
xhr.onreadystatechange = function () {
if (this.readyState == 4 && this.status == 200) {
data = JSON.parse(this.responseText);
callback(data);
};
}
}

 //display data from USGS API to the table
function printintable(magnitude, previousDay){
$('#datadisplay-table').html("");
openUSGSAPI(magnitude, previousDay, function(data){
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
    var previousDay="1727-11-10";
    printintable(magnitude, previousDay)
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
    
    //set magnitude
    $('#magnitudeCustom').val(0);
    var magnitude = $('input[name="magnitude"]:checked').val();
    if ((magnitude != "on") && (magnitude > 0)){
        magnitude = $("input[name='magnitude']:checked").val();
    } else {
        magnitude = $("#customRangeInput").val();
    }
    console.log(magnitude);

    //set time to last 24 hours
    //One day (24 hours) = 86 400 000 milliseconds
    const oneday = 86400000;
    var previousDay = new Date();
    console.log("date "+previousDay);

    if (document.formcustomdata.time[0].checked==true){
        //getTime() change to milliseconds
        previousDay= (new Date(previousDay.getTime()-oneday)).toLocaleDateString();
        console.log("date - 24 "+previousDay);
    }
    else if (document.formcustomdata.time[1].checked==true){
        previousDay= (new Date(previousDay.getTime()-oneday*7)).toLocaleDateString();
    }
    else if (document.formcustomdata.time[2].checked==true){
        previousDay= (new Date(previousDay.getTime()-oneday*30)).toLocaleDateString();
        //hide magnitude 2.5 here
    }
    else if (document.formcustomdata.time[3].checked==true){
        previousDay= "custom";
    }
    
    $("#customdata").hide();
    $('#card-body').show();
    $('#loadingData').html("<h1>LOADING</h1>");
    printintable(magnitude, previousDay);
}

    //set "Custom" radio input to checked state in custom search @ LAST EARTHQUAKES
function setCustomMagnitude(){

     document.formcustomdata.magnitude[3].checked=true;
}
    //disable magnitude + 2.5 for 30 days or custom option
function disableMagnitude(){
    if ((document.formcustomdata.time[0].checked==true)||(document.formcustomdata.time[1].checked==true)){
        document.formcustomdata.magnitude[0].disabled=false;
        document.formcustomdata.magnituderange.min="2.5";
    }    
    else if ((document.formcustomdata.time[2].checked==true)||(document.formcustomdata.time[3].checked==true)){
        document.formcustomdata.magnitude[0].disabled=true;
        document.formcustomdata.magnituderange.min="4.5";
        if (document.formcustomdata.magnitude[3].checked==false){
        document.formcustomdata.magnitude[2].checked=true;
        }
    }
}

// show popup abouve custom range slider
function popup(){
    console.log(parseFloat(document.formcustomdata.magnituderange.value));
    $(".popuptext").html(document.formcustomdata.magnituderange.value);
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

 //back button for LAST EARTHQUAKES data 
function hideLastEarthquakesData(){

    $('#loadingData').html("<h1>LOADING</h1>");
    $('#card-body').hide();
    $('#customdata').hide();
    $("#lastEarthquakesButton-show").show();
    $("#lastEarthquakesButton-back").hide();
    $('#greatest').show();
    $('#knowledge').show();
    $('section').css('padding','25vh 0');
    $('section').css('margin-bottom','0');
}