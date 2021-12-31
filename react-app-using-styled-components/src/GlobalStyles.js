import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #333;
  }
  #root {
    padding: 1rem;
  }
`;

export default GlobalStyles;
