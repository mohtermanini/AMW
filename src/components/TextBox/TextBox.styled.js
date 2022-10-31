import styled from "styled-components";
import { colors } from "../../variables/colors";

export const StyledTextBox = styled.p`
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    color: #fff;
    background-color: ${(props) => colors[props.bgcolor]};
    display: inline-block;
`;