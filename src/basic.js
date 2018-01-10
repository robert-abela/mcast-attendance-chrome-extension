function startModifications() {
	try {
			makeCountBtn();	// no timetable found
	}
	catch(err) {
		console.log(err.message);
	}
}

$(document).ready(startModifications); 