import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

openModal = false;


  toggle() {
    this.openModal = !this.openModal;
  }
  

}
