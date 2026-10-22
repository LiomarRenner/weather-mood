// WCAG 2.x contrast helpers: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
// Pure on purpose (no react-native import) so palettes can be checked in unit tests.

const HEX_PATTERN = /^#([\da-f]{6})$/i
const CHANNEL_MAX = 255
const HEX_RADIX = 16
const CHANNEL_HEX_LENGTH = 2
const BLUE_CHANNEL_INDEX = 2
const LINEAR_THRESHOLD = 0.040_45
const LINEAR_DIVISOR = 12.92
const GAMMA_OFFSET = 0.055
const GAMMA_DIVISOR = 1.055
const GAMMA_EXPONENT = 2.4
const RED_WEIGHT = 0.2126
const GREEN_WEIGHT = 0.7152
const BLUE_WEIGHT = 0.0722
const LUMINANCE_OFFSET = 0.05

// WCAG AA minimum ratios
export const AA_NORMAL_TEXT = 4.5
export const AA_LARGE_TEXT = 3

type RgbChannels = readonly [number, number, number]

function parseHexColor(color: string): RgbChannels {
  const hex = HEX_PATTERN.exec(color)?.[1]
  if (!hex) throw new Error(`Expected a #rrggbb color, received "${color}"`)

  function channel(index: number): number {
    const start = index * CHANNEL_HEX_LENGTH
    return Number.parseInt(hex?.slice(start, start + CHANNEL_HEX_LENGTH) ?? '', HEX_RADIX)
  }

  return [channel(0), channel(1), channel(BLUE_CHANNEL_INDEX)]
}

function linearize(channel: number): number {
  const srgb = channel / CHANNEL_MAX
  return srgb <= LINEAR_THRESHOLD
    ? srgb / LINEAR_DIVISOR
    : ((srgb + GAMMA_OFFSET) / GAMMA_DIVISOR) ** GAMMA_EXPONENT
}

export function relativeLuminance(color: string): number {
  const [red, green, blue] = parseHexColor(color)
  return RED_WEIGHT * linearize(red) + GREEN_WEIGHT * linearize(green) + BLUE_WEIGHT * linearize(blue)
}

export function contrastRatio(foreground: string, background: string): number {
  const first = relativeLuminance(foreground)
  const second = relativeLuminance(background)
  const lighter = Math.max(first, second)
  const darker = Math.min(first, second)
  return (lighter + LUMINANCE_OFFSET) / (darker + LUMINANCE_OFFSET)
}
