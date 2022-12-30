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
    overflow-y : scroll;
  }
  body::-webkit-scrollbar{
    diaplay:none;
 }
  .canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    padding: 2rem;
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
    flex-direction:column;
    align-self:end;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  .actual-footer{
    display: flex;
    justify-content: space-between;
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
  .reset-subtitle{
    font-size: 40px;
    color: ${({theme})=>theme.title};
    cursor:pointer;
  }

  .upper-menu{
    display: flex;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    font-size: 1.35rem;
    padding: 0.5rem;
    cursor: pointer;
  }
  
  .time-modes,.words-modes{
    display: flex;
    cursor:pointer;
  }

  .time,.no-of-word{
    margin-right: 5px;
  }
  .time:hover, .no-of-word:hover{
    color: ${({theme})=>theme.typeBoxText};
    cursor: pointer;
  }
  .header{
    display: flex;
    width: 1000px;
    align-self:stretch;
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
  .user-profile{
    width:1000px;
    margin:auto;
    margin-top:1rem;
    display:flex;
    min-height:15rem;
    background:${({theme})=>theme.typeBoxText};
    border-radius: 20px;
    justify-content:center;
    align-text: center;
  }
  .user{
    width: 50%;
    display:flex;
    margin-top: 30px;
    margin-bottom:30px;
    font-size:1.25rem;
    padding:1rem;
    border-right: 2px solid;
  }
  .info{
    width:60%;
    padding:1rem;
    margin-top:1rem;
  }
  .picture{
    width:40%
  }
  .total-tests{
    width:50%;
    font-size:3rem;
    display:flex;
    justify-content:center;
    align-items:center;
  
  }
 .graph, .table{
  width:1000px;
  margin:auto;
  margin-top: 30px;
  margin-bottom: 15px;
 }
 .comparision:after{
  content: "";
  display: table;
  clear: both;
  
 }
 .graph-data{
  float: left;
  width: 50%;
  padding: 15px;
  height: 90vh;
  margin:auto;
  margin-top: 30px;
  margin-bottom: 15px;
  border-right:2px solid;
 }
 .you, .compareUse{
  display:flex;
  justify-content:center;
  align-items:center;
  text-align:center;
  font-size:1.8rem;
  font-weight:400;
  margin:25px;
  padding:8px;
 }
 .back{
  width:60px;
  height:60px;
  margin:20px;
  cursor:pointer;
  padding:18px;
  border:1px solid;
  border-radius: 10px;
  background:${({theme})=>theme.title};
  color: ${({theme})=>theme.background};
 }
 .center-of-screen{
  display:flex;
  min-height:100vh;
  justify-content:center;
  align-items:center;
  text-align:center;
  font-size:3rem;
 }
 .logo{
  display: flex;
  gap: 10px;
 }
 .compare-btn{
  cursor:pointer;
  color: ${({theme})=>theme.background};
  background:${({theme})=>theme.title};
  padding:0.3rem;
  border-radius:5px;
  margin-top:-5px;
 }
 .instruction{
  color:${({theme})=>theme.title};
 }
 .hint{
    kbd{
      background:${({theme})=>theme.title};
      color:${({theme})=>theme.background};
      padding: 2.5px 5px;
      border-radius: 4px; 
    }
 }
 
}
`;
 
export default GlobalStyle;