    //set variables
    var currentDay = new Date();
    var otherDay=new Date();
    var magnitude;
    //One day (24 hours) = 86 400 000 milliseconds
    const oneday = 86400000;

$(document).ready(function () {
    
    // hide card bodys and map
    $("#table").hide(); 
    $("#knowledge .card-body").hide();
    $("#customData-card .card-body").hide();
    $("#map").hide();

    //hide buttons and features
    $("#lastEarthquakesButton-back").hide();
    $("#lastEarthquakesButton-map").hide();
    $("#lastEarthquakesButton-backlist").hide();
    $("#greatestButton-back").hide();
    $("#greatestButton-map").hide();
    $("#greatestButton-backlist").hide();
    $("#customButton-back").hide();
    $("#customButton-map").hide();
    $("#customButton-backlist").hide();
    $("#customRange").hide();
    $("#customTime").hide();
    $("#showMagnitudeValueText").hide();

    //create current day in format: yyyy-mm-dd
    //create current day in format: yyyy-mm-dd (to include current day I need to add one day)
    //getTime() change to milliseconds
    currentDay = (new Date(currentDay.getTime()+oneday)).toISOString().substring(0, 10);
    otherDay= (new Date(otherDay.getTime()-oneday*10)).toISOString().substring(0, 10);
    //set datefrom and dateuntil in custom setting
    document.getElementById("datefrom").defaultValue = otherDay;
    document.getElementById("dateuntil").defaultValue = currentDay; 
});


//***********************   M A I N  P A G E   **********************

    //************  L A S T  E A R T H Q U A K E S  ************

$('#lastEarthquakes').click(function(){
    $('section').css('margin-top','9vh');
    $('section').css('padding','0');
    $('section').css('margin-bottom','5.5vh');
    $('#iconList i').css('color','#85D945');
    $('#map').hide();
    $('#greatest-card').hide();
    $('#customData-card').hide(); 
    $('#knowledge').hide();
    $('#lastEarthquakesButton-map').show();
    $('#lastEarthquakesButton-back').show();
    $('#table').show();
    //set default data from search and print as last earthquakes into the table
    search();
});

    //********  G R E A T E S T  E A R T H Q U A K E S  ********

$('#greatest').click(function(){
    $('section').css('margin-top','9vh');
    $('section').css('padding','0');
    $('section').css('margin-bottom','5.5vh');
    $('#iconList i').css('color','#85D945');
    $('#map').hide();
    $('#lastEarthquakes-card').hide();
    $('#customData-card').hide(); 
    $('#knowledge').hide();
    $('#greatestButton-map').show();
    $('#greatestButton-back').show();
    $('#table').show();
    magnitude = 8.4;
    otherDay="1727-11-10";
    //print greatest earthquakes to table
    removemap();
    printintable(magnitude, otherDay, currentDay);
});

    //*****************  C U S T O M  D A T A  *****************

$('#customData').click(function(){
    $('section').css('margin-top','9vh');
    $('section').css('padding','0');
    $('section').css('margin-bottom','5.5vh');
    $('#iconSettings i').css('color','#85D945');
    $('#map').hide();
    $('#lastEarthquakes-card').hide();
    $('#greatest-card').hide(); 
    $('#knowledge').hide();
    $('#customButton-map').show();
    $('#customButton-back').show();
    $("#customData-card .card-body").show();
});

    //**************  K N O W L E D G E  B A S E  **************


$("#knowledge .card-header").click(function(){
        $("#knowledge .card-body").toggle();
});

$(".sliderTop h2").nextAll().hide();
$(".sliderTop h2").click(function(){
        $(".sliderTop h2").nextAll().toggle();
  });
$(".sliderMiddle h2").nextAll().hide();
$(".sliderMiddle h2").click(function(){
        $(".sliderMiddle h2").nextAll().toggle();
  });
