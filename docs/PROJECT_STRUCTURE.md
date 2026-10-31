# Project structure

This project keeps the current Vite and React application intact while separating future code and assets by responsibility.

## `src/`

- `assets/` — source-controlled assets imported by application code.
  - `images/` — application images.
  - `models/` — 3D model source files and related model assets.
  - `textures/` — textures, environment maps, and material maps for 3D work.
  - `fonts/` — self-hosted font files.
  - `icons/` — custom icon source assets.
- `components/` — reusable React components.
  - `layout/` — shared structural components such as headers, footers, and page shells.
  - `common/` — broadly reusable business-agnostic components.
  - `ui/` — low-level interface primitives, including future React Bits components or adapted wrappers.
- `sections/` — page-level composition blocks such as a hero or venture section; keep them distinct from reusable components.
- `pages/` — route/page entry components when routing is introduced.
- `hooks/` — reusable React hooks.
- `context/` — React contexts and their providers.
- `data/` — confirmed, non-secret business content and structured static data. Venture information belongs in `data/ventures.js`.
- `lib/` — shared configuration, constants, and small integrations.
- `services/` — API/client service boundaries. Never put frontend secrets here.
- `styles/` — global and shared styles. `global.css` supplies an opt-in baseline for future imports.
- `utils/` — small framework-independent helpers, including URL validation and external-link safety helpers.

## Root directories

- `public/` — files served directly without bundler imports.
  - `images/`, `models/`, and `icons/` — public assets addressed by URL.
- `docs/` — project documentation and architectural decisions.

## Guidance for future work

Place React Three Fiber/Three.js components in `components/` (or `sections/` when page-specific); source models and textures go under `src/assets/models/` and `src/assets/textures/`. Put reusable React Bits components in `components/ui/`, preserving any required attribution and license information. Add route-level screens to `pages/`, and confirmed business data only to `data/`. Keep credentials out of frontend code and use local environment files only for non-public build-time configuration.
