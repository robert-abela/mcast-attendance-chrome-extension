
function runCountjs() {
  	chrome.tabs.executeScript({
    	file: 'count.js'
  });
}

//document.getElementById('clickme').addEventListener('click', runCountjs);