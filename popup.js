  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-40677033-1']);
  _gaq.push(['_trackPageview']);

  (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

var googleAuth = new OAuth2('google', {
  client_id: '17755888930840',
  client_secret: 'b4a5741bd3d6de6ac591c7b0e279c9f',
  api_scope: 'https://www.googleapis.com/auth/tasks'
});

// Get a reference to the root of the chat data.
var messagesRef = new Firebase('https://firechatext.firebaseIO.com/');
var tablink;
var uname = localStorage['_firechat_uname'] === undefined ? null : localStorage['_firechat_uname'];

$(function() {
    if (uname == null) {
        $("#messageInput").hide();
        $("#mainOutput").hide();
    } else {
        $('#nameInput').hide();
        $('#firstScreen').hide();
    }
});

// When the user presses enter on the message input, write the message to firebase.
$('#messageInput').keypress(function (e) {
    if (e.keyCode != 13)
        return;

    if (uname != null) {
        var text = $('#messageInput').val().slice(0, 35);
        messagesRef.push({ name: uname, text: text, url: tablink, date: new Date().toJSON().replace("T", " ") });
        $('#messageInput').val('');
    }
});


// while still no name
$('#nameInput').keypress(function(e) {
    if (e.keyCode != 13)
        return;

    uname = $('#nameInput').val();
    if (uname.length) {
        $("#mainOutput").show();
        $("#messageInput").show();
        $('#nameInput').hide();
        $('#firstScreen').hide();
        localStorage['_firechat_uname'] = uname;
    } else {
        uname = null;
    }
});

// Add a callback that is triggered for each chat message.
messagesRef.limit(10).on('child_added', function (snapshot) {
    var message = snapshot.val();
    if (message.url === tablink) {
        var msg = $('#messagesDiv').html();
        msg += "<span><br/>" + message.name + ": " + message.text + "</span><span id='time'>" + message.date.slice(0,16)+ "</span>";
        $('#messagesDiv').html(msg);
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    }
});

chrome.tabs.getSelected(null, function (tab) {
    tablink = tab.url;
    tablink = tablink.slice(0, 50) + "..";
    $("#url").html(tablink);
});

