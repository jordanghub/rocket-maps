import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }  

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    color: white;
    font-size: 1.2rem;
    font-family: 'Montserrat', sans-serif;
    overflow: auto;
  }



`;
