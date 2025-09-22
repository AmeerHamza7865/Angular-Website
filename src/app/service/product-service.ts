import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../Interface/productModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
    private Apiurl = 'http://localhost:3000/products';

  constructor(private http:HttpClient) { }

  getProducts(){
    const url = 'http://localhost:3000/products';
    return this.http.get(url);
  }

getAllProducts(): Observable<ProductModel[]> {
  return this.http.get<ProductModel[]>(this.Apiurl);
}

getSelectedProduct(id:string):Observable<ProductModel>{
      // const url = 'http://localhost:3000/products'+'/'+;
      return this.http.get<ProductModel>(this.Apiurl+ "/"+ id)
}



  addProduct(product:ProductModel){
    const url = 'http://localhost:3000/products';
    return this.http.post(url, product);
  }

  updateProduct(product:ProductModel):Observable<ProductModel>{
    return this.http.put<ProductModel>(this.Apiurl +"/"+product.id,product)
  }

  
  deleteProduct(id:string){
    return this.http.delete(this.Apiurl +"/"+id)
  }

}
