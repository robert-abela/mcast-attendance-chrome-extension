function startModifications() {
	try {
		if (loadCSV()) {
			setTimeout(function() { 
				//console.log($( "form:first" ).serialize());
				$.post( window.location.href, $( "form:first" ).serialize(), function( data ) {
					//console.log(data);
					document.open();
					document.write(data);
					document.close();

					makeCountBtn();
					makeRememberBtn();
				});
			 }, 0); // 0ms timeout seems to be needed to allow LoadCSV to fill fields
		}
		else {
			makeCountBtn();	// no timetable found
		}
	}
	catch(err) {
		console.log(err.message);
	}
}

$(document).ready(startModifications); 