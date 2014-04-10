var youtrackUrl2Comment = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if ("message_id" in request && "youtrack_url" in request) {
    var messageId = request["message_id"];
    var youtrackUrl = request["youtrack_url"];

    if (messageId == "set_comment") {
      if ("comment" in request) {
        youtrackUrl2Comment[youtrackUrl] = request["comment"];
      }
    }
    else if (messageId == "delete_comment") {
      if (youtrackUrl in youtrackUrl2Comment) {
        delete youtrackUrl2Comment[youtrackUrl];
      }
    }
    else if (messageId == "get_comment") {
      var comment = null;

      if (youtrackUrl in youtrackUrl2Comment) {
        comment = youtrackUrl2Comment[youtrackUrl];
      }
      sendResponse({"comment": comment});
    }
  }
});