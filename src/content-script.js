var weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
var date = new Date();
var day = weekday[date.getDay()];
var regexTime = new RegExp(/^(([0-1]\d|2[0-3]):[0-5]\d)$/);

var FldEnum = {
    DAY : 0,
    CLASS : 1,
    START : 2,
    END : 3,
    UNIT: 4
}

function pad(i) {
    return (i < 10) ? "0" + i : i;
}

var currTime = pad(date.getHours())+':'+pad(date.getMinutes());

function calcDuration(t1, t2) {
	dt1 = new Date("July 10, 1982 " + t1 + ":00");
	dt2 = new Date("July 10, 1982 " + t2 + ":00");
	return (dt2.getHours()+(dt2.getMinutes()/60)) -
		   (dt1.getHours()+(dt1.getMinutes()/60));
}

function matchItem(item) {
	if (item.length < 5)
		return false; //not enough fields

	if (item[FldEnum.UNIT].length === 0)
		return false; //unit name empty

	if (item[FldEnum.CLASS].length === 0)
		return false; //class name empty

	if (day === (item[FldEnum.DAY]).toUpperCase()) {
		var start = item[FldEnum.START], end = item[FldEnum.END];
		if (regexTime.test(start) && regexTime.test(end)) {
			if (currTime >= start && currTime <= end)
				return true;
		}
	}

	return false;
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
    while (arrMatches = objPattern.exec( strData )) {

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
        }
        else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];
        }

        //trim value
        strMatchedValue = strMatchedValue.trim();

        // Now that we have our value string, let's add it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return (arrData);
}

function makeBtn(label, id) {
	var submitBtn = $('form :submit');
	var btn = document.createElement('input');
	btn.setAttribute('type', 'button');
	btn.setAttribute('id', id);
	btn.value = label;
	btn.className = submitBtn.attr('class');
	btn.style.marginRight = '6px';
	return btn;
}

function injectBtn(btn) {
	var submitBtn = $("form :submit");
	var parent = submitBtn.parent().get(0);
	parent.insertBefore(btn, submitBtn.get(0));
}

function makeCountBtn() {
	var countBtn = makeBtn('Count present', 'count');
	countBtn.addEventListener ('click', function() {
		var elems = $('.waspresent').length;
		if (elems == 0) {
			countBtn.value = 'Count present (Select Class\\Group)';
		}
		else {
			var isChecked = $('.waspresent:radio:checked').length;
			countBtn.value = 'Count present ('+isChecked+' of '+elems+')';
		}
	});
	injectBtn(countBtn);
	$('#count').attr('title', 'Count the number of students currently marked as present');
}

function restoreStates() {
	var className = $('#Class').val();
	chrome.storage.sync.get(className, function (obj) {
		if (typeof obj[className] === "undefined") {
			console.log(className + ' not found in storage');
			return;
		}
		else {
			console.log(className + ' found in storage');
		}

		obj[className].forEach(function(student) {
			//console.log(student);
			setState(student);
		});
	});
}

function makeRememberBtns() {
	//Mske Forget button
	var forgetBtn = makeBtn('Forget', 'forget');
	forgetBtn.addEventListener ('click', function() {
		var className = $('#Class').val();
		chrome.storage.sync.remove(className, function() {
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError);
			}
			else {
				console.log(className + ' students forgotten');
				$('#forget').prop('disabled', true);
			}
		});
	});
	injectBtn(forgetBtn);

	//Enable/disable forget
	var className = $('#Class').val();
	chrome.storage.sync.get(className, function (obj) {
		if (typeof obj[className] !== "undefined")
			$('#forget').prop('disabled', false);
		else
			$('#forget').prop('disabled', true);
	});

	//Make Remember button
	var rememberBtn = makeBtn('Remember', 'remember');
	rememberBtn.addEventListener ('click', function() {
		var className = $('#Class').val();
		var object = {[className]: collectIDs()};
		chrome.storage.sync.set(object, function() {
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError);
			}
			else {
				console.log(className + ' students remembered');
				$('#forget').prop('disabled', false);
			}
		});
	});
	injectBtn(rememberBtn);

	$('#forget').attr('title', 'Forget the currently remembered students\' absent/present states');
	$('#remember').attr('title', 'Remember the current absent/present states and use them automatically in the future');
}

function loadCSV(entries) {
	var parsedEntries = CSVToArray(entries);
	var items = parsedEntries.length;
	console.log(items+' timetable entries found in storage');

	for (var i = 0; i < items; i++) {
		var item = parsedEntries[i];

		if (matchItem(item) === true) {
			console.log('Match: '+item);

			//Autofill fields
			$('#Unit').val(item[FldEnum.UNIT]);
			$('#Session').val(item[FldEnum.START]);
			$('#Duration').val(calcDuration(item[FldEnum.START], item[FldEnum.END]));
			$('#Class').val(item[FldEnum.CLASS]);

			return true;
		}
	}
	return false;
}

function setState(student) {
	var input_elem = $('input[value="'+student.IDCardNo+'"]');
	if (input_elem.length == 0)
		return;

	var elem_id = input_elem.attr('id');
	var row_num = elem_id.match(/\d+/);
	if (student.WasPresent) {
		$('#StudentRows_'+row_num+'__WasPresent[value=True]').prop('checked', true);
	}
	else {
		$('#StudentRows_'+row_num+'__WasPresent[value=False]').prop('checked', true);
		$('#StudentRows_'+row_num+'__AbsentHours').prop('disabled', false);
		$('#StudentRows_'+row_num+'__AbsenceReason').val(student.AbsenceReason).change();
		$('#StudentRows_'+row_num+'__AbsenceReason').prop('disabled', false);
	}

	$('#StudentRows_'+row_num+'__Remarks').val(student.Remarks);
}

//collect ID and state for all students in list
function collectIDs() {
	var students = [];
	var row_num = 0;

	while (true) {
		var id_element = $('#StudentRows_'+row_num+'__IDCardNo');
		if (id_element.length == 0)
			break;   //No more students in the list

		var absent_element = $('#StudentRows_'+row_num+'__WasPresent[value=True]');
		var reason_element = $('#StudentRows_'+row_num+'__AbsenceReason');
		var remarks_element = $('#StudentRows_'+row_num+'__Remarks');

		students[row_num++] = { IDCardNo:id_element.val(),
								WasPresent:absent_element.prop('checked'),
								AbsenceReason:reason_element.val(),
								Remarks:remarks_element.val() };
	}

	//console.log(students); //print all IDs
	return students;
}