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
		//Advanced Mode ON
		$('#timetable').prop('disabled', false);
		$('#timetable').focus();
		$('#showmoreinfo').show();
	}
	else {
		//Advanced Mode OFF
		$('#timetable').prop('disabled', true);
		$('#showmoreinfo').hide();
	}
}

function loadSavedOptions() {
	chrome.storage.sync.get('entries', function (obj) {
		if (typeof obj.entries !== 'undefined') {
			$('#timetable').text(obj.entries);
			$('#configure').prop('checked', true);
		}

		enableComponents();
	});
}

function onCheckboxChange() {
	if (!$('#configure').is(':checked'))
		clearTimetable();

	enableComponents();
}

function resetAllData() {
	var dialog = $('#areYouSureDialog').get(0);
	dialog.showModal();

	// Update button opens a modal dialog
	$('#confirm_button').click(function() {
		chrome.storage.sync.clear(function() {
			if (chrome.runtime.lastError) {
				console.log(chrome.runtime.lastError);
			} else {
				console.log('All extension data cleared');
				$('#configure').prop('checked', false);
				enableComponents();
				dialog.close();
			}
		});
	});

	// Form cancel button closes the dialog box
	$('#cancel_button').click(function() {
		dialog.close();
	});
}

$(document).ready(function(){
	loadSavedOptions();
	$('#showmoreinfo').click(function(){
		$('#showmoreinfo').remove();
		$('#moreinfo').show();
	});

	$('#timetable').focusout(saveTimetable);
	$('#configure').click(onCheckboxChange);
	$("#reset").click(resetAllData);
});