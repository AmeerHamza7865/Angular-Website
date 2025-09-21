import { Component, NgModule } from '@angular/core';
import { ProductService } from '../../service/product-service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductModel } from '../../Interface/productModel';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  products: ProductModel[] = [];
  
openModal = false;


constructor(private productService: ProductService){

 
} 

getProduct(){
   this.productService.getProducts().subscribe((data:any)=>{
    this.products = data;
    console.log(this.products);
  });
}
ngOnInit(){
  this.getProduct();
}


  toggle() {
    this.openModal = !this.openModal;
  }
  
  onSubmit(form: NgForm) {
    this.productService.addProduct(form.value).subscribe((data)=>{
      if(data){
        this.getProduct();
        console.log(data);
        this.openModal = false;
        form.reset();
      }
    })
  }

}
