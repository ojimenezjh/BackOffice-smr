import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product, CartaProducto } from "../models/Product";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  API_URI = "http://82.223.128.240:3000/api";

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.API_URI}/products`);
  }

  getProduct(id_producto: Number) {
    return this.http.get<Product>(`${this.API_URI}/products/${id_producto}`);
  }

  searchProduct(producto: String) {
    return this.http.get<Product[]>(
      `${this.API_URI}/products/producto/${producto}`
    );
  }

  getProductsByCard(id_carta: Number) {
    return this.http.get<Product[]>(
      `${this.API_URI}/carta/products/id_carta/${id_carta}`
    );
  }

  deleteProduct(id_producto: Number) {
    return this.http.delete(`${this.API_URI}/products/${id_producto}`);
  }

  saveProduct(product: Product) {
    return this.http.post(`${this.API_URI}/products/save`, product);
  }

  insertProductToCard(carta_productos: CartaProducto) {
    return this.http.post(`${this.API_URI}/products`, carta_productos);
  }

  deleteProductInCard(id_carta: Number, id_producto: Number) {
    return this.http.delete(`${this.API_URI}/products/carta/${id_carta}/${id_producto}`);
  }

  updateProduct(
    id_producto: String | Number,
    updatedProduct: Product
  ): Observable<Product> {
    return this.http.put<Product>(
      `${this.API_URI}/products/${id_producto}`,
      updatedProduct
    );
  }
}
