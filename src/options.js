function restoreOriginalMsg() {
	$('#msgdiv').text('Changes are saved automatically');
}

function showTempMsg(msg) {
	$('#msgdiv').text(msg);
	setTimeout(restoreOriginalMsg, 1000);
}

function clearTimetable() {
	chrome.storage.sync.clear(function() {
		var error = chrome.runtime.lastError;
		if (error)
			console.error(error);
		else
			showTempMsg('Timetable cleared');
	});
}

function saveTimetable() {
	var csvValue = $('#timetable').val();
	var object = {'entries': csvValue};
	chrome.storage.sync.set(object, function() {
		var error = chrome.runtime.lastError;
		if (error)
			console.error(error);
		else
			showTempMsg('Timetable saved');
	});
}

function enableComponents() {
	if ($('#configure').is(':checked')) {
		$('#timetable').prop('disabled', false);
		$('#timetable').focus();
	}
	else {
		$('#timetable').prop('disabled', true);
		
	}
}

function loadSavedOptions() {
	chrome.storage.sync.get('entries', function (obj) {
		if (typeof obj.entries !== 'undefined') {
			$('#timetable').text(obj.entries);
			$('#configure').prop('checked', true);
			$("#save").prop('disabled', true);
		}

		enableComponents();
	});
}

function onCheckboxChange() {
	if (!$('#configure').is(':checked'))
		clearTimetable();

	enableComponents();
}

$(document).ready(function(){
	loadSavedOptions();
	$('#showmoreinfo').click(function(){
		$('#showmoreinfo').remove();
		$('#moreinfo').show();
	});

	$('#timetable').focusout(saveTimetable);
	$('#configure').click(onCheckboxChange);
});