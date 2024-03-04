import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CdkTableModule } from '@angular/cdk/table';
import { Product } from '../../models/product.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [NavbarComponent, CdkTableModule, HttpClientModule, CommonModule],
  templateUrl: './tables.component.html',
})
export class TablesComponent {
  products: Product[] = [];
  // las columnas se van a renderizar de acuerdo a la posicion del array
  colums: string[] = ['id', 'title', 'price', 'cover'];
  constructor(private http: HttpClient) {}
  total = 0;

  ngOnInit() {
    this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe((data) => {
        this.products = data;
        const productsPrice = this.products.map((product) => product.price);
        this.total = productsPrice.reduce((price, total) => total + price, 0);
      });
  }
}
