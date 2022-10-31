import React from 'react'
import styled from 'styled-components';

const StyledTextArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;
export default function TextArea({ scLabel, scName, scRequired, defaultValue }) {
    return (
        <StyledTextArea>
            <label htmlFor={scName}>{scLabel}</label>
            <textarea name={scName} id={scName} cols="30" rows="5"
                defaultValue={defaultValue} required={scRequired}></textarea>
        </StyledTextArea>
    )
}
