import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';
import {Button, Badge} from 'react-bootstrap';
import img_empty from './empty.png'
import img_visited from './visited.png'
import img_enabled from './enabled.png'
//import AlertContainer from 'react-alert'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { transitions, positions, Provider as AlertProvider ,useAlert , withAlert} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
  <Car2 />
  </AlertProvider>
);
function Car2() {
  return <Board2 />;
}
class Car extends React.Component {
 
  render() {
    return  (<h2>Hi, I am a Car!</h2>);
  }
 // shouldComponentUpdate() {return true;}
}

function Board3 (){
  return  <Button>3</Button>
}
 
class Board2 extends React.Component {  

 
   
  constructor() {
    super();
    this.state = {      
      kolumn: 5,
      wierszy: 5,
      pola : Array(5*5).fill(0),
      aktualne:-1,
      koniec : 0,
      wygrana : 0,
      pozostale :1,
      kolor: img_empty
    };
  //  this.handleChangek = this.handleChangek.bind(this);
  //  this.handleChangew = this.handleChangew.bind(this);
  }

  handleChangek(event) {
    event.preventDefault();
    var kolumn= event.target.value;
    this.setState({      
      //pola:pola,
      kolumn:kolumn,
      aktualne:-1,
      koniec : 0,
      wygrana : 0,
      pozostale :1,
      kolor: img_empty
    })
  }
  
  handleChangew(event) { 
    event.preventDefault();
    var wierszy= event.target.value;
        this.setState({      
          //pola:pola,
          wierszy:wierszy,
          aktualne:-1,
          koniec : 0,
          wygrana : 0,
          pozostale :1,
          kolor: img_empty
        })
   }

  handleClickplusk(event){

    event.preventDefault();
    var kolumn= this.state.kolumn;
    if (kolumn < 7) kolumn++;
    var pola = Array(kolumn*this.state.wierszy).fill(0);
    this.setState({      
      pola:pola,
      kolumn:kolumn,
      aktualne:-1,
      koniec : 0,
      wygrana : 0,
      pozostale :1,
      kolor: img_empty
    })
  }
  handleClickminusk(event){
    
        event.preventDefault();
        var kolumn= this.state.kolumn;
        if (kolumn > 3) kolumn--;
        var pola = Array(this.state.wierszy*kolumn).fill(0);
        this.setState({      
          pola:pola,
          kolumn:kolumn,
          aktualne:-1,
          koniec : 0,
          wygrana : 0,
          pozostale :1,
          kolor: img_empty
        })
      }

      handleClickplusw(event){
        
            event.preventDefault();
            var wierszy= this.state.wierszy;
            if (wierszy < 7) wierszy++;
            var pola = Array(wierszy*this.state.kolumn).fill(0);
            this.setState({      
              pola:pola,
              wierszy:wierszy,
              aktualne:-1,
              koniec : 0,
              wygrana : 0,
              pozostale :1,
              kolor: img_empty
            })
          }
          handleClickminusw(event){
            
                event.preventDefault();
                var wierszy= this.state.wierszy;
                if (wierszy > 3) wierszy--;
                var pola = Array(wierszy*this.state.kolumn).fill(0);
                this.setState({      
                  pola:pola,
                  wierszy:wierszy,
                  aktualne:-1,
                  koniec : 0,
                  wygrana : 0,
                  pozostale :1,
                  kolor: img_empty
                })
              }
        

  handleClick2(event) {  //restart gry
    event.preventDefault();
   
    var pola = Array(this.state.wierszy*this.state.kolumn).fill(0);
    this.setState({  
      pola:pola,    
      aktualne:-1,
      koniec : 0,
      wygrana : 0,
      pozostale :1,
      kolor: img_empty
    })
  }

