import SPFormUrlMatcher from "./SPFormUrlMatcher/SPFormUrlMatcher";

chrome.runtime.onInstalled.addListener(details => {
  console.log("previousVersion", details.previousVersion);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (SPFormUrlMatcher.IsSPFormUrl(tab.url)) {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, { file: "scripts/vendor/jquery.min.js" }, function() {
    chrome.tabs.executeScript(tab.id, { file: "scripts/contentscript.js" });
  });
});