# Website Audit Against the Brand Spine — Playwright MCP — 2026-07-22

**Scope:** All four production pages (`index.html`, `applications.html`, `client-stories.html`, `about.html`) at desktop 1280×900 and mobile 390×844, plus interactive checks (mobile navigation, FAQ, trust dialog) and source-level terminology sweeps.

**Method:** Pages were rendered and inspected with the Microsoft Playwright MCP server (`@playwright/mcp`) using accessibility snapshots, full-page screenshots, console capture, and in-page evaluation. Because this session's network policy blocks outside egress, the audit ran against a locally served copy of `main` at `3e21513` — the exact commit GitHub Pages deploys for `avantgarde-internationalgroup.com` — so content is identical to the live site.

**Governing document:** Avant Garde Company Spine v1.3 — CANONICAL (2026-07-05) including all ratified addenda through 2026-07-21 (Website Doctrine 07-10, IA Doctrine/Objection Layer 07-12, Roger 07-14, Spoken Commercial 07-14, Horacio 07-15, Brand Architecture 07-18, Reassembly Naming 07-21, WO-87 canonicalization pass 07-21).

**Evidence:** `docs/review/spine-audit-2026-07-22/` (8 full-page captures).

---

## Verdict

The live site is in strong compliance with the canonical spine, including the July 21 ratifications. Canonical lines appear verbatim and in the correct hierarchy, deprecated language is fully absent, claims discipline is applied to every proof asset, and the technical baseline is clean (zero console errors across eight page loads, no mobile overflow, accessible navigation and dialog). Three findings need attention, one of which is a privacy-hygiene item involving a minor's name in machine-readable surfaces.

---

## Findings requiring action

### 1. HIGH — "javier" persists in machine-readable surfaces of the Horacio story

Visible copy correctly protects the son's identity — he is never named on any page. But the name survives in three non-visible surfaces of `client-stories.html`:

- the section anchor `id="horacio-javier"` (and the story-index link `#horacio-javier`);
- the JSON-LD `ItemList` URL `…/client-stories.html#horacio-javier`, which search engines index;
- the analytics identifier `data-case-story="horacio_javier"`.

The Horacio addendum (07-15) sets a heightened threshold for a minor with developmental/health information: anonymity is the default and only the minimum necessary may be published. A URL fragment is shareable, crawlable, and appears in browser history and analytics streams. Additionally, unlike Larry, Roger, Devin, Mark Radville, and Mo, the spine records **no consent-on-record note for Horacio** — the Batch 6 review gate ("confirm the written-permission record for naming Roger, Horacio/Javier, and Devin") is closed for Roger and Devin by the 07-21 notes but not visibly for Horacio.

**Recommendation:** rename the anchor and analytics ID to `horacio` (with the JSON-LD URL updated to match), and confirm Horacio's written-permission record is documented in the spine the way the other five are.

### 2. MEDIUM — About-page lineage depth exceeds the ratified split

The WO-87 resolution "Lineage Layer Public Depth" (07-21) is explicit: the website gets **at most one to two sentences** of heritage credibility; full lineage depth lives in founder writing, with depth-seekers routed there via the content hub. The About page currently carries a seven-entry interactive timeline (Whewell 1840 → Clark & Chalmers 1998) plus an "Otto's notebook" explainer sidebar — history-lesson depth on a company surface, published three days before the resolution ratified the split.

**Recommendation:** compress to a short heritage paragraph ("the latest working expression of a documented, 130-year tradition…") linking out to the founder's writing once the content hub exists. The Otto material is strong founder-article content; it is mis-shelved on the website per the ratified channel doctrine.

### 3. LOW/MEDIUM — Objection layer covers 7 of 9 ratified objections

The IA Doctrine addendum (ratified 07-21) specifies a nine-objection layer. The FAQ answers seven well (already-use-AI, just-prompting via the three-levels section, will-it-remember, another-system-to-manage, model-changes, why-not-an-assistant, what-it-does). Two are absent:

- **"Why does it cost this much?"** — no pricing/value objection anywhere on the site (bounded-first-deployment framing is canonical doctrine and could carry this).
- **"What happens when the system challenges weak framing?"** — challenge appears as a capability card, but the objection (what it feels like when the system pushes back) is unanswered.

**Recommendation:** add both to the FAQ in the approved register.

---

## Minor observations (no action required, or Travis's call)

