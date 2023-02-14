import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Board2 } from './Board2';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: '30px',
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


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
