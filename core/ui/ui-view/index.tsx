import { memo } from 'react'
import { UIViewComponent } from './ui-view'

export const UIView = memo(UIViewComponent)
export { type UIViewProps, type SpacingToken } from './types'
