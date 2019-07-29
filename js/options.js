$(document).ready(function () {
    chrome.storage.local.get(['key'], function(result) {
        back = result.key;
        console.log('Value currently is ' + back);
        $("#workHour").attr('value', back);
    });
});

$("#save").click(function () {
   save("workHour", $("#workHour").val());
});

function save(key, value){
    chrome.storage.local.set({key: value}, function() {
        console.log('Value is set to ' + value);
    });
}