# Avant Garde Brand Video

An 80-second brand explainer film for Avant Garde International Group, built
with [Remotion](https://remotion.dev). Typographic and diagrammatic motion
only: serious, editorial, restrained. 1920x1080, 30fps, silent.

## Structure

One composition, `AvantGardeBrand` (2400 frames), with seven sequential scenes:

| Scene | Frames | Section |
| ----- | ------ | ------- |
| 1 | 0-240 | The hook |
| 2 | 240-600 | The burden |
| 3 | 600-960 | The reframe |
| 4 | 960-1440 | What we build |
| 5 | 1440-1920 | Client outcomes |
| 6 | 1920-2160 | Who it is for |
| 7 | 2160-2400 | Invitation |

Brand constants (colors, fonts, motion language) live in `src/theme.ts`.
Fonts are Fraunces and Inter, loaded via `@remotion/google-fonts`.

## Develop

```bash
npm install
npm run dev        # opens the Remotion studio
```

## Render

```bash
npm run render
```

The rendered file is written to `out/avant-garde-brand-v1.mp4`.

### Rendering on a headless server

Remotion needs a Chromium headless-shell binary. When one is already present
(for example a Playwright install), point Remotion at it and, if outbound
traffic is proxied with a custom TLS certificate, allow font fetches through:

```bash
npx remotion render AvantGardeBrand out/avant-garde-brand-v1.mp4 \
  --codec h264 \
  --browser-executable=/path/to/chrome-headless-shell
```

`remotion.config.ts` already sets software GL rendering (`swangle`) and
`setChromiumIgnoreCertificateErrors(true)` for proxied environments.

## Verify

Spot-render individual frames as stills:

```bash
npx remotion still AvantGardeBrand out/frame.png --frame=1200 \
  --browser-executable=/path/to/chrome-headless-shell
```
