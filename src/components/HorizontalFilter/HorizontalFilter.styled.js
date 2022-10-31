import styled from "styled-components";
import { colors } from "../../variables/colors";

export const StyledHorizontalFilter = styled.div`
    display: flex;
    .label {
        background-color: ${(props) => colors[props.bgcolor]};
        padding: 0.75rem 1.5rem;
        color: #fff;
        border-radius: 1rem 0 0 1rem;
    }
    select {
        padding: 0 4rem 0 2rem;
        text-align: center;
    }
`;