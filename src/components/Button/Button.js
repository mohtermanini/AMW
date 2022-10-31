import React from 'react'
import { StyledButton } from './Button.styled'

export default function Button({layout, bgcolor, scRadius, size, type, callback, className, children}) {
  return (
    <StyledButton bgcolor={bgcolor} layout={layout} scRadius={scRadius} size={size} type={type}
      onClick={callback} className={className}>
      {children}
    </StyledButton>
  )
}