$(".sliderBottom h2").nextAll().hide();
$(".sliderBottom h2").click(function(){
        $(".sliderBottom h2").nextAll().toggle();
  });

    //********************  B U T T O N S  *********************

    //***** Go back to main page *****
function backToMain(){
    $('#lastEarthquakes-card').show();
    $("#lastEarthquakesButton-map").hide();
    $("#lastEarthquakesButton-back").hide();
    $("#lastEarthquakesButton-backlist").hide();
    $('#greatest-card').show();
    $("#greatestButton-map").hide();
    $("#greatestButton-back").hide();
    $("#greatestButton-backlist").hide();
    $("#customData-card").show();
    $("#customData-card .card-body").hide();
    $("#customButton-map").hide();
    $("#customButton-back").hide();
    $("#customButton-backlist").hide();
    $('#knowledge').show();
    $("#map").hide();
    $('#table').hide();
    $('#iconList i').css('color','#fafafa');
    $('#iconMap i').css('color','#fafafa');
    $('#iconSettings i').css('color','#fafafa');
    $('section').css('margin-top','9vh');
    $('section').css('padding','19vh 0');
    $('section').css('margin-bottom','0');
    removemap();
 }

    //***** Show all points on the map *****
function showMap(){
    getmap();
    $('#table').hide();
    $('#iconMap i').css('color','#85D945');
    $('#map').show();
    $('#map .card-header').hide();
    $('#mapid').height('75vh');
    $('#mapid').css('margin','0 2vw 0 2vw');
    $("#lastEarthquakesButton-backlist").show();
    $("#lastEarthquakesButton-back").hide();
    $("#lastEarthquakesButton-map").hide();
    $("#greatestButton-backlist").show();
    $("#greatestButton-back").hide();
    $("#greatestButton-map").hide();
    $("#customButton-backlist").show();
    $("#customButton-back").hide();
    $("#customButton-map").hide();
    $('#customData-card .card-body').hide();
    
}

    //***** Go back to list from show all points on the map  *****
function backToList(){
    $('#table').show();
    $('#iconMap i').css('color','#fafafa');
    $('#map').hide();
    $('#map .card-header').hide();
    $("#lastEarthquakesButton-backlist").hide();
    $("#lastEarthquakesButton-back").show();
    $("#lastEarthquakesButton-map").show();
    $("#greatestButton-backlist").hide();
    $("#greatestButton-back").show();
    $("#greatestButton-map").show();
    $("#customButton-backlist").hide();
    $("#customButton-back").show();
    $("#customButton-map").show();
    $('section').css('margin-top','9vh');
    $('section').css('padding','0');
    $('section').css('margin-bottom','5.5vh');
    $('#customData-card .card-body').show();
    removemap();
        
 }

    //***** Show single point on map *****
$('.table-hover').on('click', 'tbody tr', function() {
    var ooo = this.childNodes;
    getpoint(ooo);
    $('#map').show();
    $('#map .card-header').show();
    $('#mapid').height('70vh');
    $('#iconMap i').css('color','#85D945');
    $('#table').hide();
    $("#lastEarthquakesButton-backlist").show();
    $("#lastEarthquakesButton-back").hide();
    $("#greatestButton-backlist").show();
    $("#greatestButton-back").hide();
    $("#customButton-backlist").show();
    $("#customButton-back").hide();
 });

    //***** Go back from single point map to list view *****
 $('#mapButton-back').click(function(){
    $('#map').hide();
    $('#iconMap i').css('color','#fafafa');
    $('#table').show();
    $("#lastEarthquakesButton-backlist").hide();
    $("#lastEarthquakesButton-back").show();
    $("#greatestButton-backlist").hide();
    $("#greatestButton-back").show();
    $("#customButton-backlist").hide();
    $("#customButton-back").show();
     removemap();
 });

    //******************  F U N C T I O N S  *******************

    //open USGS API//
