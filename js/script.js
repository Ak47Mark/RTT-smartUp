$(document).ready(function () {
    var workHour = 7.5;
    var key = "workHour";
    chrome.storage.local.get(['key'], function (result) {
        back = result.key;
        console.log('Value currently is ' + back);
        workHour = result.key
    });
    console.log(workHour);
    var date = new Date();
    var lastDay = new Date(date.getYear(), date.getMonth() + 1, 0);
    var firstDay = new Date(date.getYear(), date.getMonth(), 1);
    $('#tracking').append('<br><span id="backtime"><span>');
    $("#favorites").after('<div id="customTime" ng-controller="FavoritesCtrl" class="ng-scope" style="display: none; position: fixed; left: 0; top: 135px; background-color: white; min-width: 115px; min-height: 32px; border: 1px solid #ccc; margin-top: 3px; border-bottom-right-radius: 4px; padding: 5px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); -moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);"><p style="font-weight: 600">Munkaórák</p><p id="customWeek">Heti: <span></span></p><p id="customMonth">Havi: <span></span></p></div>');
    setTimeout(function () {
        $('#customTime').css('top', 152 + $("#favorites").height());
        $('#customTime').css('display', 'block');
    }, 1000);
    setInterval(function () {
        var week = date.getDay() * workHour;
        weekH = Math.floor(week);
        weekM = (week % 1) * 60;

        var month = Math.round((((Math.ceil((date.getDate() + firstDay.getDay() + 1) / 7) * 5) - firstDay.getDay() + 1) * workHour) * 100) / 100;
        monthH = Math.floor(month);
        monthM = (month % 1) * 60;

        $('#customWeek span').text(weekH + ":" + weekM);
        $('#customMonth span').text(monthH + ":" + monthM);
        var trackTime = $('#tracking')[0].textContent.split(' ')[9].split(':');
        var backTime = (60 * workHour) - (parseInt(trackTime[0]) * 60 + parseInt(trackTime[1]));
        var backTimeHour = Math.floor(backTime / 60);
        var backTimeMinute = backTime % 60;
        if (backTimeMinute < 10) {
            backTimeMinute = "0" + backTimeMinute;
        }
        $('#backtime').text("Maradt: 0" + backTimeHour + ":" + backTimeMinute);
    }, 1000);
});