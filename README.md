# weather-mood

A weather app built as a playground for a hand-crafted mobile design system.

> **Status: work in progress.** Weather data is mocked for now — the current focus is the design system (tokens, typography, theming) and the architecture around it, not the data layer.

## Stack

- React Native 0.81 (New Architecture) + Expo 54
- Expo Router (file-based navigation)
- TypeScript in strict mode
- Phosphor icons via `react-native-svg`
- Cabinet Grotesk typeface (8 weights)

## Design system

- **Semantic tokens** for colors, spacing and typography, typed as `readonly` ([`core/theme/tokens.ts`](core/theme/tokens.ts))
- **Light and dark themes** following the system color scheme
- **No magic numbers:** every size, spacing and color comes from a token, enforced by ESLint
- **Weight through font family**, never `fontWeight` — each Cabinet Grotesk weight is its own family token
- **`UIIcon`:** a single icon registry with token-based sizes and colors ([`core/ui/ui-icon`](core/ui/ui-icon))

## Project structure

```
app/        Routes (Expo Router)
core/       Cross-cutting building blocks: theme, UI primitives
modules/    Feature modules (weather, market, favorites, profile)
```

Each feature module splits its concerns into `state`, `actions` (side effects), `commands` (pure business logic) and a `view-model` that wires them to the screen.

## Getting started

```sh
npm install
npm start          # Expo dev server
npm run ios        # or: npm run android / npm run web
```

## Quality checks

```sh
npm run tap        # ESLint with the project's strict rule set
npm run typecheck  # tsc --noEmit
```

Both run on every pull request via GitHub Actions.
