code = `window.oldJsonParse = window.JSON.parse;
window.JSON.parse = function(obj) {
    var y = window.oldJsonParse(obj);
    if(y.timeline) {
        if(y.timeline.id.startsWith("Conversation-") && y.timeline.instructions && y.timeline.instructions[0] &&
           y.timeline.instructions[0].addEntries) {
               y.timeline.instructions[0].addEntries.entries[0].content.item.content.tweet.innerTombstoneInfo = null;
               y.timeline.instructions[0].addEntries.entries[0].content.item.content.tweet.innerForwardPivot = null;
	           y.timeline.instructions[0].addEntries.entries[0].content.item.content.tweet.forwardPivot = null;
        }
    }
    return y;
}`;
	var script = document.createElement("script");
	script.setAttribute("nonce", "");
	script.textContent = code;
	(document.head||document.documentElement).appendChild(script);