import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}
  body {
    background: black;
    color: white;
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    transition: all 0.25s linear;
  }

  .canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    padding: 1rem;
    width: 100vw;
    text-align: center;
    align-items: center;
  }
  .type-box{
    display: block;
    max-width: 1000px;
    height: 140px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }
  .words{
    font-size: 32px;
    display: flex;
    flex-wrap: wrap;
    align-content: center
  }
  .word {
    padding-right: 2px;
    margin: 5px;
}
  .hidden-input{
    opacity: 0;
  }

  .correct{
    color: green;
  }

  .incorrect{
    color: red;
  }

  .current{
    border-left: 1px solid;
    animation: blinkingLeft 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingLeft{
      0% {border-left-color: white;}
      25% {border-left-color: black;}
      50% {border-left-color: white;}
      75% {border-left-color: black;}
      100% {border-left-color: white;}
    }
  }

  .right-current{
    border-right: 1px solid;
    animation: blinkingright 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingright{
      0% {border-right-color: white;}
      25% {border-right-color: black;}
      50% {border-right-color: white;}
      75% {border-right-color: black;}
      100% {border-right-color: white;}
    }
  }
`;
 
export default GlobalStyle;