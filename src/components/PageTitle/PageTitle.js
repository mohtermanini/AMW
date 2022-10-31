import React from 'react'
import styled from 'styled-components'

const StyledPageTitle = styled.div`
  h2 {
    font-size: 2.5rem;
  }
`;

export default function PageTitle({ children }) {
  return (
    <StyledPageTitle>
      <h2>
        {children}
      </h2>
    </StyledPageTitle>
  )
}
