import React from 'react'
import styled from 'styled-components'
import { colors } from '../../variables/colors'

const StyledFormCardHeader = styled.div`
    background-color: ${colors.primary};
    text-align: center;
    font-size: 2.25rem;
    color: #fff;
    padding: 2rem 3rem;
`;

export default function FormCardHeader({title}) {
  return (
    <StyledFormCardHeader>
        <h2>
            {title}
        </h2>
    </StyledFormCardHeader>
  )
}
