

var elems = document.getElementsByClassName("waspresent");
var i=0, e, isChecked = 0;
while(e=elems[i++]){
	if (e.checked)
		isChecked++;
}
alert(isChecked + " of " + elems.length + " present");

