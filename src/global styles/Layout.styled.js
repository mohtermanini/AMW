import { createGlobalStyle } from "styled-components";


export const LayoutStyles = createGlobalStyle`
    @font-face {
        font-family: "Lato";
        src: url("../fonts/Lato-Regular.tff") format('tff');
            
    }
    @font-face {
        font-family: "Lato";
        src: url("../fonts/Lato-Bold.tff") format('tff');
        font-weight: bold;
    }
    *, *::before, *::after {
        box-sizing: border-box;
    }
    html {
        font-size: 10px;
    }
    body {
        font-size: 1.6rem;
        background-color: #FBFBFB;
        font-family: "Lato", "Arial", sans-serif;
        line-height:1.6rem;
    }
    #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    main {
        flex-grow: 1;
    }
    h1,h2,h3 {
        font-weight: bold;
    }
    h1 {
        font-size: 3rem;
    }
    a {
        text-decoration: none;
    }
`;