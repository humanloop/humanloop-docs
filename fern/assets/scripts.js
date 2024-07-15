// Segment - Source: 'Docs (Fern)'
// Adapted to disable Fern's existing Segment integration
// and load the Segment snippet with the correct write key

const CDN_URL = "https://humanloop.com/cdn/analytics.js/v1/";
const EVENT_PROXY = "app.humanloop.com/edn/v1";
const WRITE_KEY = "hr64X7UjPFaeFeImP4SUNld9NDXDrFHs";

// Disable existing Segment script
if (window.analytics) {
  window.analytics = null;
}
!(function () {
  var i = "analytics",
    analytics = (window[i] = window[i] || []);

  // This bit is custom
  if (!analytics.initialize)
    if (analytics.invoked) {
      window.console &&
        console.error &&
        console.error(
          "Segment snippet included twice. Carrying on regardless."
        );
    }
  // The rest is default... except for using a proxy URL to avoid ad blockers.
  // Edit: I'm not convinced the proxy logic is helping at all.
  // The segment script is still blocked even on our CDN.
  // And in my network tab, I can't see segment events being sent to a different location.
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
    // CUSTOM: Proxy the CDN
    // GET  /cdn/v1/project/<writekey>/settings -> http://cdn.segment.com/v1/projects/<writekey>/settings
    // GET /cdn/next-integrations/actions/...js -> https://cdn.segment.com/next-integrations/actions/...js ->
    t.src = CDN_URL + key + "/analytics.min.js";
    var r = document.getElementsByTagName("script")[0];
    r.parentNode.insertBefore(t, r);
    analytics._loadOptions = n;
  };
  analytics._writeKey = WRITE_KEY;
  analytics.SNIPPET_VERSION = "5.2.0";
  // CUSTOM: proxy the events
  analytics.load(WRITE_KEY, {
    integrations: {
      "Segment.io": {
        apiHost: EVENT_PROXY,
      },
    },
  });
  analytics.page();
})();
// End Segment
