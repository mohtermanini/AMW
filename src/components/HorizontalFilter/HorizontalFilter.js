import React from 'react'
import { StyledHorizontalFilter } from "./HorizontalFilter.styled"

export default function HorizontalFilter({ bgcolor, choices, setState }) {

    function changeOption(e) {
        const val = e.target.value;
        setState(() => val);
    }

    return (
        <StyledHorizontalFilter bgcolor={bgcolor}>
            <div className='label'>
                Filter by
            </div>
            <select name="filter" id="" onChange={changeOption}>
                {choices.map((val, ind) =>
                    <option key={ind} value={val}>
                        {val.charAt(0).toUpperCase() + val.slice(1)}
                    </option>
                )}

            </select>
        </StyledHorizontalFilter>
    )
}
