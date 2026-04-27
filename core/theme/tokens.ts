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
      readonly thin: string       // Detalhes técnicos / Unidades (ex: °C)
      readonly extraLight: string // Texto secundário em telas grandes
      readonly light: string      // Descrições curtas / Infos de vento
      readonly regular: string    // Corpo de texto / Leitura principal
      readonly medium: string     // Labels de navegação / Botões
      readonly bold: string       // Títulos de seção / Cidades
      readonly extraBold: string  // Destaques de cards
      readonly black: string      // Temperaturas (Display)
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
      readonly tight: number     // Para pesos: Black, ExtraBold (-1)
      readonly standard: number  // Para pesos: Bold, Medium (-0.4)
      readonly open: number      // Para pesos: Regular abaixo (0)
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
      thin: 'Cabinet-Thin',             // IDEAL: Unidades de medida, créditos sutis
      extraLight: 'Cabinet-ExtraLight', // IDEAL: Sublegendas em telas Retina
      light: 'Cabinet-Light',           // IDEAL: Texto de apoio (ex: "Sensação térmica")
      regular: 'Cabinet-Regular',       // IDEAL: O "feijão com arroz" para leitura
      medium: 'Cabinet-Medium',         // IDEAL: Labels da TabBar e botões
      bold: 'Cabinet-Bold',             // IDEAL: Nome da cidade, headers de cards
      extraBold: 'Cabinet-ExtraBold',   // IDEAL: Números secundários (Umidade %)
      black: 'Cabinet-Black',           // IDEAL: Temperatura principal (O "Show")
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
    background: '#ECEFF1',    // Cinza névoa (Lost Time Light)
    surface: '#FFFFFF',
    text: '#10141D',          // Azul profundo quase preto
    textMuted: '#546E7A',
    tint: '#37474F',          // Slate profundo para ações
    iconDefault: '#90A4AE',
    border: '#CFD8DC',
    statusBar: 'dark',
  },
} as const

export const DefaultDarkTheme: ThemeTokens = {
  ...sharedTokens,
  colors: {
    background: '#0A0C10',    // O "Preto Espacial"
    surface: '#161B22',       // Surface azulada profunda
    text: '#F0F6FC',          // Branco leitoso (menos agressivo)
    textMuted: '#8B949E',
    tint: '#58A6FF',          // Destaque tecnológico
    iconDefault: '#484F58',
    border: '#30363D',
    statusBar: 'light',
  },
} as const