// Segment - Source: 'Docs (Fern)'
// Adapted to disable Fern's existing Segment integration
// and load the Segment snippet with the correct write key

// Disable existing Segment script
if (window.analytics) {
  window.analytics = null;
}
!(function () {
  var i = "analytics",
    analytics = (window[i] = window[i] || []);
  if (!analytics.initialize)
    if (analytics.invoked) {
      window.console &&
        console.error &&
        console.error(
          "Segment snippet included twice. Carrying on regardless."
        );
    }

  analytics.invoked = !0;
  analytics.methods = [
    "trackSubmit",
    "trackClick",
    "trackLink",
    "trackForm",
    "pageview",
    "identify",
    "reset",
    "group",
    "track",
    "ready",
    "alias",
    "debug",
    "page",
    "screen",
    "once",
    "off",
    "on",
    "addSourceMiddleware",
    "addIntegrationMiddleware",
    "setAnonymousId",
    "addDestinationMiddleware",
    "register",
  ];
  analytics.factory = function (e) {
    return function () {
      if (window[i].initialized)
        return window[i][e].apply(window[i], arguments);
      var n = Array.prototype.slice.call(arguments);
      if (
        ["track", "screen", "alias", "group", "page", "identify"].indexOf(e) >
        -1
      ) {
        var c = document.querySelector("link[rel='canonical']");
        n.push({
          __t: "bpc",
          c: (c && c.getAttribute("href")) || void 0,
          p: location.pathname,
          u: location.href,
          s: location.search,
          t: document.title,
          r: document.referrer,
        });
      }
      n.unshift(e);
      analytics.push(n);
      return analytics;
    };
  };
  for (var n = 0; n < analytics.methods.length; n++) {
    var key = analytics.methods[n];
    analytics[key] = analytics.factory(key);
  }
  analytics.load = function (key, n) {
    var t = document.createElement("script");
    t.type = "text/javascript";
    t.async = !0;
    t.setAttribute("data-global-segment-analytics-key", i);
    t.src =
      "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
    var r = document.getElementsByTagName("script")[0];
    r.parentNode.insertBefore(t, r);
    analytics._loadOptions = n;
  };
  analytics._writeKey = "hr64X7UjPFaeFeImP4SUNld9NDXDrFHs";
  analytics.SNIPPET_VERSION = "5.2.0";
  analytics.load("hr64X7UjPFaeFeImP4SUNld9NDXDrFHs");
  analytics.page();
})();
// End Segment

// Function to duplicate and rename the API Reference tab
function duplicateAndRenameTab() {
  console.log("Function duplicateAndRenameTab started");

  // Find the nav element with aria-label="tabs"
  const tabsNav = document.querySelector('nav[aria-label="tabs"]');

  if (!tabsNav) {
    console.error("Tabs navigation not found");
    return;
  }

  console.log("Tabs navigation found");

  // Find the API Reference tab
  const apiReferenceTab = Array.from(tabsNav.querySelectorAll("li")).find(
    (li) => {
      const text = li.textContent.trim().toLowerCase();
      console.log("Checking tab:", text);
      return text === "api reference";
    }
  );

  if (!apiReferenceTab) {
    console.error("API Reference tab not found");
    return;
  }

  console.log("API Reference tab found");

  // Clone the API Reference tab
  const changelogTab = apiReferenceTab.cloneNode(true);

  // Update the text content to "Changelog"
  const tabContent = changelogTab.querySelector(".truncate");
  if (tabContent) {
    tabContent.textContent = "Changelog";
    console.log("Tab text updated to Changelog");
  } else {
    console.error("Could not find .truncate element in the cloned tab");
  }

  // Update the href attribute
  const tabLink = changelogTab.querySelector("a");
  if (tabLink) {
    tabLink.href = "/v4/api-reference/changelog";
    // Replace the icon with a clock icon
    const iconSpan = tabLink.querySelector(".fa-icon");
    if (iconSpan) {
      iconSpan.style.maskImage =
        'url("https://icons.ferndocs.com/light/clock.svg")';
      iconSpan.style.webkitMaskImage =
        'url("https://icons.ferndocs.com/light/clock.svg")';
    }
    console.log("Tab href updated", tabLink.href);
  } else {
    console.error("Could not find anchor element in the cloned tab");
  }

  // Insert the new tab after the API Reference tab
  apiReferenceTab.parentNode.insertBefore(
    changelogTab,
    apiReferenceTab.nextSibling
  );

  console.log("Changelog tab added successfully");
}

// Function to run when the DOM is loaded
function onDOMLoaded() {
  console.log("DOM fully loaded");
  duplicateAndRenameTab();
}

// Run the function when the DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onDOMLoaded);
} else {
  // DOM already loaded, run the function immediately
  onDOMLoaded();
}

// Fallback: If the tab is not added after a short delay, try again
setTimeout(() => {
  if (!document.querySelector('nav[aria-label="tabs"] li:nth-child(3)')) {
    console.log("Tab not added, trying again");
    duplicateAndRenameTab();
  }
}, 1000);
