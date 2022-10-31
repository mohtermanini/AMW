import React from 'react'
import { StyledReportCard } from './ReportCard.styled'

export default function ReportCard({title, children}) {
  return (
    <StyledReportCard>
        <p className='title'>{title}</p>
        {children}
    </StyledReportCard>
  )
}
