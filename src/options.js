function showMsg(msg) {
	$("#msgdiv").text(msg);
	$("#msgdiv").show();
}

function showTempMsg(msg) {
	showMsg(msg);
	$("#msgdiv").delay(750).fadeOut(250);
}

function saveTimetable() {
	var csvValue = $("#timetable").val();
	var object = {'entries': csvValue};
	chrome.storage.sync.set(object, function() {
		showTempMsg('Timetable saved');
	});
}

function loadSavedOptions() {
	chrome.storage.sync.get('entries', function (obj) {
		if (typeof obj.entries !== "undefined")
			$("#timetable").text(obj.entries);
		showMsg('Changes are not saved automatically, remember to save your timetable!');
		$("#timetable").focus();
	});
}

$(document).ready(loadSavedOptions);
$('#save').click(saveTimetable);