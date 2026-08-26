(function () {
  "use strict";

  /* Homepage narrative alignment.
     GGI and Intelligence Augmentation are explanatory sections in the same
     buyer-reading sequence as Mechanism. An older global editorial rule
     centers direct section headers, so these scoped overrides keep the full
     section content on the established left axis. */
  var narrativeAlignment = document.createElement("style");
  narrativeAlignment.textContent = [
    ".section.ggi > .shell > .section-number,",
    ".section.ggi > .shell > h2,",
    ".section.ggi > .shell > .category-line,",
    ".section.ggi > .shell > .category-context,",
    ".section.ia-split > .shell > .section-number,",
    ".section.ia-split > .shell > h2,",
    ".section.ia-split > .shell > .ia-prose {",
    "  margin-left: 0;",
    "  margin-right: 0;",
    "  text-align: left;",
    "}",
    "",
    ".deployment-close {",
    "  max-width: 760px;",
    "  margin: clamp(40px, 4.5vw, 60px) 0 0;",
    "  text-align: left;",
    "}",
    ".deployment-close .cta-note {",
    "  max-width: 45ch;",
    "  margin: clamp(16px, 1.8vw, 22px) 0 0;",
    "}",
    ".deployment-cta-banner {",
    "  width: 100%;",
    "  min-height: clamp(88px, 9vw, 122px);",
    "  display: flex;",
    "  align-items: center;",
    "  justify-content: space-between;",
    "  gap: 28px;",
    "  margin-top: clamp(48px, 5.5vw, 72px);",
    "  padding: 24px clamp(24px, 5vw, 72px);",
    "  background: var(--light);",
    "  color: var(--ink-950);",
    "  text-decoration: none;",
    "  border-top: 1px solid rgba(255,255,255,.18);",
    "  border-bottom: 1px solid rgba(255,255,255,.18);",
    "  transition: background-color 180ms ease, color 180ms ease;",
    "}",
    ".deployment-cta-banner:hover {",
    "  background: var(--copper);",
    "  color: var(--ink-950);",
    "}",
    ".deployment-cta-label {",
    "  font: 520 clamp(26px, 3.2vw, 46px)/1.1 var(--serif);",
    "  letter-spacing: -.02em;",
    "}",
    ".deployment-cta-arrow {",
    "  flex: 0 0 auto;",
    "  font: 400 clamp(30px, 3.5vw, 48px)/1 var(--sans);",
    "}",
    "@media (max-width: 640px) {",
    "  .deployment-cta-banner { padding-inline: 16px; }",
    "  .deployment-cta-label { font-size: clamp(24px, 7vw, 32px); }",
    "}"
  ].join("\n");
  document.head.appendChild(narrativeAlignment);

  /* Engagement close.
     Keep the competency statement and risk reversal on the established left
     reading axis, remove the redundant 'right fit' micro-headline, and turn
     the final action into a full-width page conclusion rather than a floating
     button. If script does not run, the original button remains in the HTML as
     a functional fallback. */
  var deploymentSection = document.querySelector(".deployment-section");
  if (deploymentSection) {
    var deploymentClose = deploymentSection.querySelector(".deployment-close");
    if (deploymentClose) {
      var deploymentButton = deploymentClose.querySelector("a.button");
      var deploymentNotes = Array.prototype.slice.call(deploymentClose.querySelectorAll(".cta-note"));

      deploymentNotes.forEach(function (note) {
        if (note.textContent.toLowerCase().indexOf("see if this is the right fit") !== -1) {
          note.remove();
        }
      });

      if (deploymentButton) {
        var banner = document.createElement("a");
        banner.className = "deployment-cta-banner";
        banner.href = deploymentButton.href;
        banner.setAttribute("aria-label", "Schedule a private conversation");

        var label = document.createElement("span");
        label.className = "deployment-cta-label";
        label.textContent = "Schedule a private conversation";

        var arrow = document.createElement("span");
        arrow.className = "deployment-cta-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "\u2192";

        banner.appendChild(label);
        banner.appendChild(arrow);
        deploymentButton.remove();
        deploymentSection.appendChild(banner);
      }
    }
  }

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

    document.addEventListener("click", function (event) {
      if (usesDesktopInteraction()) return;
      if (!lineage.contains(event.target)) setActive(0);
    });

    inputs.forEach(function (input, index) {
      if (input.checked) setActive(index);
    });
  }

  /* Governed-intelligence list.
     Native <details>, so every answer is reachable by click and readable with
     script disabled. On desktop, hovering opens an entry and closes the rest. */
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
