# Tailwind / NativeWind setup (frontendApp)

Quick setup for using Tailwind-style classes in React Native via NativeWind.

Steps

- Install deps (from `frontendApp`):

```bash
cd frontendApp
npm install
# or: yarn
```

- Files added/required in this project:
- `tailwind.config.js` — already configured with `nativewind/tailwind` plugin
- `babel.config.js` — already includes `nativewind/babel` plugin
- `postcss.config.js` — enables Tailwind/PostCSS (added)
- `src/styles/tailwind.css` — Tailwind entry file (added; useful for Expo Web)

How to run

- Start Expo as usual:

```bash
npm run start
```

Notes

- For React Native (mobile) NativeWind + Babel plugin is sufficient — no build step needed.
- If you use Expo Web, build Tailwind via PostCSS (or use a bundler plugin) using the `src/styles/tailwind.css` entry.
- If styles look stale, restart Metro with cache cleared: `expo start -c`.
