import React from 'react'
import styled from 'styled-components'
import { colors } from '../../variables/colors'

const StyledFormCardBody = styled.div`
    padding: 2rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    form{
        display: flex;
        flex-direction: column;
        gap: 4rem;
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 2rem;
           
        }
        .options {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
    }
`;

export default function FormCardBody({ className ,children }) {
    return (
        <StyledFormCardBody className={className}>
            {children}
        </StyledFormCardBody>
    )
}
