import { DataSource } from '@angular/cdk/collections';
import { Product } from '../../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

// extendemos a dataSource y como estamos extendiendo tenemos que usar
// los metodos connect y discconnect

export class DataSourceProduct extends DataSource<Product> {
  //
  data = new BehaviorSubject<Product[]>([]);
  //metodo que devuelva un observable que sea un array de productos
  connect(): Observable<Product[]> {
    return this.data;
  }
  //   por el momento no lo usamos discconnect
  disconnect() {}

  //   metodo
  init(products: Product[]) {
    this.data.next(products);
  }
  getTotal() {
    const products = this.data.getValue();
    const productsPrice = products.map((product) => product.price);
    const total = productsPrice.reduce((price, total) => total + price, 0);
    return total;
  }
}
