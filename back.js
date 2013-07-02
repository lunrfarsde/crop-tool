var croppedTabs = [];

var mainMenuItemId = chrome.contextMenus.create({
	"title": "Crop Tools", 
	"contexts": ["all"]
});

chrome.contextMenus.create({
	"parentId": mainMenuItemId,
	"title": "Crop", 
	"contexts": ["all"],
	"onclick": function(info, tab) {
		croppedTabs.push(tab.id);
		chrome.tabs.sendMessage(tab.id, {action: "crop"});
		
		chrome.contextMenus.update(upMenuItemId, {
			"enabled": true,
		});
		
		chrome.contextMenus.update(resetMenuItemId, {
			"enabled": true,
		});
	}
});

var upMenuItemId = chrome.contextMenus.create({
	"parentId": mainMenuItemId,
	"title": "Up", 
	"contexts": ["all"],
	"enabled": false,
	"onclick": function(info, tab) {
		chrome.tabs.sendMessage(tab.id, {action: "up"}, function(response) {
			croppedTabs.splice(croppedTabs.indexOf(tab.id), 1);
			chrome.contextMenus.update(upMenuItemId, {
				"enabled": false
			});
			chrome.contextMenus.update(resetMenuItemId, {
				"enabled": false
			});			
		});	
	}
});

var resetMenuItemId = chrome.contextMenus.create({
	"parentId": mainMenuItemId,
	"title": "Reset", 
	"contexts": ["all"],
	"enabled": false,
	"onclick": function(info, tab) {
		chrome.tabs.sendMessage(tab.id, {action: "reset"});	
		chrome.contextMenus.update(upMenuItemId, {
			"enabled": false
		});
		chrome.contextMenus.update(resetMenuItemId, {
			"enabled": false
		});
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	var enable = croppedTabs.indexOf(activeInfo.tabId) !== -1;
	chrome.contextMenus.update(upMenuItemId, {
		"enabled": enable
	});
	chrome.contextMenus.update(resetMenuItemId, {
		"enabled": enable
	});
});