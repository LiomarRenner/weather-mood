# weather-mood

A weather app built as a playground for a hand-crafted mobile design system.

> **Status: work in progress.** Weather data is mocked for now — the current focus is the design system (tokens, typography, theming) and the architecture around it, not the data layer.

## Weather screen

The home tab shows the current weather for five mocked cities. Swipe horizontally to move between them:

| City | Condition | Theme |
|---|---|---|
| Fortaleza | clear | light, warm amber |
| São Paulo | cloudy | light, slate |
| London | rain | dark, deep blue |
| Reykjavik | snow | light, icy cyan |
| Tokyo | storm | dark, violet |

- Each page shows the city, condition, temperature, a short mood line ("Bright and warm") and a detail row with feels like, humidity and wind.
- The condition of the current city themes the **whole app**, tab bar included, and overrides the system light/dark setting. Every palette is unit-tested against WCAG AA contrast.
- While swiping, the background blends between palettes on the UI thread (Reanimated) and the page dots follow the same scroll offset; the app theme switches when the page settles.
- Tap the temperature to switch between °C + km/h and °F + mph.
- The selected city, unit and last condition persist with MMKV, so the app reopens on the same city and theme. First launch starts on Fortaleza.
- Data comes from a mock `WeatherService` (`createMockWeatherService`), shaped like the [Open-Meteo](https://open-meteo.com/) forecast response. To see the error and retry states, create the service with `createMockWeatherService({ shouldFail: true })` in [`modules/weather/service/index.ts`](modules/weather/service/index.ts).

## Stack

- React Native 0.81 (New Architecture) + Expo 54
- Expo Router (file-based navigation)
- TypeScript in strict mode
- Phosphor icons via `react-native-svg`
- zustand (atomic selectors) + `react-native-mmkv` for persisted state
- FlashList v2 + Reanimated 4 for the paging and animations
- Cabinet Grotesk typeface (8 weights)

## Design system

- **Semantic tokens** for colors, spacing and typography, typed as `readonly` ([`core/theme/tokens.ts`](core/theme/tokens.ts))
- **Light and dark themes** following the system color scheme, overridable app-wide (the weather palettes use this)
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

The app uses native modules (MMKV), so it runs as a **development build**. Expo Go is no longer supported.

```sh
npm install
npx expo run:ios       # or: npx expo run:android — builds and installs the dev client
npx expo start         # afterwards: start the dev server for the installed build
```

The first native build takes a while; later runs only need `npx expo start`. Rebuild with `npx expo run:ios` / `run:android` whenever native dependencies change.

## Quality checks

```sh
npm run tap        # ESLint with the project's strict rule set
npm run typecheck  # tsc --noEmit
npm test           # Vitest, pure functions only
```

All three run on every pull request via GitHub Actions.
