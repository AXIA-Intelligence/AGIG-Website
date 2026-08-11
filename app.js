(function () {
  "use strict";

  var desktopQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

  function usesDesktopInteraction() {
    return desktopQuery.matches && window.innerWidth > 640;
  }

  /* Lineage rail.
     The markup works with no JavaScript: it is a radio group, and CSS reveals
     the matching panel. This only adds the hover behaviour the copy promises
     ("hover a name") and the return-to-common-thread on mouse-out. The radio
     stays the single source of truth so the scripted and unscripted paths can
     never disagree and show two panels at once. */
  var lineage = document.querySelector("[data-lineage]");
  if (lineage) {
    var inputs = Array.prototype.slice.call(lineage.querySelectorAll(".lineage-input"));
    var nodes = Array.prototype.slice.call(lineage.querySelectorAll(".lineage-node"));

    var setActive = function (index) {
      inputs.forEach(function (input, i) { input.checked = i === index; });
      nodes.forEach(function (node, i) {
        if (i === index) node.setAttribute("data-selected", "");
        else node.removeAttribute("data-selected");
      });
      lineage.setAttribute("data-active", String(index + 1));
    };

    var clearActive = function () {
      inputs.forEach(function (input) { input.checked = false; });
      nodes.forEach(function (node) { node.removeAttribute("data-selected"); });
      lineage.removeAttribute("data-active");
    };

    inputs.forEach(function (input, index) {
      input.addEventListener("change", function () {
        if (input.checked) setActive(index);
      });
    });

    nodes.forEach(function (node, index) {
      node.addEventListener("mouseenter", function () {
        if (usesDesktopInteraction()) setActive(index);
      });
    });

    lineage.addEventListener("mouseleave", function () {
      if (usesDesktopInteraction()) setActive(0);
    });

    // Touch has no equivalent of mouseleave, so on a phone a panel opened by
    // tapping stayed open with no way back to the resting state. A tap
    // outside the rail is that way back. Gated to non-desktop so the
    // mouseleave path above stays the only reset on a pointer device.
    document.addEventListener("click", function (event) {
      if (usesDesktopInteraction()) return;
      if (!lineage.contains(event.target)) setActive(0);
    });

    // A radio checked by the browser on reload would leave the rail out of
    // step with the dot styling, so adopt whatever state we load with.
    inputs.forEach(function (input, index) {
      if (input.checked) setActive(index);
    });
  }

  /* Governed-intelligence list.
     Native <details>, so every answer is reachable by click and readable with
     script disabled. On desktop, hovering opens an entry and closes the rest.

     The first entry carries `open` in the markup and is the list's resting
     state, not just its initial one. A visitor arriving at a fully collapsed
     list has no way to know the rows do anything; one row already expanded
     and highlighted shows the behaviour before they touch it. So leaving the
     list returns to that first entry rather than collapsing everything, which
     would throw away the cue the moment the pointer wandered off. */
  var perks = document.querySelector("[data-perks]");
  if (perks) {
    var entries = Array.prototype.slice.call(perks.querySelectorAll("details"));
    var resting = entries[0];

    var closeOthers = function (active) {
      entries.forEach(function (entry) {
        if (entry !== active) entry.open = false;
      });
    };

    entries.forEach(function (entry) {
      var summary = entry.querySelector("summary");
      if (!summary) return;

      entry.addEventListener("toggle", function () {
        if (entry.open) closeOthers(entry);
      });

      summary.addEventListener("mouseenter", function () {
        if (usesDesktopInteraction()) {
          entry.open = true;
          closeOthers(entry);
        }
      });

      summary.addEventListener("focus", function () {
        if (usesDesktopInteraction()) {
          entry.open = true;
          closeOthers(entry);
        }
      });
    });

    perks.addEventListener("mouseleave", function () {
      if (usesDesktopInteraction() && resting) {
        resting.open = true;
        closeOthers(resting);
      }
    });
  }
})();
