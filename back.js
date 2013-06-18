function onClick(info, tab) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, {});
	});
}

chrome.contextMenus.create({
	"title": "Crop Element", 
	"contexts": ["all"], 
	"onclick": onClick
});

