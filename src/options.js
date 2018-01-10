function showMsg(msg) {
	$("#msgdiv").text(msg);
	$("#msgdiv").show();
}

function showTempMsg(msg) {
	showMsg(msg);
	$("#msgdiv").delay(750).fadeOut(250);
}

function saveTimetable() {

	if ($('#configure').is(":checked")) {
		var csvValue = $("#timetable").val();
		var object = {'entries': csvValue};
		chrome.storage.sync.set(object, function() {
			showTempMsg('Timetable saved');
		});
	}
	else {
		chrome.storage.sync.clear(function() {
    		var error = chrome.runtime.lastError;
    		if (error) {
	        	console.error(error);
	    	}
		});
		showTempMsg('Timetable cleared');
	}
}

function loadSavedOptions() {
	chrome.storage.sync.get('entries', function (obj) {
		if (typeof obj.entries !== "undefined") {
			$("#timetable").text(obj.entries);
			$('#configure').prop('checked', true);
		}

		onCheckboxChange();
		showMsg('Note: Changes are not saved automatically, remember to save your timetable!');
	});
}

function onCheckboxChange() {
	var enabled = $('#configure').is(":checked");
	$("#timetable").prop('disabled', !enabled);
	$("#timetable").focus();
}

$(document).ready(function(){
	loadSavedOptions();
	$('#save').click(saveTimetable);
	$('#configure').click(onCheckboxChange);
    $("#showmoreinfo").click(function(){
		$("#showmoreinfo").remove();
        $("#moreinfo").show();
    });
});