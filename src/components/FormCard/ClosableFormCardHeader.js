import React from 'react'
import styled from 'styled-components'
import { colors } from '../../variables/colors'
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const StyledClosableFormCardHeader = styled.div`
    background-color: ${colors.primary};
    text-align: center;
    font-size: 2.25rem;
    color: #fff;
    padding: 2rem 3rem;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    .title {
        grid-column-start: 2;
    }
    button {
        justify-self: end;
    }
`;

export default function ClosableFormCardHeader({ title, closeButtonCallback }) {
    return (
        <StyledClosableFormCardHeader>
            <h2 className='title'>
                {title}
            </h2>
            <Button bgcolor="danger" scRadius="10" size="tiny" callback={closeButtonCallback}>
                <FontAwesomeIcon icon={solid('xmark')} />
            </Button>
        </StyledClosableFormCardHeader>
    )
}
