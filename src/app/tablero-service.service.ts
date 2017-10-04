import {Injectable} from '@angular/core';
import {Casilla} from './casilla';
import {EstadoPosicion} from './estado-posicion.enum';
import {Pieza} from './pieza';

@Injectable()
export class TableroServiceService {

  constructor() {
  }

  /**
   * Metodo que mueve una pieza desde una posicion incial hasta una final, atravesando
   * una casilla intermedia.
   * @param {Casilla[]} casillas La pos 0 corresponde a la casilla de origen, la 1 a la casilla
   * ocupada del medio y la 3, a la casilla de destino, la cual debe estar vacia.
   * @returns {Map<boolean, string>} Mapa clave/valor con key false si hubo un error y true
   * si el movimiento fue exitoso.
   */
  moverPieza(casillas: Casilla[]): Map<boolean, string> {
    const response: Map<boolean, string> = new Map<boolean, string>();
    const error = this.validarMovimiento(casillas);

    if (error !== null && error.length > 0) {
      response.set(false, error);
      return response;
    }
    const casiilaFrom = casillas[0];
    const casillaMedio = casillas[1];
    const casillaTo = casillas[2];

    // ahora se cambian de estado las casillas
    const piezaFrom: Pieza = casiilaFrom.pieza;
    casiilaFrom.vaciarCasilla();
    casillaMedio.vaciarCasilla();
    casillaTo.ocuparCasilla(piezaFrom);

    response.set(true, 'Se movió desde ' + casiilaFrom.posX + '' + casiilaFrom.posY + ' a '
      + casillaTo.posX + '' + casillaTo.posY);
    return response;
  }

  /**
   * Metodo privado que valida el movimiento de las piezas.
   * @param {Casilla[]} casillas Arreglo donde se especifican la casiila de inicio, la intermedia y la final. Siempre
   * deben ser 3. La primera e intermedia deben estar ocupadas. La ultima debe estar vacia. Ninguna puede estar no
   * disponible. No se permiten movimientos diagonales.
   * @returns {Map<boolean, string>} Mapa que indica si es valido y el error
   */
  private validarMovimiento(casillas: Casilla[]): string {
    let response: string = null;
    // se debe especificar un array de tres casillas: origen, destino e intermedia
    if (casillas.length !== 3) {
      response = 'No se han especificado correctamente las casillas.';
      return response;
    }
    // la casilla del comienzo debe estar ocupada. No puede ser 'vacia' ni 'no-disponible'.
    const casiilaFrom = casillas[0];
    if (casiilaFrom.estado !== EstadoPosicion.ocupado) {
      response = 'La casilla de origen no está ocupada.';
      return response;
    }
    // la casilla del medio debe estar ocupada tambien. No puede ser 'vacia' ni 'no-disponible'.
    const casillaMedio = casillas[1];
    if (casillaMedio.estado !== EstadoPosicion.ocupado) {
      response = 'La casilla intermedia no está ocupada.';
      return response;
    }
    // la ultima casilla debe estar vacia. No puede ser 'ocupada' ni 'no-disponible'
    const casillaTo = casillas[2];
    if (casillaTo.estado !== EstadoPosicion.vacio) {
      response = 'La casilla de destino no está vacía.';
      return response;
    }
    // no se puede mover una pieza en diagonal, siempre a los costados
    const difX = Math.abs(casiilaFrom.posX - casillaTo.posX);
    const difY = Math.abs(casiilaFrom.posY - casillaTo.posY);
    if (difX + difY !== 2) {
      response = 'Se quiere pasar a una posición inválida.';
      return response;
    }
    return response;
  }
}