function openUSGSAPI(magnitude, otherDay, currentDay, callback){
    var xhr = new XMLHttpRequest();
    var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=";
    xhr.open("GET",`${url + otherDay}&endtime=${currentDay}&minmagnitude=${magnitude}`);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            callback(data);
        }
    };
}

    //display data from USGS API to the table
function printintable(magnitude, otherDay, currentDay){
    $('#datadisplay-table').html("");
    openUSGSAPI(magnitude, otherDay, currentDay, function(data){
        data=data.features;
        $('#datadisplay-table-head').html("<tr><th rowspan='2'>Date</th> <th rowspan='2'>Place</th><th rowspan='2'>Magnitude</th><th colspan='2'>Coordinates</th></tr><tr><th>Longitude</th><th>Latitude</th></tr>");    
        data.forEach(function(item) {
            document.getElementById('datadisplay-table').innerHTML += "<tr><td>" +(new Date(item.properties.time)).toLocaleDateString()+"</td>"+"<td>"+item.properties.place +"</td>"+"<td>"+ item.properties.mag +"</td>"+"<td>"+ item.geometry.coordinates[0] +"</td>"+"<td>"+ item.geometry.coordinates[1] +"</td></tr>";
        });
    $('#loadingData').html("");
    });
}

    // select custom magnitude and time in custom search
function search(){

    //set magnitude
    $('#magnitudeCustom').val(0);
    magnitude = $('input[name="magnitude"]:checked').val();
    if ((magnitude != "on") && (magnitude > 0)){
        magnitude = $("input[name='magnitude']:checked").val();
    } else {
        magnitude = $("#customRangeInput").val();
    }

    //set time
    otherDay = new Date().getTime();
    if (document.formcustomdata.time[0].checked==true){
        otherDay= otherDay-oneday;
    }
    else if (document.formcustomdata.time[1].checked==true){
        otherDay= otherDay-oneday*7;
    }
    else if (document.formcustomdata.time[2].checked==true){
        otherDay= otherDay-oneday*30;
    }
    else if (document.formcustomdata.time[3].checked==true){
        otherDay= $("#datefrom").val();
        currentDay= $("#dateuntil").val();
    }
    otherDay= (new Date(otherDay)).toISOString().substring(0, 10);
    $('#table').show();
    $('#loadingData').html("<h1>LOADING</h1>");
    printintable(magnitude, otherDay, currentDay);
    if ($('#iconSettings i').css('color')=='rgb(133, 217, 69)'){
        ($('#iconList i').css('color','#85D945'));
    }

}

    //set "Custom" radio input to checked state in custom search for magnitude
function setCustomMagnitude(){
     document.formcustomdata.magnitude[3].checked=true;
}

     //set "Custom" radio input to checked state in custom search for time
function setCustomTime(){
     document.formcustomdata.time[3].checked=true;
}

    //disable magnitude + 2.5 for 30 days or custom option
function disableMagnitude(){
    if ((document.formcustomdata.time[0].checked==true)||(document.formcustomdata.time[1].checked==true)){
        document.formcustomdata.magnitude[0].disabled=false;
        document.formcustomdata.magnitude[1].disabled=false;
        document.formcustomdata.magnitude[2].disabled=false;
        document.formcustomdata.magnitude[3].disabled=false;
        document.formcustomdata.magnitude[0].checked=true;
        document.formcustomdata.magnituderange.min="2.5";
        if (document.formcustomdata.time[1].checked==true){
        document.formcustomdata.magnitude[1].checked=true;
        document.formcustomdata.magnituderange.min="4.5";
        }
    }    
    else if (document.formcustomdata.time[2].checked==true){
        document.formcustomdata.magnitude[0].disabled=true;
        document.formcustomdata.magnitude[1].disabled=false;
        document.formcustomdata.magnitude[2].disabled=false;
        document.formcustomdata.magnitude[3].disabled=false;
        document.formcustomdata.magnituderange.min="4.5";
        if (document.formcustomdata.magnitude[2].checked==false){
        document.formcustomdata.magnitude[2].checked=true;
        }
    }
    else if (document.formcustomdata.time[3].checked==true){
        document.formcustomdata.magnitude[0].disabled=false;
        document.formcustomdata.magnitude[1].disabled=false;
        document.formcustomdata.magnitude[2].disabled=false;
        document.formcustomdata.magnitude[3].checked=true;
        customTime();
       $('#customRange').show();
    }
}

    // custom time to check condition on custom days
