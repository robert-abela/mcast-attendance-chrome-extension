function runCountjs() {
  	chrome.tabs.executeScript({
    	file: 'count.js'
  });
}

function saveTimetable() {
	var csvValue = document.getElementById('timetable').value;
	var object = {'entries': csvValue};
	chrome.storage.sync.set(object, function() {
		// Notify that we saved.
		$("#message").text('Timetable saved');
	});
}

function clearStorage() {
	chrome.storage.sync.clear(function() {
		document.getElementById('timetable').value = '';
		$("#message").text('Storage cleared');
	});
}

//load old entries
chrome.storage.sync.get('entries', function (obj) {
	if (typeof obj.entries === "undefined")
		$("#message").text('Storage empty');
	else
		document.getElementById('timetable').value = obj.entries;
});

document.getElementById('save').addEventListener('click', saveTimetable);
document.getElementById('clear').addEventListener('click', clearStorage);

