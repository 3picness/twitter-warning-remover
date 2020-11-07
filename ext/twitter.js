code = `
window.oldJsonParse2 = window.JSON.parse;
window.oldJsonParse = window.oldJsonParse2;
window.JSON.parse = function(obj) {
	var y = window.oldJsonParse2(obj);
	console.log(y);
	if(y.timeline) {
		if((y.timeline.id.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/) || y.timeline.id.startsWith("Conversation-") || y.timeline.id.startsWith("Media-") || y.timeline.id.startsWith("search-") || y.timeline.id.startsWith("Home-") || y.timeline.id.startsWith("ProfileBest-")) && y.timeline.instructions && y.timeline.instructions[0] &&
		    y.timeline.instructions) {
			for(var i = 0; i < y.timeline.instructions.length; i++) {
				console.log("asdf");
				if(y.timeline.instructions[i].addEntries !== undefined) {
					console.log(y.timeline.instructions[i].addEntries);
					for(var j = 0; j < y.timeline.instructions[i].addEntries.entries.length; j++) {
						console.log(y.timeline.instructions[i].addEntries.entries[j].entryId);
						if(y.timeline.instructions[i].addEntries.entries[j].content.item && (y.timeline.instructions[i].addEntries.entries[j].entryId.startsWith("tweet-") || y.timeline.instructions[i].addEntries.entries[j].entryId.startsWith("sq-I-t-"))) {
							console.log("Filtering...");
							y.timeline.instructions[i].addEntries.entries[j].content.item.content.tweet.innerTombstoneInfo = null;
							y.timeline.instructions[i].addEntries.entries[j].content.item.content.tweet.innerForwardPivot = null;
							y.timeline.instructions[i].addEntries.entries[j].content.item.content.tweet.forwardPivot = null;
						} else if (y.timeline.instructions[i].addEntries.entries[j].entryId.startsWith("conversationThread-") &&  y.timeline.instructions[i].addEntries.entries[j].content.timelineModule) {
							var x = y.timeline.instructions[i].addEntries.entries[j].content.timelineModule.items;
							console.log(x.length, i)
							for(var k = 0; k < x.length; k++) {
								if(x[k].entryId.startsWith("tweet-") && x[k].item.content.tweet) {
									x[k].item.content.tweet.forwardPivot = null;
								}
							}
						} else if (y.timeline.instructions[i].addEntries.entries[j].entryId.startsWith("tombstone-")) {
							console.log("Removing tombstone");
							y.timeline.instructions[i].addEntries.entries[j].content.item.content.tombstone.tombstoneInfo = null;
							y.timeline.instructions[i].addEntries.entries[j].content.item.content.tombstone.tweet.forwardPivot = null;
						} else if (y.timeline.instructions[i].addEntries.entries[j].entryId.startsWith("homeConversation-") || y.timeline.instructions[i].addEntries.entries[j].entryId.startsWith("focal_module")) {
							var x = y.timeline.instructions[i].addEntries.entries[j].content.timelineModule.items;
							console.log("homeConversation / focal_module");
							for(var k = 0; k < x.length; k++) {
								if(x[k].entryId.startsWith("homeConversation-") || x[k].entryId.startsWith("focal_tweet:")) {
									console.log("Nuking homeConversation");
									if(x[k].entryId.startsWith("homeConversation-") && x[k].item.content.tombstone) {
										x[k].item.content.tombstone.tombstoneInfo = null;
										x[k].item.content.tombstone.tweet.forwardPivot = null;
									} else {
										x[k].item.content.tweet.forwardPivot = null;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	console.log(y);
    return y;
}`;
	var script = document.createElement("script");
	script.setAttribute("nonce", "");
	script.textContent = code;
	(document.head||document.documentElement).appendChild(script);