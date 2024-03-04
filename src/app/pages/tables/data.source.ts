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
  //Partial para que todas las propiedades de un producto sean opcionales y asi poder editar
  update(id: Product['id'], changes: Partial<Product>) {
    const products = this.data.getValue();
    const productIndex = products.findIndex((product) => product.id === id); // 0 === false
    // !== -1 ya que si el index del producto es el 0 va a dar falso y no entra
    if (productIndex !== -1) {
      // actualizamos
      products[productIndex] = {
        // agregamos la misma info que teniamos
        ...products[productIndex],
        ...changes,
      };
      //   actualizamos en todo el array
      this.data.next(products);
    }
  }
}
