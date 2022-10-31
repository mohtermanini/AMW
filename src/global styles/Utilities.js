import { createGlobalStyle } from "styled-components";

export const UtilitiesStyles = createGlobalStyle`

// Display Utitlities

    .flex-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }
    .flex-center {
        display: flex;
        align-items: center;
        justify-content:center;
    }
    .gap-1 {
        gap: 1rem;
    }
    .gap-5 {
        gap: 5rem;
    }

// Modal Utitlities

    .modal-active {
        overflow: hidden;
        padding-right: 15px;
    }
    
`;