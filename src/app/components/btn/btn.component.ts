import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn.component.html',
})
export class BtnComponent {
  @Input() typeBtn: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'success' | 'primary' | 'danger' | 'gray-light' = 'success';

  //para que el color sea dinamico agregar en getColors
  get getColors() {
    return {
      'text-white':
        this.color === 'primary' ||
        this.color === 'success' ||
        this.color === 'danger',
      'text-gray-700': this.color === 'gray-light',
      'bg-success-600 ': this.color === 'success',
      'hover:bg-success-800': this.color === 'success',
      'focus:ring-success-300': this.color === 'success',
      'bg-primary-600 ': this.color === 'primary',
      'hover:bg-primary-800': this.color === 'primary',
      'focus:ring-primary-300': this.color === 'primary',
      'bg-danger-600 ': this.color === 'danger',
      'hover:bg-danger-800': this.color === 'danger',
      'focus:ring-danger-300': this.color === 'danger',
      'bg-gray-200 ': this.color === 'gray-light',
      'hover:bg-gray-500': this.color === 'gray-light',
      'focus:ring-gray-50': this.color === 'gray-light',
    };
  }
}
