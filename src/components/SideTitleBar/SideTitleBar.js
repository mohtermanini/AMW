import React from 'react'
import {StyledSideTitleBar} from "./SideTitleBar.styled"

export default function SideTitleBar({ title }) {

    return (
        <StyledSideTitleBar>
            <h2>{title}</h2>
        </StyledSideTitleBar>
    )
}
