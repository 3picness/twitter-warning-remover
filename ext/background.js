const rewriteHeaders = function(e) {
  for (var i = 0; i < e.responseHeaders.length; i++) {
    if (e.responseHeaders[i].name.toLowerCase() === 'content-security-policy') {
      e.responseHeaders[i].value = '';
    }
  }
	return {responseHeaders: e.responseHeaders};
}

chrome.webRequest.onHeadersReceived.addListener(rewriteHeaders,
                                          {urls: ["*://*.twitter.com/*"]},
                                          ["blocking", "responseHeaders"]);
										  