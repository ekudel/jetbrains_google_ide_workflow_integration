function initYoutrack() {
  var subsystem = $("a[title^=Subsystem\\:]").attr("title").substr(11).trim();

  if (subsystem != "Android") {
    return;
  }
  var type = $("a[title^=Type\\:]").attr("title").substr(6).trim();
  var template = encodeString(type == "Feature" ? "Tools feature request" : "Android Studio bug");
  var summary = $("[id$=\\.issSum]").html().trim();

  if (type != "Bug") {
    summary = "Android Studio: " + summary;
  }
  summary = encodeString(summary);
  var description = htmlToText($("[id$=\\.description] :first-child").html());
  var currentUrl = document.URL;
  var comment = "Originally reported here: " + currentUrl + "\n\n" + description;
  var newAospIssueUrl = "https://code.google.com/p/android/issues/entry" +
      "?template=" + template +
      "&summary=" + summary +
      "&youtrack_url=" + currentUrl;
  var issues = [];

  $("a[href^=https\\:\\/\\/code\\.google\\.com\\/p\\/android\\/issues\\/detail\\?id\\=]").each(function () {
    var href = $(this).attr("href");
    var idx = href.lastIndexOf("id=");

    if (idx >= 0) {
      var issueId = href.substr(idx + 3);
      issues.push("<a target='_blank' href='" + href + "'>" + issueId + "</a>");
    }
  });
  var issuesStr = issues.join(", ");

  if (issuesStr.length > 0) {
    issuesStr += ", ";
  }
  $("[id$=\\.subContent]").append("Related AOSP issues: " + issuesStr +
  "<a target='_blank' href='" + newAospIssueUrl + "'>New</a>");
  chrome.runtime.sendMessage({
    "message_id": "set_comment",
    "youtrack_url": currentUrl,
    "comment": comment
  });

  $(window).unload(function () {
    chrome.runtime.sendMessage({
      "message_id": "delete_comment",
      "youtrack_url": currentUrl
    });
  });
}

function htmlToText(html) {
  html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
  html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
  html = html.replace(/<\/div>/ig, '\n');
  html = html.replace(/<\/li>/ig, '\n');
  html = html.replace(/<li>/ig, '  *  ');
  html = html.replace(/<\/ul>/ig, '\n');
  html = html.replace(/<\/p>/ig, '\n');
  html = html.replace(/<br\s*[\/]?>/gi, "\n");
  html = html.replace(/<[^>]+>/ig, '');
  return html;
}

function encodeString(s) {
  return encodeURIComponent(s).replace(/'/g, "%27");
}

initYoutrack();