function customTime(){
    var dateFrom=new Date($("#datefrom").val());
    var dateUntil=new Date($("#dateuntil").val());
    var result;
    dateFrom = dateFrom.getTime();
    dateUntil = dateUntil.getTime();
    result = (dateUntil - dateFrom)/oneday;
    if (result <= 0){
        alert("Please change date. Can't display data for: " + result + " days");
        document.getElementById("datefrom").value = otherDay;
        document.getElementById("dateuntil").value = currentDay;
        document.formcustomdata.magnitude.disabled=false;
    }
    else if (result>0 && result <10){
        document.formcustomdata.magnitude[0].disabled=false;
        document.formcustomdata.magnituderange.min="2.5";
    }
    else if (result>=10 && result <=30){
        document.formcustomdata.magnitude[0].disabled=true;
        document.formcustomdata.magnitude[1].disabled=false;
        document.formcustomdata.magnitude[2].disabled=false;  
        document.formcustomdata.magnituderange.min="4.5";
    }
    else if (result>30 && result <=90){
        document.formcustomdata.magnitude[0].disabled=true;
        document.formcustomdata.magnitude[1].disabled=true;
        document.formcustomdata.magnitude[2].disabled=false;       
        document.formcustomdata.magnituderange.min="5";
    }
    else if (result>90 && result <=450){
        document.formcustomdata.magnitude[0].disabled=true;
        document.formcustomdata.magnitude[1].disabled=true;
        document.formcustomdata.magnitude[2].disabled=false;       
        document.formcustomdata.magnituderange.min="5.5";
    }
    else if (result>=450 && result <=1500){
        document.formcustomdata.magnitude[0].disabled=true;
        document.formcustomdata.magnitude[1].disabled=true;  
        document.formcustomdata.magnitude[2].disabled=true;
        document.formcustomdata.magnituderange.min="6";
    }
    else if (result>=1500 && result <=4000){
        document.formcustomdata.magnitude[0].disabled=true;
        document.formcustomdata.magnitude[1].disabled=true;  
        document.formcustomdata.magnitude[2].disabled=true;
        document.formcustomdata.magnituderange.min="6.5";
    }
    else if (result>=4000 && result <=12000){
        document.formcustomdata.magnitude[0].disabled=true;
        document.formcustomdata.magnitude[1].disabled=true;  
        document.formcustomdata.magnitude[2].disabled=true;
        document.formcustomdata.magnituderange.min="7";
    }
    else if (result>=12000 && result <=40000){
        document.formcustomdata.magnitude[0].disabled=true;
        document.formcustomdata.magnitude[1].disabled=true;  
        document.formcustomdata.magnitude[2].disabled=true;
        document.formcustomdata.magnituderange.min="7.5";
    }
    else if (result>=40000){
        document.formcustomdata.magnitude[0].disabled=true;
        document.formcustomdata.magnitude[1].disabled=true;  
        document.formcustomdata.magnitude[2].disabled=true;
        document.formcustomdata.magnituderange.min="8";
    }
}

// display value from input slider; source idea: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_rangeslider
function showMagnitudeValue(){
    $("#showMagnitudeValueText").show();
    var slider = document.getElementById("customRangeInput");
    var output = document.getElementById("showMagnitudeValueText");
    output.innerHTML = slider.value;
    slider.oninput = function() {
    output.innerHTML = this.value;
    };
}