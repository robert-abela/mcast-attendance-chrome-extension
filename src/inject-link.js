function injectLink() {
	chrome.storage.sync.get('entries', function (obj) {
		if (typeof obj.entries === "undefined") {
			console.log('Timetable not found in storage, skipping autofill link.');
		}
		else {
			var link = $("<br /><a href='/Home/Create?Length=4&autofill'>Autofill Attendance</a>");
			link.insertAfter("h2:first");
		}
	});
}

$(document).ready(injectLink); 