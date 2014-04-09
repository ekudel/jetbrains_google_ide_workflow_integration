 var type = $("a[title^=Type\\:]").attr("title").substr(6).trim();
var template = encodeURIComponent(type == "Bug" ? "Android Studio bug" : "Feature request");
var summary = $("[id$=\\.issSum]").html().trim();

if (type != "Bug") {
  summary = "Android Studio: " + summary;
}
summary = encodeURIComponent(summary);
var description = $("[id$=\\.description] :first-child").html().replace(/<br>/g, "\n");
var currentUrl = document.URL;
var comment = encodeURIComponent("Originally reported here: " + currentUrl + "\n\n" + description);
var url = "https://code.google.com/p/android/issues/entry" +
    "?template=" + template +
    "&summary=" + summary +
    "&comment=" + comment;
$("[id$=\\.subContent]").append("<a target='_blank' href='" + url + "'>Report into AOSP tracker</a>");