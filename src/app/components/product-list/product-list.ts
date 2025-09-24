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
  AllProducts:ProductModel[]=[];  

  SelectedProduct:ProductModel|undefined ;

openModal =  false;


constructor(private productService: ProductService, private cdr: ChangeDetectorRef){

 
} 

getProduct(){
   this.productService.getProducts().subscribe((data:any)=>{
    this.products = data;
     this.cdr.detectChanges();
    console.log(this.products);
  });
}

getAllProducts(): void {
  this.productService.getAllProducts().subscribe((data: ProductModel[]) => {
    this.AllProducts = data;
  });
}


ngOnInit(){

  console.log("Hello from product list");
  this.getProduct();
  this.getAllProducts();
}


trackByProductId(index: number, product: ProductModel): string {
  return product.id.toString();
}

selectedVal(id:string){
  // this.openModal=false;
  
  this.productService.getSelectedProduct(id).subscribe((data:ProductModel)=>{
    this.SelectedProduct = data;

    // give Angular a tick to notice the false → true change
    setTimeout(() => {
      this.openModal = true;
      this.cdr.detectChanges(); // make sure view updates
    }, 0);
  })
}
deleteProduct(id:string){
  this.productService.deleteProduct(id).subscribe((data)=>{
    console.log(data);
    this.getProduct();
  })
}
  toggle() {
    this.openModal = !this.openModal;
  }
  
onSubmit(product: ProductModel) {
  if (!this.SelectedProduct) {
    // New product
    this.productService.addProduct(product).subscribe((data) => {
      if (data) {
        console.log('New product added:', data);
        this.openModal = false;
        this.getProduct();
      }
    });
  } else {
    // Update existing product
    const productdata = { ...product, id: this.SelectedProduct.id };
    this.productService.updateProduct(productdata).subscribe((data) => {
      console.log('Product updated:', data);
      this.SelectedProduct = undefined;

      this.openModal = false;
      this.getProduct();

    });
  }
}


}
