import { Component, NgModule } from '@angular/core';
import { ProductService } from '../../service/product-service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductModel } from '../../Interface/productModel';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, FormsModule, NgFor],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  products: ProductModel[] = [];
  
openModal = false;


constructor(private productService: ProductService, private cdr: ChangeDetectorRef){

 
} 

getProduct(){
   this.productService.getProducts().subscribe((data:any)=>{
    this.products = data;
     this.cdr.detectChanges();
    console.log(this.products);
  });
}


trackByProductId(index: number, product: ProductModel): string {
  return product.id.toString();
}
ngOnInit(){

  console.log("Hello from product list");
  this.getProduct();
}


  toggle() {
    this.openModal = !this.openModal;
  }
  
  onSubmit(form: NgForm) {
    this.productService.addProduct(form.value).subscribe((data)=>{
      if(data){
        console.log(data);
        this.openModal = false;
        form.reset();
        this.getProduct();
      }
    })
  }

}
