/*function runCountjs() {
  	chrome.tabs.executeScript({
    	file: 'count.js'
  });
}*/

function showMsg(msg) {
	$("#msgdiv").text(msg);
	$("#msgdiv").show();
}

function saveTimetable() {
	var csvValue = $("#timetable").val();
	var object = {'entries': csvValue};
	chrome.storage.sync.set(object, function() {
		showMsg('Timetable saved');
	});
}

function clearStorage() {
	chrome.storage.sync.clear(function() {
		$("#timetable").text('');
		showMsg('Storage cleared');
	});
}

//load old entries
chrome.storage.sync.get('entries', function (obj) {
	if (typeof obj.entries === "undefined")
		showMsg('Storage empty, enter CSV lines ...');
	else
		$("#timetable").text(obj.entries);
});

document.getElementById('save').addEventListener('click', saveTimetable);
document.getElementById('clear').addEventListener('click', clearStorage);

