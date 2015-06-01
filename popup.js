  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-40677033-1']);
  _gaq.push(['_trackPageview']);

  (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

var tablink;
var uname = localStorage['_firechat_uname'] === undefined ? null : localStorage['_firechat_uname'];

var tabUrl = "";

function getTabUrl() {
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(arrayOfTabs) {
     // since only one tab should be active and in the current window at once
     // the return variable should only have one entry
     $("#url").html(arrayOfTabs[0].url);
  });
}

function loadMsgHistory(){

    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(arrayOfTabs) {
     // since only one tab should be active and in the current window at once
     // the return variable should only have one entry
      tabUrl = arrayOfTabs[0].url;

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange=function()
      {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
       {
          var json = JSON.parse(JSON.parse(xmlhttp.responseText));
          var htmls = "";
          for(var i=0; i<json.length; i++) {
             htmls += "<b>"+ json[i]["username"]+"@"+json[i]["time"]+":&nbsp"+"</b><i>"+json[i]["message"]+"</i><br/>";
          }
          debugger;
          $("#messagesDiv").html(htmls);
        }
      }

      var apiCall = "http://52.10.208.122/firechat/api/values?&url=" + tabUrl;
      xmlhttp.open("GET", apiCall,true);
      xmlhttp.send();
  });
}

$(function() {
    getTabUrl();
    loadMsgHistory();
    if (uname == null) {
        $("#messageInput").hide();
        $("#mainOutput").hide();
        $("#messageInput").hide();
        $("#currentSite").hide();
    } else {
        $("#currentSite").show();
        $('#nameInput').hide();
        $('#firstScreen').hide();
    }
});

// When the user presses enter on the message input, write the message to firechat api.
$('#messageBox').keypress(function (e) {
    if (e.keyCode != 13)
        return;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        loadMsgHistory();
        $("#messageBox").val("");
      }
    }

    var msg = $("#messageBox").val();
    var url = $("#url").html();
    var apiCall = "http://52.10.208.122/firechat/api/values?&user=" + uname + "&msg=" + msg + "&url=" + url;
    xmlhttp.open("GET", apiCall,true);
    xmlhttp.send();
});


// while still no name
$('#nameInput').keypress(function(e) {
    if (e.keyCode != 13)
        return;

    uname = $('#nameInput').val().substring(0,22);
    if (uname.length) {
        $("#mainOutput").show();
        $("#messageBox").show();
        $('#nameInput').hide();
        $('#firstScreen').hide();
        $("#currentSite").show();
        $("#messageInput").show();
        localStorage['_firechat_uname'] = uname;
    } else {
        uname = null;
    }
});