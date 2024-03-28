import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle
`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    *:focus-visible {
        outline: 3px solid #aba39e;
    }

    * {
        box-sizing: border-box;
    }

    body {
        font-family: Roboto, sans-serif;
        font-weight: 400;
    }

    a {
        text-decoration: none
    }

    ul {
        list-style: none;
    }
    
    .App{
        padding-top: 50px;
        display: flex;
        gap: 30px;
        justify-content: center;
        flex-wrap: wrap;
    }
`