  handleClick(i){
   // const alert = useAlert()
    const pola = this.state.pola.slice();
    let kon = 0
    let a = czy_dozwolony_ruch(i,this.state.aktualne,this.state.kolumn, this.state.wierszy);
    if ( a === 0)
      {
       // alert.show("ruch niedozwolony");
       // alert("ruch niedozwolony");
      // this.msg.removeAll();
      //  this.msg.error('Move not allowed',{ time:1500, transition:'fade'});

        return false;
      }
    else
    {  

    //sprawdz czy są walne ruchy, jęsli nie to koniec = 1
    let b = czy_pozostaly_ruchy(i,pola,this.state.kolumn, this.state.wierszy);  
    let c= 0;
    if (b === 0) 
      {
        kon = 1;
        //sprawd czy wszystkie pola są 1, jesli nie to wygrana = 0; tak = 1;
        let c = czy_wygrana(pola, i,this.state.kolumn, this.state.wierszy);
        //alert("c jest "+c);
        if (c === 1)
        {
            //cx = 1;
           // this.msg.removeAll();
           // this.msg.success('You won - congratulations',{theme:'light'});
        }
        else
        {
         // this.msg.removeAll();
         // this.msg.info('Game over - press restart to try again');
        }
      }

    if (pola[i]===0){
      pola[i] = this.state.pola[i]+1;
      this.setState({      
        pola:pola,
        aktualne:i,
        pozostale:b,
        koniec:kon,
        wygrana: c
      })
    }
    //if (kon) return;
  }
  }
  
 

  renderSquare(i) {
    if (i===this.state.aktualne){
      return (
        
        <Square key={i}
          //value={this.state.pola[i]+'*'}  
          value={this.state.pola[i]}        
          kolor = {img_enabled}   
          onClick={() => this.handleClick(i)}
         
        />
      );
    }
    else{
      if (this.state.pola[i] === 1)
        {
        return (
          <Square key={i}
            value={this.state.pola[i]}   
            kolor =  {img_visited}    
            onClick={() => this.handleClick(i)}
          />
        );
      }
      else
        {
          return (
            <Square key={i}
              value={this.state.pola[i]}   
              kolor =  {img_empty}    
              onClick={() => this.handleClick(i)}
            />
          );
        }
        
      }
  }

  render() {
   /* const koniec1 = this.state.koniec;
    const wygrana1 = this.state.wygrana;
    
    if (koniec1) 
      {
         if (wygrana1) {
          this.msg.success('You won - congratulations',{theme:'light'});
           //alert("gra skończona - wygrałeś");
        }
        else
        {
         // alert("gra skończona - przegrałeś");
          this.msg.info('Game over - press restart to try again');
        }
      //return;
    }*/
    
    var rows = [];
    var cells = [];
    var cellNumber = 0;
    for (var i = 0; i < this.state.wierszy; i++) {
      for (var j = 0; j < this.state.kolumn; j++) {
        cells.push(this.renderSquare(cellNumber))
        cellNumber++
      }
      rows.push(<div key={i} className="board-row">{ cells }</div>)
      cells = [];
    }
    
    return (
       
    

         // <div style={{width: '98%', margin: '0 auto'}}>
         <div >
           
    <Button bsStyle="primary" bsSize="xsmall" block>Try to visit all fields moving in the chessHorse manner</Button>
    
  
         <br />
              columns # &nbsp;
              <Button bsStyle="danger" bsSize = "small" onClick={(e) => this.handleClickminusk(e)} >-</Button>&nbsp;
              <Badge  id="kol" type="number" > {this.state.kolumn}   </Badge>&nbsp;
              <Button bsStyle="success" bsSize = "small" onClick={(e) => this.handleClickplusk(e)} >+</Button>
              &nbsp;&nbsp;rows # &nbsp;
              <Button bsStyle="danger" bsSize = "small" onClick={(e) => this.handleClickminusw(e)} >-</Button>&nbsp;
              <Badge  id="wie" type="number" > {this.state.wierszy}  </Badge>&nbsp;
              <Button bsStyle="success" bsSize = "small" onClick={(e) => this.handleClickplusw(e)} >+</Button>
              <br />
              <Button bsStyle="primary" onClick={(e) => this.handleClick2(e)}> restart </Button>

            
            
          <br />
        
          
            {rows}
          
           
 
        
        
          
      </div>  
      
    )
  }

}
ReactDOM.render(
  <Button />,
  document.getElementById('root')
);

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
function czy_dozwolony_ruch( wybr, akt, kolumn, wierszy){
  
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

function czy_wygrana(pola, aktualne, kolumn, wierszy)
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

function czy_pozostaly_ruchy(i,pola, kolumn, wierszy){
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

function Square(props) {
  return (
   
    <button className="square" onClick={props.onClick} >
    
      <img src={props.kolor} alt={props.kolor} onClick={props.onClick}  />

    </button>   
    
  );
}



class Board extends React.Component {
  
 
  render() {
 
    
    return (
       
    

         // <div style={{width: '98%', margin: '0 auto'}}>
         <div >
           
    <Button bsStyle="primary"  block>Try to visit all fields moving in the chessHorse manner</Button>
    
  
      </div>  
      
    )
  }

  
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
