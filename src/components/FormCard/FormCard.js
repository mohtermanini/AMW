import React from 'react'
import styled from 'styled-components';
import { colors } from '../../variables/colors';

const StyledFormCard = styled.div`
    background-color: #E6E6E6;
    border-radius: 1rem;
    overflow:hidden;
    width: 80vw;
`;


export default function FormCard({ className, children }) {
    return (
        <StyledFormCard className={className}>
            {children}
        </StyledFormCard>
    )
}
