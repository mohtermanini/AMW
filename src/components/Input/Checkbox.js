import React from 'react'
import styled from 'styled-components'

const StyledCheckbox = styled.div`
    display: flex;
    gap: 1rem;
`;

export default function Checkbox({ scLabel, scName, defaultValue }) {
    return (
        <StyledCheckbox>
            <input type="checkbox" name={scName} id={scName} defaultChecked={defaultValue} />
            <label htmlFor={scName}>{scLabel}</label>
        </StyledCheckbox>
    )
}
