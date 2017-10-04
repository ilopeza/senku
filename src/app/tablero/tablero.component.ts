import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Casilla} from '../casilla';
import {Pieza} from '../pieza';
import {EstadoPosicion} from '../estado-posicion.enum';
import {TableroServiceService} from '../tablero-service.service';
import {forEach} from '@angular/router/src/utils/collection';
import {CasillaComponent} from '../casilla/casilla.component';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
  providers: [TableroServiceService]
})
export class TableroComponent implements OnInit {

  @ViewChildren(CasillaComponent)
  private casillasComponent: QueryList<CasillaComponent>;
  casillas: Casilla[][];
  selectedCasillaFrom: Casilla;
  selectedCasillaTo: Casilla;

  constructor(private tableroSrv: TableroServiceService) {
  }

  ngOnInit() {
    const x = 9;
    const y = 9;
    let index = 0;
    this.casillas = [];

    console.log('Creando tablero con ' + (x * y) + ' casillas');
    for (let i = 0; i < x; i++) {
      this.casillas[i] = [];
      for (let j = 0; j < y; j++) {
        let estadoCasilla = EstadoPosicion.noDisponible;
        let p = null;
        if ((i > 2 && i < 6)
          || (j > 2 && j < 6)) {
          if (i === 4 && j === 4) {
            estadoCasilla = EstadoPosicion.vacio;
          } else {
            estadoCasilla = EstadoPosicion.ocupado;
            p = new Pieza(index, true);
          }
        }
        const casilla = new Casilla(i, j, estadoCasilla);
        if (p != null) {
          casilla.pieza = p;
        }
        this.casillas[i][j] = casilla;
        index++;
      }
    }
    console.log('Terminado tablero con ' + (x * y) + ' casillas');
  }

  select(selectedCasilla: Casilla): void {
    console.log('Tablero select');
    this.limpiarCasillasSelected(this.casillasComponent, this.selectedCasillaTo, this.selectedCasillaFrom);
    // tiene que ser una casilla disponible
    if (selectedCasilla.estado === EstadoPosicion.noDisponible) {
      return;
    }

    // es el primer click sobre el tablero
    if (this.selectedCasillaFrom == null) {
      if (selectedCasilla.estado !== EstadoPosicion.ocupado) {
        return;
      }
      console.log('Primer click!');
      this.selectedCasillaFrom = selectedCasilla;
      this.selectedCasillaTo = null;
      return;
    }
    // es el segundo click sobre el tablero
    if (this.selectedCasillaTo == null) {
      if (selectedCasilla.estado !== EstadoPosicion.vacio) {
        return;
      }
      // esta desocupado
      console.log('Segundo click');
      this.selectedCasillaTo = selectedCasilla;
      const casillaMedio = this.getCasillaById(this.selectedCasillaTo, this.selectedCasillaFrom);
      const casillasMovimiento = [this.selectedCasillaFrom, casillaMedio, this.selectedCasillaTo];

      const message = this.tableroSrv.moverPieza(casillasMovimiento);
      if (message.has(false)) {
        alert('Error! ' + message.get(false));
        return;
      }

      this.limpiarCasillasSelected(this.casillasComponent, this.selectedCasillaTo, this.selectedCasillaFrom);

      this.selectedCasillaTo = null;
      this.selectedCasillaFrom = null;
    }
  }

  /**
   * Metodo privado que limpia las casillas sucias que quedaron como selected.
   * @param {QueryList<CasillaComponent>} components
   * @param {Casilla} primerCasilla
   * @param {Casilla} segundaCasilla
   */
  private limpiarCasillasSelected(components: QueryList<CasillaComponent>,
                                  primerCasilla: Casilla, segundaCasilla: Casilla) {
    const cas: CasillaComponent[] = components
      .filter(item => item.casilla === primerCasilla || item.casilla === segundaCasilla);
    for (let i = 0; i < cas.length; i++) {
      cas[i].selected = false;
    }
  }

  private getCasillaById(casFrom: Casilla, casTo: Casilla) {
    const posXFrom = casFrom.posX;
    const posYFrom = casFrom.posY;
    const posXTo = casTo.posX;
    const posYTo = casTo.posY;
    let posX = posXFrom >= posXTo ? posXFrom : posXTo;
    let posY = posYFrom >= posYTo ? posYFrom : posYTo;

    if ((posYFrom - posYTo) === 0) {
      posX--;
    } else {
      posY--;
    }
    return this.casillas[posX][posY];
  }
}
