var serverhost = 'http://127.0.0.1:8000';

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
		  
			  
			var url = serverhost + '/NER_Extension/NERSCan/?topic='+ encodeURIComponent(request.topic) ;
			
			console.log(url);
			
			fetch(url)
			.then(response => response.json())
			.then(response => sendResponse({farewell: response}))
			.catch(error => console.log(error))
				
			return true;  // Will respond asynchronously.
		  
	});