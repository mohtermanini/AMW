import styled from "styled-components";
import { colors } from "../../variables/colors";

export const StyledMainNavbar = styled.nav`
    background-color: ${colors.secondary};
    padding: 2rem 5rem;
    ul {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
    }
`;