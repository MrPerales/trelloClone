import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [],
  templateUrl: './card-color.component.html',
})
export class CardColorComponent {
  @Input() backgroundColor:
    | 'sky'
    | 'yellow'
    | 'green'
    | 'gray'
    | 'red'
    | 'violet' = 'sky';
  constructor() {}
  mapColors = {
    sky: {
      'bg-sky-700': true,
      'hover:bg-sky-800': true,
      'text-white': true,
    },
    yellow: {
      'bg-yellow-700': true,
      'hover:bg-yellow-800': true,
      'text-white': true,
    },
    green: {
      'bg-green-700': true,
      'hover:bg-green-800': true,
      'text-white': true,
    },
    gray: {
      'bg-gray-700': true,
      'hover:bg-gray-800': true,
      'text-white': true,
    },
    red: {
      'bg-red-700': true,
      'hover:bg-red-800': true,
      'text-white': true,
    },
    violet: {
      'bg-violet-700': true,
      'hover:bg-violet-800': true,
      'text-white': true,
    },
  };

  get getColors() {
    const color = this.mapColors[this.backgroundColor];
    return color ? color : {};
  }
}
