# Wesam El Shafey — Portfolio

A responsive, dependency-free professional portfolio for Wesam El Shafey, focused on facilities maintenance, technical supervision and owner-side FM opportunities.

## Develop

Node.js 20 or later is required. No dependency installation is needed.

```sh
npm run dev
```

Visit http://127.0.0.1:4173. To produce a deployable static directory:

```sh
npm run build
npm run preview
```

Deploy `dist/` to a static host. The English page is served at `/` and the Arabic page at `/ar/` on the configured domain. No database, environment secrets, external fonts, analytics or third-party scripts are required.

## Languages

Use EN / العربية in the header. Arabic is a complete static page with RTL layout, translated content, accessible labels and social metadata. Language selection is remembered locally, and switching preserves the current section. The original CV PDF remains English and is labelled accordingly.

Edit English content in `index.html` and its Arabic equivalent in `translations/ar.json`. `scripts/build.mjs` generates both pages and shares the same image, styles and interaction code. New content must include its Arabic translation. Build before previewing to regenerate `/ar/`.

## Files

- `index.html`: semantic page content and metadata.
- `styles.css`: responsive layouts, print styles and reduced-motion support.
- `app.js`: mobile navigation, keyboard-accessible approach tabs and navigation state.
- `assets/`: owner-supplied AVIF portrait, the original CV download and favicon.

## Editorial basis

Content is based on the supplied CV and the owner's clarifications. The 35+ years statement was explicitly confirmed by the owner; selected employment entries reflect the supplied CV. The approach section describes proposed work, not completed advisory assignments. Technical training is identified as training; no bachelor's degree, professional registration, CMMS implementation history, measured savings or client endorsement is implied.

The original CV is offered unchanged. Its earlier chronology, employment date inconsistencies and outcome evidence should be reconciled when a revised CV is supplied. Update both `index.html` and the PDF when those details are confirmed. The public contact details are taken from the supplied CV.

Before public launch, confirm the final CV and current-role details, then configure the deployment URL, absolute social metadata and sitemap for the chosen domain. The website uses direct email, phone and WhatsApp links; it does not collect form submissions.
