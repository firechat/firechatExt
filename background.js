ext_magnetlinklist = [];
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.msg){
   	 		case "get_magnetlinklist":
				sendResponse({msg: request.msg, val:JSON.stringify(ext_magnetlinklist)}); 
				break;
			case "set_magnetlinklist":
				ext_magnetlinklist = JSON.parse(request.val);
				break;
			}
		});