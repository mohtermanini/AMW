import React from 'react'
import Spinner from '../Spinner'
import { RotatingSquare } from 'react-loader-spinner'
import { colors } from '../../../variables/colors'
import styled from 'styled-components'
import { breakpoints } from '../../../variables/breakpoints';

const StyledSquareSpinner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: ${breakpoints.sm}) {
        & > .rotating-square-spinner:last-child{
            display: none !important;
        }
    }
`;

export default function SquareSpinner({ caption }) {
    return (
        <Spinner caption={caption}>
            <StyledSquareSpinner>
                <RotatingSquare height="100" width="100" color={colors.primary} strokeWidth="4" visible={true} />
                <RotatingSquare height="100" width="100" color={colors.primary} strokeWidth="4" visible={true} />
                <RotatingSquare height="100" width="100" color={colors.primary} strokeWidth="4" visible={true} 
                        wrapperClass="rotating-square-spinner"/>
            </StyledSquareSpinner>
        </Spinner>
    )
}
