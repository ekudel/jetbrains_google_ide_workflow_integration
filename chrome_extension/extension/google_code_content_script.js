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
}

initGoogleCode();