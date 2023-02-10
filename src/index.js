import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';
//import {Button} from 'react-bootstrap';
//import AlertContainer from 'react-alert'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import { transitions, positions, Provider as AlertProvider ,withAlert} from 'react-alert'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Board2 } from './Board2';
//import 'bootstrap/dist/css/bootstrap.css';
//import { styles }  from './styles.js'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  
  timeout: 1300,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
  <App2 />
  </AlertProvider>
);
function App2() {
  return <Board2 />;
}
/* class Car extends React.Component {
 
  render() {
    return  (<h2>Hi, I am a Car!</h2>);
  }
 // shouldComponentUpdate() {return true;}
} */

/* function Board3 (){
  return  <Button>3</Button>
} */
 
//ReactDOM.render(
//  <Button />,
//  document.getElementById('root')
//);

//class App extends React.Component {
//  // constructor() {
//  //   super();
//  // }
//   render() {
//     return (       
//           <Board />          
//     )
//   }
// }
export function czy_dozwolony_ruch( wybr, akt, kolumn, wierszy){
  
  if (akt === -1)
    return 1;
  var kol_wybr = wybr%kolumn;
  var kol_akt = akt%kolumn;
  var wie_wybr = Math.floor( wybr/kolumn);
  var wie_akt = Math.floor( akt/kolumn);
  if ( ( ( Math.abs(kol_akt-kol_wybr) === 1)  && (Math.abs(wie_akt-wie_wybr) === 2))   ||  ( ( Math.abs(kol_akt-kol_wybr) === 2)  && (Math.abs(wie_akt-wie_wybr) === 1) )    )
    return 1;
  else
    return 0;
 }

export function czy_wygrana(pola, aktualne, kolumn, wierszy)
{
  for (var a = 0; a<kolumn*wierszy; a++) {
      if ((pola[a] === 0) &&(a !== aktualne))
        return 0;
  }
  return 1;
}

// i oznacza nowy ruch poniżej

function znajdz_wartosc(k,w,pola,kolumn){
  return pola[k+kolumn*w];
}

export function czy_pozostaly_ruchy(i,pola, kolumn, wierszy){
  var kol_nowy = i%kolumn;  
  var wie_nowy = Math.floor( i/kolumn);
  if (kol_nowy< kolumn-1 && wie_nowy < wierszy-2){
    var wartosc_pola0 = znajdz_wartosc(kol_nowy+1,wie_nowy+2,pola,kolumn);
    if (wartosc_pola0 === 0) return 1;
  }
  
  if (kol_nowy< kolumn-2 && wie_nowy < wierszy-1){
    var wartosc_pola1 = znajdz_wartosc(kol_nowy+2,wie_nowy+1,pola,kolumn);
    if (wartosc_pola1 === 0) return 1;
  }
  
  if (kol_nowy> 0 && wie_nowy >1){
    var wartosc_pola2 = znajdz_wartosc(kol_nowy-1,wie_nowy-2,pola,kolumn);
    if (wartosc_pola2 === 0) return 1;
  }

  if (kol_nowy>1 && wie_nowy >0){
    var wartosc_pola3 = znajdz_wartosc(kol_nowy-2,wie_nowy-1,pola,kolumn);
    if (wartosc_pola3 === 0) return 1;
  }

if (kol_nowy< kolumn-1 && wie_nowy >1){
  var wartosc_pola4 = znajdz_wartosc(kol_nowy+1,wie_nowy-2,pola,kolumn);
  if (wartosc_pola4 === 0) return 1;
}

if (kol_nowy>0 && wie_nowy < wierszy-2){
  var wartosc_pola5 = znajdz_wartosc(kol_nowy-1,wie_nowy+2,pola,kolumn);
  if (wartosc_pola5 === 0) return 1;
}

if (kol_nowy> 1&& wie_nowy < wierszy-1){
  var wartosc_pola6 = znajdz_wartosc(kol_nowy-2,wie_nowy+1,pola,kolumn);
  if (wartosc_pola6 === 0) return 1;
}

if (kol_nowy< kolumn-2 && wie_nowy >0){
  var wartosc_pola7 = znajdz_wartosc(kol_nowy+2,wie_nowy-1,pola,kolumn);
  if (wartosc_pola7 === 0) return 1;
}

  return 0;
 }

export function Square(props) {
  return (
   
    <button className="square" onClick={props.onClick} >
    
      <img src={props.kolor} alt={props.kolor} onClick={props.onClick}  />

    </button>   
    
  );
}



/* class Board extends React.Component {
  
 
  render() {
 
    
    return (
       
    

         // <div style={{width: '98%', margin: '0 auto'}}>
         <div >
           
    
  
      </div>  
      
    )
  }

  
} */


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
