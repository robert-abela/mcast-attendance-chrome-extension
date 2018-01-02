var ThemeColor = 'Indigo';



// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}


try {
	var submitBtn = $("form :submit");
	var countBtn = document.createElement("input");
	countBtn.setAttribute("type", "button");
	countBtn.value = "Count present";
	countBtn.className = submitBtn.attr('class');
	countBtn.style.color = ThemeColor;
	countBtn.style.marginRight='6px';
	countBtn.addEventListener ("click", function() {
		var elems = document.getElementsByClassName("waspresent").length;
		if (elems == 0) {
			countBtn.value = 'Count present (select class/group)';
		}
		else {
			var isChecked = $('.waspresent:radio:checked').length;
			countBtn.value = 'Count present ('+isChecked+' of '+elems+')';
		}
	});
	var parent = submitBtn.parent().get(0);
	parent.insertBefore(countBtn, submitBtn.get(0));

	var unitLbl = $('label[for="Unit"]');
	unitLbl.text('Unit (fill next 3)');
	unitLbl.css({
		'text-decoration': 'underline', 
		'color': ThemeColor
	});
	unitLbl.on('click', function(e) {
    	$('#Unit').get(0).value = 'ITSFT-406-1502 - Programming Concepts';
		$('#Session').get(0).value = '08:00';
		$('#Duration').get(0).value = '2';
	});

	chrome.storage.sync.get('entries', function (obj) {
		if (typeof obj.entries === "undefined") {
    		console.log('Timetable not found in storage');
		}
		else {
			var parsedEntries = CSVToArray(obj.entries);
			console.log(parsedEntries.length+' timetable entries found in storage');
		}
	});
}
catch(err) {
    console.log(err.message);
}