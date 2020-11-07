code = `
window.oldJsonParse2 = window.JSON.parse;
window.oldJsonParse = window.oldJsonParse2;
window.JSON.parse = function(obj) {
	var y = window.oldJsonParse2(obj);
	if(y.timeline) {
		  if((y.timeline.id.startsWith("Conversation-") || y.timeline.id.startsWith("Home-")) && y.timeline.instructions && y.timeline.instructions[0] &&
			 y.timeline.instructions) {
				for(var i = 0; i < y.timeline.instructions.length; i++) {
					console.log("asdf");
					if(y.timeline.instructions[i].addEntries) {
						for(var j = 0; j < y.timeline.instructions[i].addEntries.entries.length; j++) {
							if(y.timeline.instructions[i].addEntries.entries[j].content.item) {
								y.timeline.instructions[i].addEntries.entries[j].content.item.content.tweet.innerTombstoneInfo = null;
								y.timeline.instructions[i].addEntries.entries[j].content.item.content.tweet.innerForwardPivot = null;
								y.timeline.instructions[i].addEntries.entries[j].content.item.content.tweet.forwardPivot = null;
							}
						}
					}
				}
			}
	}
     return y;
}`;
	var script = document.createElement("script");
	script.setAttribute("nonce", "");
	script.textContent = code;
	(document.head||document.documentElement).appendChild(script);