/**
 * 💡 TAP: Technical Architecture Pattern
 * Palette: Lost Time (Deep Space & Slate)
 * Typography: Cabinet Grotesk (Full Family)
 */

export type ThemeTokens = {
  readonly colors: {
    readonly background: string
    readonly surface: string
    readonly text: string
    readonly textMuted: string
    readonly tint: string
    readonly iconDefault: string
    readonly border: string
    readonly statusBar: 'light' | 'dark'
  }
  readonly spacing: {
    readonly xs: number
    readonly sm: number
    readonly md: number
    readonly lg: number
    readonly xl: number
    readonly xxl: number
  }
readonly typography: {
    readonly family: {
      readonly thin: string       // Technical details / units (e.g. °C)
      readonly extraLight: string // Secondary text on large screens
      readonly light: string      // Short descriptions / wind info
      readonly regular: string    // Body copy / main reading
      readonly medium: string     // Navigation labels / buttons
      readonly bold: string       // Section titles / city names
      readonly extraBold: string  // Card highlights
      readonly black: string      // Temperatures (display)
    }
    readonly size: {
      readonly tiny: number
      readonly caption: number
      readonly body: number
      readonly label: number
      readonly title: number
      readonly display: number
    }
    readonly kerning: {
      readonly tight: number     // For weights: Black, ExtraBold (-1)
      readonly standard: number  // For weights: Bold, Medium (-0.4)
      readonly open: number      // For weights: Regular and lighter (0)
    }
  }
}

const sharedTokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 64,
  },
  typography: {
    family: {
      thin: 'Cabinet-Thin',             // IDEAL: units of measure, subtle credits
      extraLight: 'Cabinet-ExtraLight', // IDEAL: subcaptions on Retina screens
      light: 'Cabinet-Light',           // IDEAL: supporting text (e.g. "Feels like")
      regular: 'Cabinet-Regular',       // IDEAL: the everyday reading weight
      medium: 'Cabinet-Medium',         // IDEAL: tab bar labels and buttons
      bold: 'Cabinet-Bold',             // IDEAL: city name, card headers
      extraBold: 'Cabinet-ExtraBold',   // IDEAL: secondary numbers (humidity %)
      black: 'Cabinet-Black',           // IDEAL: main temperature (the hero)
    },
    size: {
      tiny: 10,
      caption: 12,
      body: 16,
      label: 18,
      title: 24,
      display: 84,
    },
    kerning: {
      tight: -1,
      standard: -0.4,
      open: 0,
    },
  },
} as const

export const DefaultLightTheme: ThemeTokens = {
  ...sharedTokens,
  colors: {
    background: '#ECEFF1',    // Mist gray (Lost Time Light)
    surface: '#FFFFFF',
    text: '#10141D',          // Deep near-black blue
    textMuted: '#546E7A',
    tint: '#37474F',          // Deep slate for actions
    iconDefault: '#90A4AE',
    border: '#CFD8DC',
    statusBar: 'dark',
  },
} as const

export const DefaultDarkTheme: ThemeTokens = {
  ...sharedTokens,
  colors: {
    background: '#0A0C10',    // "Space black"
    surface: '#161B22',       // Deep bluish surface
    text: '#F0F6FC',          // Milky white (softer on the eyes)
    textMuted: '#8B949E',
    tint: '#58A6FF',          // Tech accent
    iconDefault: '#484F58',
    border: '#30363D',
    statusBar: 'light',
  },
} as const