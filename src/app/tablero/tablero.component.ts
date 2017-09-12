import { Component, OnInit } from '@angular/core';
import {Casilla} from '../casilla';
import {Pieza} from '../pieza';
import {EstadoPosicion} from '../estado-posicion.enum';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  casillas: Casilla[][];

  constructor() { }

  ngOnInit() {
    const x = 9;
    const y = 9;
    let index = 0;
    this.casillas = [];

    for (let i = 0; i < x; i++) {
      this.casillas[i] = []
        for (let j = 0; j < y; j++) {
          let estadoCasilla = EstadoPosicion.noDisponible;
          let p = null;
          if ((i >= 4 && i <= 6) || (j >= 3 && j <= 6)){
            estadoCasilla = EstadoPosicion.ocupado;
            p = new Pieza(index, true);
          }
          const casilla = new Casilla(i, j, estadoCasilla);
          if (p != null) {
             casilla.pieza = p;
          }
          this.casillas[i][j] = casilla;
          index++;
        }
    }
  }

}
