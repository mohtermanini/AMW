import React from 'react'
import styled from 'styled-components'

const StyledTextInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export default function TextInput({ scLabel, scName, scRequired, defaultValue }) {
    return (
        <StyledTextInput>
            <label htmlFor={scName}>{scLabel}</label>
            <input type="text" name={scName} id={scName} defaultValue={defaultValue} required={scRequired} />
        </StyledTextInput>
    )
}
