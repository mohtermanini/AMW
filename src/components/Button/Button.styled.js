import styled from "styled-components";
import { colors } from "../../variables/colors";

export const StyledButton = styled.button`
    color: #fff;
    display: flex;
    gap: 1rem;
    border: ${(props) => {
        return `1px solid ${colors[props.bgcolor]}`;
    }};

    border-radius: ${(props) => {
        if (props.scRadius == "5") {
            return "0.5rem";
        }
        else if (props.scRadius == "10") {
            return "0.75rem";
        }
    }};
    padding: ${(props) => {
        if (props.size == "tiny") {
            return "0.5rem 1rem";
        }
        else if (props.size == "small") {
            return "0.5rem 2rem";
        }
        else if (props.size == "tall") {
            return "0.75rem 4rem";
        }
        return "1rem 3rem";
    }};
    background-color: ${(props) => {
        if (props.layout == "outline" || props.layout == "gradient") {
            return "transparent";
        }
        return colors[props.bgcolor];
    }};
    
    background-image: ${(props) => {
        if (props.layout == "gradient") {
            if (props.bgcolor == "secondary") {
                return `linear-gradient(${colors.secondary}, ${colors["dark-secondary"]})`;
            }
        }
    }};


    &:hover {
        background-color: ${(props) => {
        if (props.layout == "outline") {
            return `${colors[props.bgcolor]}70`;
        }
    }};
    }

`;