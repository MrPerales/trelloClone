import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { COLORS, Colors } from '../../../../models/colors.model';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-color.component.html',
})
export class CardColorComponent {
  @Input() backgroundColor: Colors = 'sky';
  constructor() {}
  mapColors = COLORS;

  get getColors() {
    const color = this.mapColors[this.backgroundColor];
    return color ? color : {};
  }
}
