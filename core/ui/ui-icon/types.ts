import { 
  HouseIcon, 
  StorefrontIcon, 
  UserCircleIcon, 
  CloudSunIcon, 
  DropIcon, 
  WindIcon, 
  ThermometerIcon, 
  SunIcon, 
  CloudRainIcon,
  HeartIcon,
  CloudIcon,
  SnowflakeIcon,
  CloudLightningIcon,
  CloudSlashIcon,
  type Icon as PhosphorIcon,
  type IconProps,
} from 'phosphor-react-native'

export const UI_ICON_SIZES = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const

export const UI_ICON_COLORS = {
  text: 'text',
  tint: 'tint',
  muted: 'muted',
  background: 'background',
} as const

const ICONS = {
  'house': HouseIcon,
  'store-front': StorefrontIcon,
  'user-circle': UserCircleIcon,
  'cloud-sun': CloudSunIcon,
  'drop': DropIcon,
  'wind': WindIcon,
  'thermometer': ThermometerIcon,
  'sun': SunIcon,
  'cloud-rain': CloudRainIcon,
  'heart': HeartIcon,
  'cloud': CloudIcon,
  'snowflake': SnowflakeIcon,
  'cloud-lightning': CloudLightningIcon,
  'cloud-slash': CloudSlashIcon,
} as const

export const ICON_REGISTRY: Record<keyof typeof ICONS, PhosphorIcon> = ICONS

export type UIIconSize = keyof typeof UI_ICON_SIZES
export type UIIconColor = keyof typeof UI_ICON_COLORS
export type UIIconName = keyof typeof ICONS
export type UIIconWeight = IconProps['weight']

export type UIIconProps = {
  readonly name: UIIconName
  readonly size?: UIIconSize
  readonly color?: UIIconColor
  readonly weight?: UIIconWeight
}