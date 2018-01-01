try {
	var bgColor = 'LightGreen';
	var submitBtn = $("form :submit");
	submitBtn.css("background", bgColor);

	var countBtn = document.createElement("input");
	countBtn.setAttribute("type", "button");
	countBtn.value = "Count present";
	countBtn.className = submitBtn.attr('class');
	countBtn.style.background = bgColor;
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
	unitLbl.text("Unit (fill next 3)");
	unitLbl.css('text-decoration', 'underline');
	unitLbl.on('click', function(e) {
    	$( "#Unit" ).get(0).value = 'ITSFT-406-1502 - Programming Concepts';
		$( "#Session" ).get(0).value = '08:00';
		$( "#Duration" ).get(0).value = '2';
	});
}
catch(err) {
    console.log(err.message);
}
