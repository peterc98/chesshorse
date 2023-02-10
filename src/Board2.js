import React, { useState} from 'react';
import { Button, Badge } from 'react-bootstrap';
import img_empty from './empty.png';
import img_visited from './visited.png';
import img_enabled from './enabled.png';
import { useAlert } from 'react-alert';
import { czy_dozwolony_ruch, czy_pozostaly_ruchy, czy_wygrana, Square } from './index';
import { styles } from './styles.1';
export const Board2 = props => {

  const alert = useAlert();
  const [kolumn, setKolumn] = useState(5);
  const [wierszy, setWierszy] = useState(5);
  const [pola, setPola] = useState(Array(5 * 5).fill(0));
  const [aktualne, setAktualne] = useState(-1);
  //const [koniec, setKoniec] = useState(0);
  //const [wygrana, setWygrana] = useState(0);
  //const [pozostale, setPozostale] = useState(1);
  //const [kolor, setKolor] = useState(img_empty);
  /*
  const handleChangek = (event) => {
    event.preventDefault();
    var kolumn = event.target.value;
    setKolumn(kolumn);
    setAktualne(-1);
    setKoniec(0);
    setWygrana(0);
    setPozostale(1);
    setKolor(img_empty);
  };
  const handleChangew = (event) => {
    event.preventDefault();
    var wierszy = event.target.value;
    setWierszy(wierszy);
    setAktualne(-1);
    setKoniec(0);
    setWygrana(0);
    setPozostale(1);
    setKolor(img_empty);
  }; */
  const handleClickplusk = (event) => {
    event.preventDefault();
    //console.log("kolumn est " + kolumn);
    var kolumn_ = kolumn;
    if (kolumn_ < 7)
      kolumn_++;
    var pola = Array(kolumn * wierszy).fill(0);
    setPola(pola);
    setKolumn(kolumn_);
    setAktualne(-1);
   // setKoniec(0);
   // setWygrana(0);
   // setPozostale(1);
   // setKolor(img_empty);
  };
  const handleClickminusk = () => {
    // event.preventDefault();
    var kolumn_ = kolumn;
    //console.log("kolumn est " + kolumn);
    if (kolumn_ > 3)
      kolumn_--;
    var pola = Array(wierszy * kolumn).fill(0);
    setPola(pola);
    setKolumn(kolumn_);
    setAktualne(-1);
   // setKoniec(0);
   // setWygrana(0);
   // setPozostale(1);
   // setKolor(img_empty);
  };
  const handleClickplusw = (event) => {
    event.preventDefault();
    var wierszy_ = wierszy;
    if (wierszy_ < 7)
      wierszy_++;
    var pola = Array(wierszy * kolumn).fill(0);
    setPola(pola);
    setWierszy(wierszy_);
    setAktualne(-1);
   // setKoniec(0);
   // setWygrana(0);
   // setPozostale(1);
   // setKolor(img_empty);
  };
  const handleClickminusw = (event) => {
    event.preventDefault();
    var wierszy_ = wierszy;
    if (wierszy_ > 3)
      wierszy_--;
    var pola = Array(wierszy * kolumn).fill(0);
    setPola(pola);
    setWierszy(wierszy_);
    setAktualne(-1);
    //setKoniec(0);
    //setWygrana(0);
    //setPozostale(1);
    //setKolor(img_empty);
  };
  const handleClick2 = (event) => {
    //restart gry
    event.preventDefault();
    var pola = Array(wierszy * kolumn).fill(0);
    setPola(pola);
    setAktualne(-1);
    //setKoniec(0);
    //setWygrana(0);
    //setPozostale(1);
    //setKolor(img_empty);
  };

  const handleClick = (i) => {
    // const alert = useAlert()
    //let pola = pola.slice();
   // let kon = 0;
    let a = czy_dozwolony_ruch(i, aktualne, kolumn, wierszy);

    if (a === 0) {
      alert.removeAll();
      //alert.remove()
      alert.show("ruch niedozwolony", {type: 'error'});
      // alert("ruch niedozwolony");
      // this.msg.removeAll();
      //  this.msg.error('Move not allowed',{ time:1500, transition:'fade'});
      return false;
    } else {
      //sprawdz czy są walne ruchy, jęsli nie to koniec = 1
      let b = czy_pozostaly_ruchy(i, pola, kolumn, wierszy);
      //let c = 0;

      if (b === 0) {
       // kon = 1; //sprawd czy wszystkie pola są 1, jesli nie to wygrana = 0; tak = 1;

        let c = czy_wygrana(pola, i, kolumn, wierszy); //alert("c jest "+c);

        if (c === 1) { //cx = 1;
          // this.msg.removeAll();
          // this.msg.success('You won - congratulations',{theme:'light'});
          alert.removeAll();
          alert.show('You won - congratulations' , {type: 'success' });
        } else { // this.msg.removeAll();
          // this.msg.info('Game over - press restart to try again');
          alert.show('Game over - press restart to try again');
        }
      }

      if (pola[i] === 0) {
        pola[i] = pola[i] + 1;
        setPola(pola);
        setAktualne(i);
       // setPozostale(b);
       // setKoniec(kon);
       // setWygrana(c);
      } //if (kon) return;

    }
  };
  const renderSquare = (i) => {
    if (i === aktualne) {
      return <Square key={i} //value={this.state.pola[i]+'*'}  
        value={pola[i]} kolor={img_enabled} onClick={() => handleClick(i)} />;
    } else {
      if (pola[i] === 1) {
        return <Square key={i} value={pola[i]} kolor={img_visited} onClick={() => handleClick(i)} />;
      } else {
        return <Square key={i} value={pola[i]} kolor={img_empty} onClick={() => handleClick(i)} />;
      }
    }
  };

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

  for (var i = 0; i < wierszy; i++) {
    for (var j = 0; j < kolumn; j++) {
      cells.push(renderSquare(cellNumber));
      cellNumber++;
    }

    rows.push(<div key={i} className="board-row">{cells}</div>);
    cells = [];
  }

  return ( // <div style={{width: '98%', margin: '0 auto'}}>
    <div>

      <Button bsStyle="primary" bsSize="xsmall" block>Try to visit all fields moving in the chessHorse manner</Button>


      <br />
      columns # &nbsp;
      <Button style={styles.customButtonMinus}  onClick={(e) => handleClickminusk(e)}>-</Button>&nbsp;
      <Badge id="kol" type="number"> {kolumn}   </Badge>&nbsp;
      <Button bsStyle="success" bsSize="small" style={styles.customButtonPlus} onClick={(e) => handleClickplusk(e)}>+</Button>
      &nbsp;&nbsp;rows # &nbsp;
      <Button bsStyle="danger" bsSize="small" style={styles.customButtonMinus} onClick={(e) => handleClickminusw(e)}>-</Button>&nbsp;
      <Badge id="wie" type="number"> {wierszy}  </Badge>&nbsp;
      <Button bsStyle="success" bsSize="small" style={styles.customButtonPlus} onClick={(e) => handleClickplusw(e)}>+</Button>
      <br />
      <Button bsStyle="primary" onClick={(e) => handleClick2(e)}> restart </Button>



      <br />


      {rows}






    </div>
  );
};