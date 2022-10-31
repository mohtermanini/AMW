import styled from "styled-components";
import { colors } from "../../variables/colors"
import { breakpoints } from "../../variables/breakpoints"

export const StyledDataTable = styled.div`
    width: 100%;
    overflow-x: auto;
    table {
        width: 100%;
    }
    th, td {
        padding: 1rem 2rem;
        color: #000;
        text-align: center;
        overflow: auto;
        vertical-align: middle;
    }
    th {
        text-transform: uppercase;
        letter-spacing: .1rem;
    }
    thead tr{
        th {
         color: #fff;
          border: 1px solid ${colors.grey};
        }
        th:first-child {
            min-width: auto;
        }
        th:nth-child(odd) {
            background-color: ${colors.primary};
        }
        th:nth-child(even) {
            background-color: ${colors.secondary};
        }
        
    }
    tbody tr {
        td {
            border: 1px solid ${colors.grey};
        }
        td:first-child {
            min-width: auto;
        }
        &:nth-child(odd) {
            background-color: #fff;
        }
        &:nth-child(even) {
            background-color: ${colors["light-grey"]};
        }
    }

@media screen and (max-width: ${breakpoints.md}) {
        table {
            border: 0;
        }

        table thead {
            border: none;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }
        
        table tr {
            border-bottom: 3px solid ${colors["light-grey"]};
            border-radius: 1rem;
            display: block;
            margin-top: 2rem;
            padding: 2rem 1rem;
            &:first-child {
                margin-top: 0;
            }
            &:nth-child(odd) {
                background-color: #9dd1bb;
            }
            &:nth-child(even) {
                background-color: #a1cfd6;
            }
        }
        
        table tr td {
            border: none;
            border-bottom: 1px solid ${colors["light-grey"]};
            display: block;
            text-align: right;
            padding: 1.5rem 2rem;
            color: #fff;
            &:last-child {
                border-bottom: none;
            }
        }
        
        table td::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
        }

        table .flex-center {
            justify-content: end;
        }
    }
`;