import { type ThemeOverride } from '@/core/theme/tokens'
import { type WeatherCondition } from './types'

// One app-wide palette per condition. Every text/tint/icon color meets WCAG AA (4.5:1)
// against both background and surface; see palettes.test.ts.
export const CONDITION_PALETTES: Readonly<Record<WeatherCondition, ThemeOverride>> = {
  // Fortaleza: light, warm amber
  clear: {
    scheme: 'light',
    colors: {
      background: '#FFF4E0',
      surface: '#FFFAF0',
      text: '#2B1700',
      textMuted: '#6B4A12',
      tint: '#8A4B00',
      iconDefault: '#7A5A2E',
      border: '#F0D9B0',
      statusBar: 'dark',
    },
  },
  // São Paulo: light, slate gray
  cloudy: {
    scheme: 'light',
    colors: {
      background: '#E6E9ED',
      surface: '#F5F7F9',
      text: '#1A2129',
      textMuted: '#4A5562',
      tint: '#3B4A5C',
      iconDefault: '#56616E',
      border: '#C8CED6',
      statusBar: 'dark',
    },
  },
  // London: dark, deep blue
  rain: {
    scheme: 'dark',
    colors: {
      background: '#0B1A2E',
      surface: '#12253F',
      text: '#EAF2FF',
      textMuted: '#A9BCD6',
      tint: '#7FB2FF',
      iconDefault: '#8EA3BF',
      border: '#1F3656',
      statusBar: 'light',
    },
  },
  // Reykjavik: light, icy cyan
  snow: {
    scheme: 'light',
    colors: {
      background: '#E8F7FA',
      surface: '#F7FDFE',
      text: '#0B2A33',
      textMuted: '#3D5F69',
      tint: '#00657A',
      iconDefault: '#4F6F78',
      border: '#BFE3EB',
      statusBar: 'dark',
    },
  },
  // Tokyo: dark, violet
  storm: {
    scheme: 'dark',
    colors: {
      background: '#160F2B',
      surface: '#21183D',
      text: '#F1ECFF',
      textMuted: '#B9AEDB',
      tint: '#C3A6FF',
      iconDefault: '#A396C9',
      border: '#352A5A',
      statusBar: 'light',
    },
  },
} as const
