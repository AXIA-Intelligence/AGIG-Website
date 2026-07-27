(function () {
  "use strict";

  var timeline = document.querySelector("[data-history-timeline]");
  if (timeline) {
    var entries = Array.prototype.slice.call(timeline.querySelectorAll("details"));
    var desktopQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    function usesDesktopInteraction() {
      return desktopQuery.matches && window.innerWidth > 640;
    }

    function closeOtherEntries(active) {
      entries.forEach(function (entry) {
        if (entry !== active) entry.open = false;
        var summary = entry.querySelector("summary");
        if (summary) summary.setAttribute("aria-expanded", entry.open ? "true" : "false");
      });
    }

    entries.forEach(function (entry, index) {
      var summary = entry.querySelector("summary");
      var body = entry.querySelector(".tl-body");
      if (!summary || !body) return;

      if (!body.id) body.id = "history-entry-" + (index + 1);
      summary.setAttribute("aria-controls", body.id);
      summary.setAttribute("aria-expanded", entry.open ? "true" : "false");

      entry.addEventListener("toggle", function () {
        if (entry.open) closeOtherEntries(entry);
        summary.setAttribute("aria-expanded", entry.open ? "true" : "false");
      });

      summary.addEventListener("mouseenter", function () {
        if (usesDesktopInteraction()) {
          entry.open = true;
          closeOtherEntries(entry);
        }
      });

      summary.addEventListener("focus", function () {
        if (usesDesktopInteraction()) {
          entry.open = true;
          closeOtherEntries(entry);
        }
      });
    });
  }
})();
