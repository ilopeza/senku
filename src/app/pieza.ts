
export class Pieza {
  private _id: number;
  private _vivo: boolean;

  constructor(id: number, vivo: boolean) {
    this._id = id;
    this._vivo = vivo;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get vivo(): boolean {
    return this._vivo;
  }

  set vivo(value: boolean) {
    this._vivo = value;
  }
}
