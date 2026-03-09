# Operations and Deployment

## 1. Deployment Target

The app is designed to deploy cleanly on Vercel.

Current production assumptions:

- `main` is the production branch
- non-main branches are preview/development branches

Important implication:

- if a fix is visible locally but not on production, first confirm whether it was merged into `main`

## 2. Build and Runtime

Build command:

```bash
npm run build
```

Start command:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

## 3. Environment Variables

Current important variable:

- `FIGMA_API_KEY`

Used for:

- live Figma node inspection
- exported asset sync
- scripted design pulls

## 4. Figma Sync Script

Script:

```bash
npm run figma:pull -- <figma-url-or-file-key> [--node-id 123:456]
```

What it does:

- downloads file JSON
- exports node renders
- downloads image fills
- stores synced output locally for implementation work

Key paths involved:

- `scripts/pull-figma.mjs`
- `figma-sync/`
- `public/figma-files/`

## 5. Image Handling

Next image config lives in:

- `next.config.ts`

Current behavior:

- supports AVIF and WebP optimization
- allows remote Figma and Unsplash images

Most production UI assets are local under:

- `public/assets`

## 6. Metadata and Social Cards

Defined in:

- `app/layout.tsx`
- `app/icon.tsx`
- `app/opengraph-image.tsx`
- `app/twitter-image.tsx`

Production metadata includes:

- title template
- description
- keywords
- favicon
- Open Graph
- Twitter card

## 7. Security Headers

Configured in:

- `next.config.ts`

Current headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## 8. Release Checklist

Before merging into `main`:

1. run `npm run lint`
2. run `npm run build`
3. verify the target route visually
4. verify mobile if the change affects layout
5. confirm the branch contains only intended changes

After merging:

1. confirm `main` is pushed
2. confirm Vercel picked up the latest production commit
3. hard refresh production when validating visual changes

## 9. Operational Risks

Current recurring risks:

- production branch mismatch
- browser caching after design updates
- Figma rate limiting during node/image pulls
- high-regression UI areas such as pickup modal and mobile car profile layout

