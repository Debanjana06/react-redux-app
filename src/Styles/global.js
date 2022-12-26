import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}
  body {
    background: ${({theme})=>theme.background};
    color: ${({theme})=>theme.title};
    margin: 0;
    padding: 0;
    font-family:  Sans-Serif;
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
    align-content: center;
    color: ${({theme})=>theme.typeBoxText};
  }
  .word {
    padding-right: 2px;
    margin: 5px;
}
  .hidden-input{
    opacity: 0;
  }

  .correct{
    color: ${({theme})=>theme.title};
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
  .skipped{
    color: grey;
  }
  .footer{
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  .stats-box{
    display: flex;
    max-width: 1000px;
    height: auto;
    marging-right: auto;
  }
  .left-stats{
    width: 30%;
    padding: 30px;
  }
  .right-stats{
    width: 70%;
  }
  .title{
    font-size: 20px;
    color: ${({theme})=>theme.typeBoxText};
  }
  .subtitle{
    font-size: 30px;
    color: ${({theme})=>theme.title};
  }

  .upper-menu{
    display: flex;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    font-size: 1.35rem;
    padding: 0.5rem;
  }
  
  .time-modes{
    display: flex;
  }

  .time{
    margin-right: 5px;
  }
  .time:hover{
    color: ${({theme})=>theme.typeBoxText};
    cursor: pointer;
  }
  .header{
    display: flex;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    cursor: pointer;
  }
  .github-button{
    width: 400px;
    text-align: center;
    background: black;
    color : white;
    height: 3rem;
    border: 2px solid;
    border-radius: 10px;
  }
`;
 
export default GlobalStyle;