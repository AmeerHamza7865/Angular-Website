import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../Interface/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private http:HttpClient) { }

  getProducts(){
    const url = 'http://localhost:3000/products';
    return this.http.get(url);
  }

  addProduct(product:ProductModel){
    const url = 'http://localhost:3000/products';
    return this.http.post(url, product);
  }

}
