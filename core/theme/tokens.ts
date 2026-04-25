export type ThemeTokens = {
  readonly text: string
  readonly backgroundColor: string
  readonly tint: string
  readonly tabIconDefault: string
  readonly tabIconSelected: string
}

export const DefaultLightTheme: ThemeTokens = {
  text: '#000000',
  backgroundColor: '#ffffff',
  tint: '#2f95dc',
  tabIconDefault: '#ccc',
  tabIconSelected: '#2f95dc',
} as const

export const DefaultDarkTheme: ThemeTokens = {
  text: '#ffffff',
  backgroundColor: '#000000',
  tint: '#ffffff',
  tabIconDefault: '#ccc',
  tabIconSelected: '#ffffff',
} as const