import styled from "styled-components";
import { breakpoints } from "../../variables/breakpoints";
import { colors } from "../../variables/colors";

export const StyledMainFooter = styled.footer`
    background-color: ${colors.primary};
    padding: 2rem 5rem;
    margin-top: 5rem;
    color: #fff;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    @media (max-width: ${breakpoints.sm}) {
        grid-template-columns: auto;
        grid-template-rows: 1fr 1fr;
        justify-content: center;
        justify-items: center;
        row-gap: 1rem;
    }
    .copyright {
        font-size: 1.25rem;
    }
`;