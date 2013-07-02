var origBody;
var clickedElem;
var currElem;

document.addEventListener("mouseup", function(event){
    if (event.which === 3)
		clickedElem = event.target;
});

function clearBody() {
	while (document.body.hasChildNodes()) {
		document.body.removeChild(document.body.lastChild);
	}
}

var isFound;
var foundElem;
var parentElem;

function search(elem, searched) {
	if (elem.isEqualNode(searched)) {
		foundElem = searched;
		isFound = true;
	}
	else if (!isFound) {
		for (var i = 0; i < elem.children.length; i++) {
			parentElem = elem;
			search(elem.children[i], searched);
			if (isFound) return;
		}
	}
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action === "crop") {
			origBody = document.body.cloneNode(true);
			clearBody();
			document.body.appendChild(clickedElem.cloneNode(true));
			currElem = clickedElem;
		}
		else if (request.action === "up") {
			//document.body.innerHTML = "";
			isFound = false;
			//search(origBody, document.body.children[0]);
			search(origBody, currElem);
			clearBody();
			if (parentElem.isEqualNode(origBody)) { 
				document.body = origBody.cloneNode(true);
				sendResponse({action: "reset"});
			}
			else 
				document.body.appendChild(parentElem.cloneNode(true));
				
			currElem = parentElem;
		}
		else if (request.action === "reset") {
			document.body = origBody.cloneNode(true);
		}
	}
);