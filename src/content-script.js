try {
	var bgColor = 'LightGreen';
	var submitBtn = $("form :submit");
	submitBtn.css("background", bgColor);

	var newButton = document.createElement("input");
	newButton.setAttribute("type", "button");
	newButton.value = "Count present";
	newButton.className = submitBtn.attr('class');
	newButton.style.background = bgColor;
	newButton.style.marginRight='6px';

	newButton.addEventListener ("click", function() {
	  	var elems = document.getElementsByClassName("waspresent");
		var isChecked = $('.waspresent:radio:checked').length;
		newButton.value = 'Count present ('+isChecked+' of '+elems.length+')';
	});

	// Get a reference to the parent node
	var parent = submitBtn.parent().get(0);
	var insertedNode = parent.insertBefore(newButton, submitBtn.get(0));
}
catch(err) {
    console.log(err.message);
}
