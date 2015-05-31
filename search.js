//torrentz
function sendquery(query){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://torrentz.eu/search?f='+query, true);
	xhr.onreadystatechange = function(){
		if (xhr.readyState==4 && xhr.status==200) {
			parsetorrents(xhr.responseText);
		}
	}
	xhr.send();
}

var magnetlinklist = [];

function parsetorrents(response){
	magnetlinklist = [];

	for(var i=0; i<100; i++){
		var start = 'a href="/';
		var end = '"';
		var sindex = response.indexOf(start) + start.length;
		console.log(response.slice(sindex, sindex+20));
		response = response.slice(sindex);
		var eindex = response.indexOf(end);
		var elementstr = response.slice(0, eindex);
		console.log(elementstr);
		if(elementstr.length==40){
			var starttitle = '">';
			var endtitle = '</a>'; 
			//var title = response.slice(response.indexOf(starttitle)+starttitle.length, response.indexOf(endtitle));
			var title = getstrbtw('">', '</a>',response);
			var size = getstrbtw('<span class="s">', '</span>',response);
			var up = getstrbtw('<span class="u">', '</span>',response);
			var down = getstrbtw('<span class="d">', '</span>',response);

			magnetlinklist.push({ml: elementstr, t: title, s:size, u:up, d:down}); //, s:size, u: up, d:down
		}

		if(magnetlinklist.length == 10){
			sendbackground('set_magnetlinklist', JSON.stringify(magnetlinklist));
			break;
		}
	}

	displaymagnets();
}	

function getstrbtw(start, end, str){
	var startindex = str.indexOf(start);
	str = str.substring(startindex+start.length);
	return str.slice(0, str.indexOf(end));
}

