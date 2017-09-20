import {Component, Input, OnInit} from '@angular/core';
import {Casilla} from '../casilla';
import {EstadoPosicion} from '../estado-posicion.enum';

@Component({
  selector: 'app-casilla',
  templateUrl: './casilla.component.html',
  styleUrls: ['./casilla.component.css']
})
export class CasillaComponent implements OnInit {

  @Input() casilla: Casilla;
  estadoClass: string;
  selected: boolean;

  constructor() { }

  ngOnInit() {
    this.selected = false;
    /*switch (this.casilla.estado) {
      case EstadoPosicion.vacio:
        this.estadoClass = 'vacio';
        break;
      case EstadoPosicion.ocupado:
        this.estadoClass = 'ocupado';
        break;
      case EstadoPosicion.noDisponible:
        this.estadoClass = 'no-disponible';
    }*/
  }

  select(): void {
    this.selected = !this.selected;
    /*if(this.selected){
      this.selected = false;
    }else{
      this.selected = true;
    }*/
  }
}
