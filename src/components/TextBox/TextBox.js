import React from 'react'
import { StyledTextBox } from './TextBox.styled'

export default function TextBox({bgcolor, children}) {
  return (
    <StyledTextBox bgcolor={bgcolor}>
        {children}
    </StyledTextBox>
  )
}
