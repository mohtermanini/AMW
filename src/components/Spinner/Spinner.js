import React from 'react'
import { StyledSpinner } from './Spinner.styled'

export default function Spinner({ caption, children }) {

    return (
        <StyledSpinner>
            <div className="spinner">
                <div className="shapes">
                    {children}
                </div>
                <p className="caption">{caption}</p>
            </div>
        </StyledSpinner>
    )
}
