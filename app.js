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

  /* AXIA MONOCHROME — reversible live theme trial, 2026-08-26.
     Research hypothesis: distinctive low-chroma visual identity, controlled
     luminance, high body-text contrast, and canonical AXIA amber used as a
     signal rather than decoration. No copy, information architecture, or
     typography changes are part of this trial. */
  var axiaTheme = document.createElement("style");
  axiaTheme.id = "axia-monochrome-trial";
  axiaTheme.textContent = [
    ":root {",
    "  --ink-950: #121315;",
    "  --ink-900: #1C1C1E;",
    "  --ink-800: #25272A;",
    "  --paper: #DDD9D1;",
    "  --paper-light: #E6E2DB;",
    "  --warm: #C9C5BC;",
    "  --text: #1C1C1E;",
    "  --text-soft: #44474A;",
    "  --light: #F2F0EA;",
    "  --light-soft: #D7D9D6;",
    "  --copper: #C9A84C;",
    "  --copper-dark: #5E4816;",
    "  --line: rgba(28, 28, 30, .22);",
    "  --line-dark: rgba(242, 240, 234, .18);",
    "}",
    "body { background: var(--ink-950) !important; }",
    "::selection { background: var(--copper); color: var(--ink-950); }",
    "",
    ".site-header {",
    "  background: rgba(18, 19, 21, .94) !important;",
    "  border-bottom-color: var(--line-dark) !important;",
    "  backdrop-filter: blur(12px);",
    "}",
    ".site-header .wordmark, .site-header .nav-links a, .mobile-nav summary { color: var(--light) !important; }",
    ".mobile-nav-panel { background: var(--ink-900) !important; border-color: var(--line-dark) !important; }",
    ".mobile-nav-panel a { color: var(--light) !important; }",
    ".header-cta {",
    "  background: transparent !important;",
    "  border-color: var(--copper) !important;",
    "  color: var(--light) !important;",
    "  box-shadow: none !important;",
    "}",
    ".header-cta:hover { background: var(--copper) !important; color: var(--ink-950) !important; }",
    "",
    ".hero, .page-hero, .about-hero { background-color: var(--ink-950) !important; }",
    ".hero-scrim {",
    "  background: linear-gradient(90deg, rgba(18,19,21,.97) 0%, rgba(18,19,21,.86) 43%, rgba(18,19,21,.34) 78%, rgba(18,19,21,.18) 100%) !important;",
    "}",
    ".hero h1, .hero-lede, .hero-support, .page-hero h1, .page-hero .hero-lede, .about-hero h1, .about-hero .lede { color: var(--light) !important; }",
    ".hero-eyebrow, .page-hero .eyebrow, .about-hero .eyebrow { color: var(--copper) !important; }",
    "",
    ".ink, .trust, .story-dark, .about-invite, .site-footer, .page-hero.stories-hero {",
    "  background-color: var(--ink-900) !important;",
    "  color: var(--light) !important;",
    "}",
    ".ggi, .trust { background-color: var(--ink-950) !important; }",
    ".ink h2, .ink h3, .trust h2, .trust h3, .story-dark h2, .story-dark h3 { color: var(--light) !important; }",
    ".ink p, .trust p, .story-dark p { color: var(--light-soft) !important; }",
    ".ink .section-number, .trust .section-number, .story-dark .eyebrow, .story-dark .proof-kicker { color: var(--copper) !important; }",
    "",
    ".preparation-section, .outcomes-section, .ia-split, .deployment-section {",
    "  background: var(--paper) !important;",
    "  color: var(--text) !important;",
    "}",
    ".preparation-section h2, .outcomes-section h2, .outcomes-section h3, .ia-split h2, .deployment-section h2, .deployment-section h3 { color: var(--text) !important; }",
    ".preparation-section .preparation-claim, .outcomes-section p, .ia-split .ia-prose p, .deployment-section .section-lede, .deployment-section .deployment-steps p, .deployment-section .cta-note { color: var(--text-soft) !important; }",
    ".preparation-section .section-number, .outcomes-section .section-number, .ia-split .section-number, .deployment-section .section-number, .deployment-steps li > span { color: var(--copper-dark) !important; }",
    ".outcome-card { background: rgba(28,28,30,.035) !important; border-color: var(--line) !important; }",
    ".deployment-steps li { border-bottom-color: var(--line) !important; }",
    "",
    ".proof-section .case-feature { background: var(--ink-800) !important; border-color: var(--line-dark) !important; }",
    ".proof-section .case-grid { border-color: var(--line-dark) !important; }",
    ".proof-section .case-grid > article { background: rgba(242,240,234,.045) !important; }",
    ".proof-section .case-grid > article + article { border-color: var(--line-dark) !important; }",
    ".proof-actions .text-link { color: var(--copper) !important; }",
    "",
    ".lineage-condensed-section { background: var(--ink-900) !important; color: var(--light) !important; }",
    ".lineage-condensed-section h2, .lineage-condensed-section .lineage-four-name { color: var(--light) !important; }",
    ".lineage-condensed-section p { color: var(--light-soft) !important; }",
    ".lineage-condensed-section .section-number, .lineage-condensed-section .lineage-four-year { color: var(--copper) !important; }",
    "",
    ".trust-points h3 { color: var(--copper) !important; }",
    ".trust .canonical-statement, .trust-points p { color: var(--light-soft) !important; }",
    "",
    ".deployment-cta-banner {",
    "  background: var(--ink-950) !important;",
    "  color: var(--light) !important;",
    "  border-top-color: var(--copper) !important;",
    "  border-bottom-color: var(--copper) !important;",
    "}",
    ".deployment-cta-banner:hover { background: var(--copper) !important; color: var(--ink-950) !important; }",
    ".deployment-cta-arrow { color: var(--copper); }",
    ".deployment-cta-banner:hover .deployment-cta-arrow { color: var(--ink-950); }",
    "",
    ".editorial, .about-copy, .story-light, .story-index, .about-invite.invite-light {",
    "  background: var(--paper) !important;",
    "  color: var(--text) !important;",
    "}",
    ".editorial p, .about-copy p, .story-light p, .about-invite.invite-light p { color: var(--text-soft) !important; }",
    ".editorial h1, .editorial h2, .editorial h3, .story-light h2, .story-light h3, .about-invite.invite-light h2 { color: var(--text) !important; }",
    ".story-index { border-color: var(--line) !important; }",
    ".story-index a { color: var(--text) !important; }",
    ".story-index span { color: var(--text-soft) !important; }",
    ".claim-boundary { background: rgba(28,28,30,.035) !important; border-color: var(--line) !important; }",
    ".story-dark .claim-boundary { background: rgba(201,168,76,.07) !important; border-color: var(--line-dark) !important; }",
    ".about-invite.invite-light .eyebrow { color: var(--copper-dark) !important; }",
    ".about-invite.invite-light .button-primary { background: var(--ink-950) !important; color: var(--light) !important; border-color: var(--ink-950) !important; }",
    ".about-invite.invite-light .button-primary:hover { background: var(--copper) !important; color: var(--ink-950) !important; border-color: var(--copper) !important; }",
    "",
    ".faq-section { background: var(--ink-900) !important; color: var(--light) !important; }",
    ".faq-section .eyebrow { color: var(--copper) !important; }",
    ".faq-section .accordion details { border-color: var(--line-dark) !important; }",
    ".faq-section .accordion summary { color: var(--light) !important; }",
    ".faq-section .accordion summary::after { color: var(--copper) !important; }",
    ".faq-section .accordion details > div, .faq-section .accordion details > div p { color: var(--light-soft) !important; }",
    "",
    ".button-primary { background: var(--light) !important; color: var(--ink-950) !important; border-color: var(--light) !important; }",
    ".button-primary:hover { background: var(--copper) !important; color: var(--ink-950) !important; border-color: var(--copper) !important; }",
    ".site-footer { border-top-color: var(--line-dark) !important; }",
    ".site-footer a, .site-footer .wordmark { color: var(--light-soft) !important; }",
    "",
    "@media (max-width: 640px) {",
    "  .preparation-section, .outcomes-section, .ia-split, .deployment-section { background: var(--paper) !important; }",
    "}"
  ].join("\n");
  document.head.appendChild(axiaTheme);

  var themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute("content", "#121315");

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
