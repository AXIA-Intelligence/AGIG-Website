(function () {
  "use strict";

  /*
    Behavior layer only.
    Visual system and composition live in styles.css so first paint and
    post-JavaScript render use the same canonical CSS.
  */

  function createCtaBanner(href) {
    var banner = document.createElement("a");
    banner.className = "site-cta-banner";
    banner.href = href;
    banner.setAttribute("aria-label", "Schedule a private conversation");

    var content = document.createElement("span");
    content.className = "site-cta-content";

    var label = document.createElement("span");
    label.className = "site-cta-label";
    label.textContent = "Schedule a private conversation";

    var arrow = document.createElement("span");
    arrow.className = "site-cta-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "\u2192";

    content.appendChild(label);
    content.appendChild(arrow);
    banner.appendChild(content);
    return banner;
  }

  /* Homepage hero: move the action out of the copy block and make it a strip. */
  var hero = document.querySelector(".hero-top");
  if (hero) {
    var heroButton = hero.querySelector(".hero-actions a.button");
    if (heroButton) {
      var heroHref = heroButton.href;
      heroButton.remove();
      hero.insertAdjacentElement("afterend", createCtaBanner(heroHref));
    }
  }

  /* Homepage engagement: CTA, then risk-reversal support. */
  var deploymentSection = document.querySelector(".deployment-section");
  if (deploymentSection) {
    var deploymentClose = deploymentSection.querySelector(".deployment-close");
    if (deploymentClose) {
      var supportNote = null;
      Array.prototype.slice.call(deploymentClose.querySelectorAll(".cta-note")).forEach(function (note) {
        var noteText = note.textContent.toLowerCase();
        if (noteText.indexOf("see if this is the right fit") !== -1) {
          note.remove();
        } else if (noteText.indexOf("thirty minutes with the founder") !== -1) {
          supportNote = note;
        }
      });
      var deploymentButton = deploymentClose.querySelector("a.button");
      if (deploymentButton) {
        var deploymentHref = deploymentButton.href;
        deploymentButton.remove();
        deploymentSection.classList.add("has-terminal-cta");
        deploymentSection.appendChild(createCtaBanner(deploymentHref));
        if (supportNote) {
          supportNote.classList.add("site-cta-support");
          deploymentSection.appendChild(supportNote);
        }
      }
    }
  }

  /* About, Client Stories, and FAQ all use the same terminal CTA strip. */
  Array.prototype.slice.call(document.querySelectorAll(".about-invite")).forEach(function (section) {
    var inviteButton = section.querySelector(".cta-row a.button");
    if (!inviteButton) return;
    var inviteHref = inviteButton.href;
    var inviteNote = section.querySelector(".invite-note");
    inviteButton.remove();
    section.classList.add("has-site-cta");
    section.appendChild(createCtaBanner(inviteHref));
    if (inviteNote) {
      inviteNote.classList.add("site-cta-support");
      section.appendChild(inviteNote);
    }
  });

  /* Preserve legacy interactive components that remain on secondary pages. */
  var desktopQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  function usesDesktopInteraction() {
    return desktopQuery.matches && window.innerWidth > 640;
  }

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
    inputs.forEach(function (input, index) {
      input.addEventListener("change", function () { if (input.checked) setActive(index); });
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
      if (!usesDesktopInteraction() && !lineage.contains(event.target)) setActive(0);
    });
    inputs.forEach(function (input, index) { if (input.checked) setActive(index); });
  }

  var perks = document.querySelector("[data-perks]");
  if (perks) {
    var entries = Array.prototype.slice.call(perks.querySelectorAll("details"));
    var resting = entries[0];
    var closeOthers = function (active) {
      entries.forEach(function (entry) { if (entry !== active) entry.open = false; });
    };
    entries.forEach(function (entry) {
      var summary = entry.querySelector("summary");
      if (!summary) return;
      entry.addEventListener("toggle", function () { if (entry.open) closeOthers(entry); });
      summary.addEventListener("mouseenter", function () {
        if (usesDesktopInteraction()) { entry.open = true; closeOthers(entry); }
      });
      summary.addEventListener("focus", function () {
        if (usesDesktopInteraction()) { entry.open = true; closeOthers(entry); }
      });
    });
    perks.addEventListener("mouseleave", function () {
      if (usesDesktopInteraction() && resting) { resting.open = true; closeOthers(resting); }
    });
  }
})();