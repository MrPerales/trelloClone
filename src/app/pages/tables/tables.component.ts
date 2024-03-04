import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CdkTableModule } from '@angular/cdk/table';
import { Product } from '../../models/product.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DataSourceProduct } from './data.source';
import { BtnComponent } from '../../components/btn/btn.component';
@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    NavbarComponent,
    CdkTableModule,
    HttpClientModule,
    CommonModule,
    BtnComponent,
  ],
  templateUrl: './tables.component.html',
})
export class TablesComponent {
  dataSourceProducts = new DataSourceProduct();
  // las columnas se van a renderizar de acuerdo a la posicion del array
  colums: string[] = ['id', 'title', 'price', 'cover', 'actions'];
  constructor(private http: HttpClient) {}
  total = 0;

  ngOnInit() {
    this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe((data) => {
        this.dataSourceProducts.init(data);
        this.dataSourceProducts.getTotal();
      });
  }
  update(product: Product) {
    console.log(product);

    this.dataSourceProducts.update(product.id, {
      price: 10,
      title: 'hello',
    });
  }
}
