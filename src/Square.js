import React from 'react';


export function Square(props) {
  return (   
   <button className="square" >

      <img src={props.kolor} alt={props.kolor} onClick={props.onClick} />

    </button>
  );
}
