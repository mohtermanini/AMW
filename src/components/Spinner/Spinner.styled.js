import styled from "styled-components";
import { colors } from "../../variables/colors";

export const StyledSpinner = styled.div`
    background-color: rgba(0,0,0,0.7);
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    z-index: 1000;
    .spinner {
        background-color: ${colors["light-grey"]};
        border-radius: 5rem;
        padding: 2rem 3rem;
        width: 50vw;
        min-height: 40vh;
        position: absolute;
        left:50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 3px solid ${colors.primary};
        gap: 2rem;
        .caption {
            font-size: 2rem;
            letter-spacing: 0.2rem;
            font-weight: bold;
            color: ${colors.primary};
        }
    }
`;