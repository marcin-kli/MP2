    //set variables
    var currentDay = new Date();
    var otherDay=new Date();
    var magnitude;
    //One day (24 hours) = 86 400 000 milliseconds
    const oneday = 86400000;

$(document).ready(function () {
    
    // hide card bodys and map 
    $(".card-body").hide();
    $("#map").hide();

    //hide buttons and features
    $("#lastEarthquakesButton-back").hide();
    $("#greatestButton-back").hide();
    $("#greatestButton-map").hide();
    $("#knowledge-hide").hide();
    $("#customRange").hide();
    $("#customTime").hide();
    $("#showMagnitudeValueText").hide();

    //show buttons to select on main page

    $("#knowledge-show").click(function(){
    $("#knowledge .card-body").toggle();
    })

    //create current day in format: yyyy-mm-dd
    //create current day in format: yyyy-mm-dd (to include current day I need to add one day)
    currentDay = (new Date(currentDay.getTime()+oneday)).toISOString().substring(0, 10);
    otherDay= (new Date(otherDay.getTime()-oneday*10)).toISOString().substring(0, 10);
    //set datefrom and dateuntil in custom setting
    document.getElementById("datefrom").defaultValue = otherDay;
    document.getElementById("dateuntil").defaultValue = currentDay; 
});


//***********************  N A V I G A T I O N  *********************

    //***********************  LIST ICON  **********************


    //***********************  MAP ICON  ***********************

$('#iconMap i').click(function(){
    console.log($(this).css('color'))
    if ($(this).css("color") == "rgb(250, 250, 250)") {
        $(this).css('color','#85D945');
        $('#lastEarthquakes').hide();
        $('#greatest').hide();
        $('#knowledge').hide();
        $('#map').show();
        $('#map .card-header').hide();
        $('#mapid').height('87vh');
        $('#mapid').css('margin','0 2vw 0 2vw');
        $('section').css('margin-top','7vh');
        $('section').css('padding','0');
        $('section').css('margin-bottom','5.5vh');
    }
    else{
        $(this).css('color','#fafafa');
        $('#map').hide();
        $('#lastEarthquakes').show();
        $('#greatest').show();
        $('#knowledge').show();
        $('section').css('margin-top','0');
        $('section').css('padding','25vh 0');
        $('section').css('margin-bottom','0');
    }
})

    //***********************  SETTINGS ICON  ******************


    //***********************  HELP ICON  **********************


//***********************   M A I N  P A G E   **********************

    //************  L A S T  E A R T H Q U A K E S  ************

    //********  G R E A T E S T  E A R T H Q U A K E S  ********

$('#greatest').click(function(){
    console.log($('#loadingData').html());
    if ($('#loadingData').html() == "<h1>LOADING</h1>") {
        $('section').css('margin-top','7vh');
        $('section').css('padding','0');
        $('section').css('margin-bottom','5vh');
        $('#lastEarthquakes').hide();
        $('#knowledge').hide();
        $("#greatestButton-map").show();
        $("#greatestButton-back").show();
        $('#card-body').show();
        magnitude = 8.4
        otherDay="1727-11-10";
        //print greatest earthquakes to table
        printintable(magnitude, otherDay, currentDay)
    }
    else{
        $('#loadingData').html("<h1>LOADING</h1>");
        $('#card-body').hide();
        $("#greatestButton-map").hide();
        $("#greatestButton-back").hide();
        $('#lastEarthquakes').show();
        $('#knowledge').show();
        $('section').css('padding','25vh 0');
        $('section').css('margin-bottom','0');
    }
})

    //**************  K N O W L E D G E  B A S E  **************


    //open USGS API//
function openUSGSAPI(magnitude, otherDay, currentDay, callback){
    var xhr = new XMLHttpRequest();
    // var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=1727-11-10&endtime=2020-12-31&minmagnitude=";
    var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=";
    xhr.open("GET",`${url + otherDay}&endtime=${currentDay}&minmagnitude=${magnitude}`);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            callback(data);
        };
    }
}

 //display data from USGS API to the table
function printintable(magnitude, otherDay, currentDay){
$('#datadisplay-table').html("");
openUSGSAPI(magnitude, otherDay, currentDay, function(data){
    console.log(data);
        data=data.features;
        $('#datadisplay-table').html("<table class='table-active'><thead><tr><th rowspan='2'>Date</th> <th rowspan='2'>Place</th><th rowspan='2'>Magnitude</th><th colspan='2'>Coordinates</th></tr><tr><th>Longitude</th><th>Latitude</th></tr></thead></table>")
        data.forEach(function(item) {
            document.getElementById('datadisplay-table').innerHTML += "<table><tr><td>" +(new Date(item.properties.time)).toLocaleDateString()+"</td>"+"<td>"+item.properties.place+"</td>"+"<td>"+ item.properties.mag +"</td>"+"<td>"+ item.geometry.coordinates[0]+ "</td><td>" +item.geometry.coordinates[1]+"</td></tr></table>"
        });
    console.log(data.length);
    $('#loadingData').html("")
    })
}



   //show LAST EARTHQUAKES data 
function showLastEarthquakesData(){
    $('section').css('margin-top','7vh');
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
    magnitude = $('input[name="magnitude"]:checked').val();
    if ((magnitude != "on") && (magnitude > 0)){
        magnitude = $("input[name='magnitude']:checked").val();
    } else {
        magnitude = $("#customRangeInput").val();
    }
    console.log(magnitude);

    //set time
    //getTime() change to milliseconds
    otherDay = new Date().getTime();
    if (document.formcustomdata.time[0].checked==true){
        otherDay= otherDay-oneday;
    }
    else if (document.formcustomdata.time[1].checked==true){
        otherDay= otherDay-oneday*7;
    }
    else if (document.formcustomdata.time[2].checked==true){
        otherDay= otherDay-oneday*30;
        //hide magnitude 2.5 here -> disableMagnitude
    }
    else if (document.formcustomdata.time[3].checked==true){
        otherDay= $("#datefrom").val();
        currentDay= $("#dateuntil").val();
    }
    otherDay= (new Date(otherDay)).toISOString().substring(0, 10);
    console.log("C " +currentDay);
    console.log("O " + otherDay);
    $("#customdata").hide();
    $('#card-body').show();
    $('#loadingData').html("<h1>LOADING</h1>");
    printintable(magnitude, otherDay, currentDay);
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

// display value from input slider; idea source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_rangeslider
function showMagnitudeValue(){
    $("#showMagnitudeValueText").show();
    var slider = document.getElementById("customRangeInput");
    var output = document.getElementById("showMagnitudeValueText");
    output.innerHTML = slider.value;
    slider.oninput = function() {
    output.innerHTML = this.value;
    }
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