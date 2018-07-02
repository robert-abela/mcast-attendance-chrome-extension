function startModifications() {
	try {
		makeCountBtn();	// no timetable found
		makeHeaderLinks();
	}
	catch(err) {
		console.log(err.message);
	}
}

$(document).ready(startModifications); 