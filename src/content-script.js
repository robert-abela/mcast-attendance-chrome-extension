var ThemeColor = 'Indigo';

var weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
var date = new Date();
var day = weekday[date.getDay()];

function pad(i) {
    return (i < 10) ? "0" + i : i;
}

function calcDuration(t1, t2) {
	dt1 = new Date("July 10, 1982 " + t1 + ":00");
	dt2 = new Date("July 10, 1982 " + t2 + ":00");
	return (dt2.getHours()+(dt2.getMinutes()/60)) - 
		   (dt1.getHours()+(dt1.getMinutes()/60));
}

function matchItem(item) {

	if (item.length < 4)
		return false;

	if (day === item[0].toUpperCase()) {
		var currTime = pad(date.getHours())+':'+pad(date.getMinutes());
		if (currTime >= item[1] && currTime <= item[2])
			return true;
	}

	return false
}

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of arrays. The default 
// delimiter is the comma, but this can be overriden in the second argument.
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

    // Create an array to hold our data. Give the array a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern matching groups.
    var arrMatches = null;

    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length (is not the
        //  start of string) and if it matches field delimiter. If id 
        // does not, then we know that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way, let's check to see 
        // which kind of value we captured (quoted or unquoted).
        if (arrMatches[ 2 ]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ), "\"");

        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];
        }

        // Now that we have our value string, let's add it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return (arrData);
}

function makeCountBtn() {
	var submitBtn = $("form :submit");
	var countBtn = document.createElement("input");
	countBtn.setAttribute("type", "button");
	countBtn.value = "Count present";
	countBtn.className = submitBtn.attr('class');
	countBtn.style.color = ThemeColor;
	countBtn.style.marginRight = '6px';
	countBtn.addEventListener ("click", function() {
		var elems = $('.waspresent').length
		if (elems == 0) {
			countBtn.value = 'Count present (Select Class\\Group)';
		}
		else {
			var isChecked = $('.waspresent:radio:checked').length;
			countBtn.value = 'Count present ('+isChecked+' of '+elems+')';
		}
	});
	var parent = submitBtn.parent().get(0);
	parent.insertBefore(countBtn, submitBtn.get(0));
}

function loadCSV() {
	chrome.storage.sync.get('entries', function (obj) {
		if (typeof obj.entries === "undefined") {
    		console.log('Timetable not found in storage');
		}
		else {
			var parsedEntries = CSVToArray(obj.entries);
			var items = parsedEntries.length;
			console.log(items+' timetable entries found in storage');

			for (var i = 0; i < items; i++) {
				var item = parsedEntries[i];

				if (matchItem(item) === true) {
					console.log('Match: '+item);

					//Change label colour
					$('label[for="Unit"]').css({'color': ThemeColor});
					$('label[for="Session"]').css({'color': ThemeColor});
					$('label[for="Duration"]').css({'color': ThemeColor});

					//Autofill fields
					$('#Unit').val(item[3]);
					$('#Session').val(item[1]);
					$('#Duration').val(calcDuration(item[1], item[2]));
					
					//Stop looping
					break;
				}
			}
		}
	});
}

function startModifications() {
	try {
		//Change colour of heading
		$('h2').css({'color': ThemeColor});

		makeCountBtn();

		if (location.href.includes("attendance.mcast.edu.mt/Home/Create"))
			loadCSV();
	}
	catch(err) {
	    console.log(err.message);
	}
}

$(document).ready(startModifications);