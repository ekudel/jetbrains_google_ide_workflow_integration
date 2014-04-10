function getParam(name) {
  if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
    return decodeURIComponent(name[1]);
  }
  return null;
}

function initGoogleCode() {
  var summaryInput = $("input#summary");
  summaryInput.trigger("click");
  var summary = getParam("summary");
  summaryInput.val(summary);
  var youtrackUrl = getParam("youtrack_url");

  if (youtrackUrl != null) {
    chrome.runtime.sendMessage({"message_id": "get_comment", "youtrack_url": youtrackUrl}, function (response) {
      if ("comment" in response) {
        var comment = response["comment"];
        $("textarea[name=comment]").val(comment);
      }
    });
  }
}

initGoogleCode();