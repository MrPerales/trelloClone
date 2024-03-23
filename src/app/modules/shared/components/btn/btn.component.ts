import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { COLORS, Colors } from '../../../../models/colors.model';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn.component.html',
})
export class BtnComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: Colors = 'success';
  // mejorando el color del boton
  mapColors = COLORS;

  //para que el color sea dinamico agregar en getColors
  get getColors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }
}
