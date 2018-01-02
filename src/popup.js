/*function runCountjs() {
  	chrome.tabs.executeScript({
    	file: 'count.js'
  });
}*/

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

function clearStorage() {
	if (confirm('Are you sure you want to delete the timetable?\nIt might be a good idea to keep a backup.')) {
		chrome.storage.sync.clear(function() {
			$("#timetable").text('');
			showTempMsg('Timetable deleted');
		});
	}
}

//load old entries
chrome.storage.sync.get('entries', function (obj) {
	if (typeof obj.entries !== "undefined")
		$("#timetable").text(obj.entries);
	showMsg('Changes are not saved automatically and will be lost when the popup is closed!');
});


$('#save').click(saveTimetable);
$('#clear').click(clearStorage);
