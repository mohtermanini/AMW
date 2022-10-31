import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react'
import { StyledDataTable } from './DataTable.styled'

export default function DataTable({ headers, children }) {
    const tbodyRef = useRef();
    useEffect(() => {
        const rows = tbodyRef.current.children;
        for (let tr of rows) {
            const rowData = tr.children;
            for (let i = 0; i < rowData.length; i++) {
                const td = rowData[i];
                td.setAttribute("data-label", i === 0 ? "#" : headers[i - 1]);
            }
        }
    });
    return (
        <StyledDataTable>
            <table>
                <thead>
                    <tr>
                        <th key={0}>#</th>
                        {headers.map((header, ind) => {
                            return <th key={ind + 1}>
                                {header}
                            </th>
                        })}
                    </tr>
                </thead>
                <tbody ref={tbodyRef}>
                    {children}
                </tbody>
            </table>
        </StyledDataTable>
    )
}
