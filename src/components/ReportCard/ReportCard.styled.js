import styled from "styled-components";
import { colors } from "../../variables/colors";

export const StyledReportCard = styled.div`
    padding: 2rem 3rem;
    border: 1px solid #DCDCDC;
    border-radius: 0.5rem;
    display:flex;
    flex-direction: column;
    align-items: start;
    gap: 2.5rem;
    align-self: stretch;
    box-shadow: 7px 7px 13px rgba(0,0,0,0.5);
    .title {
        font-size: 2rem;
        font-weight: bold;
    }
`;