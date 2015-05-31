
function sendbackground(msg,val){
	var sendobj = {};
	if(typeof val === "undefined")
		sendobj = {msg: msg};
	else
		sendobj = {msg: msg, val: val};

	chrome.extension.sendMessage(sendobj , function(response) {
		switch(response.msg){
			case "get_magnetlinklist":
				magnetlinklist = JSON.parse(response.val);
				if(magnetlinklist.length>0)
					displaymagnets();
				break;
		}
	});
}

function displaymagnets(){
	debugger;
	//<a href="magnet:?xt=urn:btih:
	var magnetlinkrefstr = "";
	//$("#magnetlinklist").html("");
	for(var i=0; i<magnetlinklist.length; i++){
		magnetlinkrefstr += '<div class="t"><a href="magnet:?xt=urn:btih:'+magnetlinklist[i].ml+'"">'
		+magnetlinklist[i].t+'</a></div>'
		+'<div class="s">'+magnetlinklist[i].s+'</div>'
		+'<div class="u">'+magnetlinklist[i].u+'</div>'
		+'<div class="d">'+magnetlinklist[i].d+'</div>'
		+'</br></br>'
	}
	magnetlinkrefstr += "";
	$("#magnetlinklist").html(magnetlinkrefstr);
}