- **Page titles** use the short form ("Avant Garde | …", "Client Stories | Avant Garde") while the naming rule prescribes "AVANT GARDE International Group" for external surfaces. Header and footer comply on every page; titles are the only inconsistent surface. Body-copy "Avant Garde" reads as natural brand usage rather than the deprecated shorthand the rule targets.
- **Hero H1** is "You can delegate the work. You cannot delegate the decision." rather than the primary canonical line. The primary line does appear verbatim and prominently in the category-defining Three Levels section, which arguably satisfies the hierarchy resolution — but per WO-87 ("where stakes are highest, the primary line governs") this is worth a deliberate confirmation rather than an accident.
- **"IA OS"** appears only in JSON-LD metadata ("Intelligence Augmentation operating systems (IA OS)") — correctly per the 07-21 terminology correction — but never in visible copy. If the product-expression term is meant to be buyer-facing, it currently isn't.
- The Horacio story's "How it behaved differently" paragraph ("…process his own frustration before walking back into the room") describes system behavior, not an outcome, and the claims boundary explicitly disclaims behavioral-outcome claims — compliant with the quarantine, but it is the closest copy on the site to the quarantined territory.

---

## Compliance verified (spot-check highlights)

| Spine requirement | Status | Evidence |
| --- | --- | --- |
| Primary line "It doesn't make the decision. It carries what the decision depends on." | ✅ verbatim | Homepage, Three Levels close |
| Supporting line "The system carries the scattered load." in problem-recognition placement only | ✅ | Homepage, continuity-problem section; hierarchy respected |
| Deprecated "…carries the load while you stare" | ✅ absent | Source sweep: 0 matches |
| "The reassembly problem" / "reassembly cost"; "tax" prohibited | ✅ | Homepage card 02 uses both locked terms; 0 "tax" matches |
| Less-costly-not-not-costly claim boundary | ✅ | No switching-elimination claims; "Nothing rebuilt from scratch" targets reassembly cost, the removable claim |
| Exoskeleton deprecation (07-21) | ✅ absent | 0 matches |
| AXIA internal-only | ✅ absent | 0 matches |
| July 10 explanatory statement | ✅ verbatim | Homepage, Fit/Trust/Authority section |
| Canonical closing distinction "A prompt improves the interaction…" | ✅ verbatim | Homepage, Three Levels |
| Buyer-recognition progression (Generic AI → Advanced Prompting → Private Cognitive Infrastructure) | ✅ | Homepage, matches 07-18 architecture |
| Canonical vertical proof line (deal → strategy) | ✅ | Devin story headline and body |
| Five brand pillars | ✅ | All five expressed across homepage sections |
| Earned-trust arc (tool → trusted resource → extension), no day-one claim | ✅ | Foundation/Operation/Extension + phone-test line verbatim |
| IA value / AI mechanism doctrine | ✅ | "Intelligence Augmentation is the doctrine…"; "The machine is the mechanism."; AI referenced only as tool/mechanism |
| Primary CTA "Schedule a private conversation" | ✅ | Every page, all CTAs → Calendly |
| Whole-person conversation framing; no premature narrowing | ✅ | "Let's talk about the weight you carry" final section; Applications explicitly refuses category-picking |
| Connectivity & compounding doctrine (07-18) | ✅ | "We connect the systems. Then the real compounding begins." + governance boundary |
| Continuity Diagnostic removal | ✅ | 0 matches; "Not an assessment" |
| Proof-class discipline (demand/architecture/outcome) | ✅ | Claims-boundary block on all four stories; Larry quote attributed; Devin framed as implementation decision; Roger no efficacy claims; Horacio no clinical claims |
| Consent: Larry, Roger, Devin named | ✅ on record | Spine 07-21 consent notes (Horacio — see Finding 1) |
| "Chat history is not decision memory" + "active decision memory" pairing | ✅ | Homepage FAQ, first answer |
| Hype-language prohibition | ✅ | 0 matches (revolutionary/seamless/game-changing/unlock/cutting-edge/transformative) |
| Faith-language absent from company surfaces | ✅ | 0 matches |
| Technical baseline | ✅ | 0 console errors (8 loads); 1 H1/page; skip links; no 390px overflow; native details nav/FAQ; trust dialog labeled, opens/closes correctly |

---

*Audit executed with `@playwright/mcp` (headless Chromium) on 2026-07-22. The server is registered in `.mcp.json` for future sessions.*
