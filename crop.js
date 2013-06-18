var clickedElement;

document.addEventListener("mouseup", function(event){
    if (event.which === 3)
		clickedElement = event.target;
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		document.body.innerHTML = "";
		document.body.appendChild(clickedElement);
	}
);