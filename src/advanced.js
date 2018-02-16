function startModifications() {
	makeCountBtn();

	try {
		chrome.storage.sync.get('entries', function (obj) {
			if (typeof obj.entries === "undefined") {
				console.log('Timetable entries not found in storage');
			}
			/*else if ($('#Session').val().length > 0) {
				console.log('Skipping second pass'); //TODO: confirm this is needed
			}*/
			else {
				//Found a configured timetable
				if (loadCSV(obj.entries) === true) {
					// CSV loaded successfully
					$.post(window.location.href, $("form:first").serialize())
						.done(function(data) {
							//console.log(data);
							document.open();
							document.write(data);
							document.close();
							makeCountBtn();
							makeRememberBtns();
							$(window).on("load", restoreStates);
						})
						.fail(function() {
							console.err('Failed to POST request');
						});
				}
			}
		});
	}
	catch(err) {
		console.log(err.message);
	}
}

$(document).ready(startModifications);