import {EstadoPosicion} from './estado-posicion.enum';
import {Pieza} from './pieza';

export class Casilla {
  private _posX: number;
  private _posY: number;
  private _estado: EstadoPosicion;
  private _pieza: Pieza;


  constructor(posX: number, posY: number, estado: EstadoPosicion) {
    this._posX = posX;
    this._posY = posY;
    this._estado = estado;
  }

  // metodos publicos
  vaciarCasilla(): boolean {
    if (this._estado !== EstadoPosicion.ocupado) {
      return false;
    }
    this._estado = EstadoPosicion.vacio;
    this._pieza = null;
  }

  ocuparCasilla(pieza: Pieza) {
    if (this._estado !== EstadoPosicion.vacio) {
      return false;
    }
    this._estado = EstadoPosicion.ocupado;
    this._pieza = pieza;
  }

  // getters y setters
  get posX(): number {
    return this._posX;
  }

  set posX(value: number) {
    this._posX = value;
  }

  get posY(): number {
    return this._posY;
  }

  set posY(value: number) {
    this._posY = value;
  }

  get estado(): EstadoPosicion {
    return this._estado;
  }

  set estado(value: EstadoPosicion) {
    this._estado = value;
  }

  get pieza(): Pieza {
    return this._pieza;
  }

  set pieza(value: Pieza) {
    this._pieza = value;
  }
}
