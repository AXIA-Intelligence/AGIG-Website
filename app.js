(function () {
  "use strict";

  /*
    AXIA Monochrome + CTA consistency layer.
    This file centralizes the approved visual system so Home, About,
    Client Stories, and FAQ share one visual and CTA language.
  */
  var style = document.createElement("style");
  style.id = "axia-site-system";
  style.textContent = `
    :root {
      --ink-950: #121315;
      --ink-900: #1C1C1E;
      --ink-800: #25272A;
      --paper: #DDD9D1;
      --paper-light: #E6E2DB;
      --warm: #C9C5BC;
      --text: #1C1C1E;
      --text-soft: #44474A;
      --light: #F2F0EA;
      --light-soft: #D7D9D6;
      --copper: #C9A84C;
      --copper-dark: #5E4816;
      --line: rgba(28, 28, 30, .22);
      --line-dark: rgba(242, 240, 234, .18);
    }

    body { background: var(--ink-950) !important; }
    ::selection { background: var(--copper); color: var(--ink-950); }

    /* Keep explanatory homepage sections on the established left reading axis. */
    .section.ggi > .shell > .section-number,
    .section.ggi > .shell > h2,
    .section.ggi > .shell > .category-line,
    .section.ggi > .shell > .category-context,
    .section.ia-split > .shell > .section-number,
    .section.ia-split > .shell > h2,
    .section.ia-split > .shell > .ia-prose {
      margin-left: 0;
      margin-right: 0;
      text-align: left;
    }

    .site-header {
      background: rgba(18, 19, 21, .94) !important;
      border-bottom-color: var(--line-dark) !important;
      backdrop-filter: blur(12px);
    }
    .site-header .wordmark,
    .site-header .nav-links a,
    .mobile-nav summary { color: var(--light) !important; }
    .mobile-nav-panel {
      background: var(--ink-900) !important;
      border-color: var(--line-dark) !important;
    }
    .mobile-nav-panel a { color: var(--light) !important; }
    .header-cta {
      background: transparent !important;
      border-color: var(--copper) !important;
      color: var(--light) !important;
      box-shadow: none !important;
    }
    .header-cta:hover {
      background: var(--copper) !important;
      color: var(--ink-950) !important;
    }

    .hero, .page-hero, .about-hero { background-color: var(--ink-950) !important; }
    .hero-scrim {
      background: linear-gradient(90deg, rgba(18,19,21,.97) 0%, rgba(18,19,21,.86) 43%, rgba(18,19,21,.34) 78%, rgba(18,19,21,.18) 100%) !important;
    }
    .hero h1, .hero-lede, .hero-support,
    .page-hero h1, .page-hero .hero-lede,
    .about-hero h1, .about-hero .lede { color: var(--light) !important; }
    .hero-eyebrow, .page-hero .eyebrow, .about-hero .eyebrow { color: var(--copper) !important; }

    .ink, .trust, .story-dark, .about-invite, .site-footer, .page-hero.stories-hero {
      background-color: var(--ink-900) !important;
      color: var(--light) !important;
    }
    .ggi, .trust { background-color: var(--ink-950) !important; }
    .ink h2, .ink h3, .trust h2, .trust h3,
    .story-dark h2, .story-dark h3 { color: var(--light) !important; }
    .ink p, .trust p, .story-dark p { color: var(--light-soft) !important; }
    .ink .section-number, .trust .section-number,
    .story-dark .eyebrow, .story-dark .proof-kicker { color: var(--copper) !important; }

    .preparation-section, .outcomes-section, .ia-split, .deployment-section {
      background: var(--paper) !important;
      color: var(--text) !important;
    }
    .preparation-section h2, .outcomes-section h2, .outcomes-section h3,
    .ia-split h2, .deployment-section h2, .deployment-section h3 { color: var(--text) !important; }
    .preparation-section .preparation-claim, .outcomes-section p,
    .ia-split .ia-prose p, .deployment-section .section-lede,
    .deployment-section .deployment-steps p,
    .deployment-section .cta-note { color: var(--text-soft) !important; }
    .preparation-section .section-number, .outcomes-section .section-number,
    .ia-split .section-number, .deployment-section .section-number,
    .deployment-steps li > span { color: var(--copper-dark) !important; }
    .outcome-card {
      background: rgba(28,28,30,.035) !important;
      border-color: var(--line) !important;
    }
    .deployment-steps li { border-bottom-color: var(--line) !important; }

    .proof-section .case-feature {
      background: var(--ink-800) !important;
      border-color: var(--line-dark) !important;
    }
    .proof-section .case-grid { border-color: var(--line-dark) !important; }
    .proof-section .case-grid > article { background: rgba(242,240,234,.045) !important; }
    .proof-section .case-grid > article + article { border-color: var(--line-dark) !important; }
    .proof-actions .text-link { color: var(--copper) !important; }

    .lineage-condensed-section {
      background: var(--ink-900) !important;
      color: var(--light) !important;
    }
    .lineage-condensed-section h2,
    .lineage-condensed-section .lineage-four-name { color: var(--light) !important; }
    .lineage-condensed-section p { color: var(--light-soft) !important; }
    .lineage-condensed-section .section-number,
    .lineage-condensed-section .lineage-four-year { color: var(--copper) !important; }

    .trust-points h3 { color: var(--copper) !important; }
    .trust .canonical-statement, .trust-points p { color: var(--light-soft) !important; }

    .editorial, .about-copy, .story-light, .story-index, .about-invite.invite-light {
      background: var(--paper) !important;
      color: var(--text) !important;
    }
    .editorial p, .about-copy p, .story-light p,
    .about-invite.invite-light p { color: var(--text-soft) !important; }
    .editorial h1, .editorial h2, .editorial h3,
    .story-light h2, .story-light h3,
    .about-invite.invite-light h2 { color: var(--text) !important; }
    .story-index { border-color: var(--line) !important; }
    .story-index a { color: var(--text) !important; }
    .story-index span { color: var(--text-soft) !important; }
    .claim-boundary {
      background: rgba(28,28,30,.035) !important;
      border-color: var(--line) !important;
    }
    .story-dark .claim-boundary {
      background: rgba(201,168,76,.07) !important;
      border-color: var(--line-dark) !important;
    }
    .about-invite.invite-light .eyebrow { color: var(--copper-dark) !important; }

    .faq-section { background: var(--ink-900) !important; color: var(--light) !important; }
    .faq-section .eyebrow { color: var(--copper) !important; }
    .faq-section .accordion details { border-color: var(--line-dark) !important; }
    .faq-section .accordion summary { color: var(--light) !important; }
    .faq-section .accordion summary::after { color: var(--copper) !important; }
    .faq-section .accordion details > div,
    .faq-section .accordion details > div p { color: var(--light-soft) !important; }

    .button-primary {
      background: var(--light) !important;
      color: var(--ink-950) !important;
      border-color: var(--light) !important;
    }
    .button-primary:hover {
      background: var(--copper) !important;
      color: var(--ink-950) !important;
      border-color: var(--copper) !important;
    }

    .deployment-close {
      width: 100%;
      max-width: none;
      margin: clamp(40px, 4.5vw, 60px) 0 clamp(34px, 4vw, 56px);
      text-align: left;
    }
    .deployment-section.has-terminal-cta {
      padding-bottom: 0 !important;
    }

    /* One CTA language across Home, About, Client Stories, and FAQ. */
    .site-cta-banner {
      width: 100%;
      min-height: clamp(88px, 9vw, 122px);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      text-align: center;
      padding: 24px clamp(24px, 5vw, 72px);
      background: var(--copper);
      color: var(--ink-950);
      text-decoration: none;
      border-top: 1px solid rgba(18,19,21,.22);
      border-bottom: 1px solid rgba(18,19,21,.22);
      transition: background-color 180ms ease, color 180ms ease;
      z-index: 3;
    }
    .site-cta-banner:hover {
      background: var(--ink-950);
      color: var(--light);
    }
    .site-cta-content {
      max-width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: clamp(14px, 1.8vw, 26px);
    }
    .site-cta-label {
      width: auto;
      min-width: 0;
      padding-inline: 0;
      text-align: center;
      font: 520 clamp(26px, 3.2vw, 46px)/1.1 var(--serif);
      letter-spacing: -.02em;
    }
    .site-cta-arrow {
      position: static;
      flex: 0 0 auto;
      transform: none;
      font: 400 clamp(30px, 3.5vw, 48px)/1 var(--sans);
    }
    .site-cta-support {
      width: 100%;
      margin: 0 !important;
      padding: clamp(18px, 2.2vw, 28px) clamp(24px, 5vw, 72px) clamp(28px, 3.5vw, 44px);
      text-align: center;
      text-wrap: balance;
      color: var(--text-soft) !important;
      background: var(--paper);
    }

    .hero-actions:empty,
    .about-invite .cta-row:empty { display: none !important; }
    .about-invite.has-site-cta { padding-bottom: 0 !important; }
    .about-invite.has-site-cta .scene-content { padding-bottom: clamp(48px, 6vw, 84px); }

    .site-footer { border-top-color: var(--line-dark) !important; }
    .site-footer a, .site-footer .wordmark { color: var(--light-soft) !important; }

    @media (max-width: 640px) {
      .deployment-close {
        margin-bottom: clamp(28px, 8vw, 40px);
      }
      .site-cta-support {
        padding-inline: 22px;
        line-height: 1.45;
      }
      .site-cta-banner { min-height: 92px; padding-inline: 16px; }
      .site-cta-content { gap: 14px; }
      .site-cta-label { font-size: clamp(24px, 7vw, 32px); padding-inline: 0; }
      .preparation-section, .outcomes-section, .ia-split, .deployment-section {
        background: var(--paper) !important;
      }
    }
  `;
  document.head.appendChild(style);

  var themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute("content", "#121315");

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

  /* Homepage engagement: competency statement, CTA, then risk-reversal support. */
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

  /* Preserve any legacy interactive components that remain on secondary pages. */
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