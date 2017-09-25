import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Casilla} from '../casilla';
import {EstadoPosicion} from '../estado-posicion.enum';

@Component({
  selector: 'app-casilla',
  templateUrl: './casilla.component.html',
  styleUrls: ['./casilla.component.css']
})
export class CasillaComponent implements OnInit {

  @Output() onPressed = new EventEmitter<Casilla>();
  @Input() casilla: Casilla;
  selected: boolean;

  constructor() { }

  ngOnInit() {
    this.selected = false;
  }

  onCasillaSelected(): void {
    this.selected = !this.selected;
    this.onPressed.emit(this.casilla);
  }
}
