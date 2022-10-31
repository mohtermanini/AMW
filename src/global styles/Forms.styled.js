import { createGlobalStyle } from "styled-components";
import { colors } from "../variables/colors";


export const FormsStyles = createGlobalStyle`
   input {
    padding: 1rem 1.25rem;
    border-radius: 0.5rem;
    border: none;
   }
   input[type=checkbox] {
      appearance: none;
      position: relative;
      border: 1px solid #000;
      border-style: 0.25rem;
      padding: 0.75rem;
      &:checked {
         border-color: #0d6efd;
         background-color: #0d6efd;
         background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
      }
      &:disabled {
         background-color: ${colors["grey"]};
         border-color: ${colors["grey"]};
      }
   }
   input[type=number] {
      width: 100px;
   }

   input[type=date] {
      width: 150px;
      font-family: inherit;
   }

   select {
      appearance: none;
      padding: 1rem 1.25rem;
      border-radius: 0.5rem;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
      background-position: right 0.75rem center;
      background-repeat: no-repeat;
      background-size: 16px 12px;
      border-color: ${colors["light-grey"]};
   }

   textarea {
      border-radius: 0.5rem;
      padding: 1rem 1.25rem;
      border: none;
      font-family: inherit;
   }
`;