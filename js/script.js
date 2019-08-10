$(document).ready(function () {
    var ewd = [-1,0,-1,-2,-1,-1,0,1,0,-1,-1,2];
    var workHour = 0;
    var key = "workHour";
    chrome.storage.local.get(['key'], function (result) {
        back = result.key;
        console.log('Value currently is ' + back);
        workHour = result.key
    });
    var date = new Date();
    var lastDay = new Date(date.getYear(), date.getMonth() + 1, 0);
    var firstDay = new Date(date.getYear(), date.getMonth(), 1);
    $('#tracking').append('<br><span id="backtime"><span>');
    $("#favorites").after('<div id="customTime" ng-controller="FavoritesCtrl" class="ng-scope" style="position: fixed; left: 0; top: 135px; background-color: white; min-width: 115px; min-height: 32px; border: 1px solid #ccc; margin-top: 3px; border-bottom-right-radius: 4px; padding: 5px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); -moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);"><p style="font-weight: 600">Munkaórák</p><p>A mai nap végéig:</p><p id="customWeek">Heti: <span></span></p><p id="customMonth">Havi: <span></span></p></div>');

    function monthWokdays(){
        var days = 0;
        for(var i = 1; i <= date.getDate(); i++ ){
            var day = parseInt(new Date(date.getFullYear(), date.getMonth(), i).getDay());
            if(day < 6 && day > 0){
                console.log(new Date(date.getFullYear(), date.getMonth(), i));
                days++
            }
        }
        console.log("Days:", days);
        return days;
    }

    setInterval(function () {
        $('#customTime').css('top', 152 + $("#favorites").height());
        var week = date.getDay() * workHour;
        weekH = Math.floor(week);
        weekM = (week % 1) * 60;

        var month = monthWokdays() * workHour;
        monthH = Math.floor(month);
        monthM = (month % 1) * 60;

        $('#customWeek span').text(weekH + ":" + weekM);
        $('#customMonth span').text(monthH + ":" + monthM);
        var trackTime = $('#tracking')[0].textContent.split(' ')[9].split(':');
        if(parseInt(trackTime[0])+(parseInt(trackTime[1])/60) < workHour) {
            var backTime = (60 * workHour) - (parseInt(trackTime[0]) * 60 + parseInt(trackTime[1]));
            var backTimeHour = Math.floor(backTime / 60);
            var backTimeMinute = backTime % 60;
            if (backTimeMinute < 10) {
                backTimeMinute = "0" + backTimeMinute;
            }
            $('#backtime').text("Maradt: 0" + backTimeHour + ":" + backTimeMinute);
        }else{
            var backTime = (parseInt(trackTime[0]) * 60 + parseInt(trackTime[1])) - (60 * workHour);
            var backTimeHour = Math.floor(backTime / 60);
            var backTimeMinute = backTime % 60;
            if (backTimeMinute < 10) {
                backTimeMinute = "0" + backTimeMinute;
            }
            $('#backtime').text("Plusz: 0" + backTimeHour + ":" + backTimeMinute);
            $('#backtime').css("color", "#62d462");

        }
    }, 1000);
});