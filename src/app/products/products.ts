import { Component } from '@angular/core';
import { ProductData } from '../components/product-data/product-data';

@Component({
  selector: 'app-products',
  imports: [ProductData],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

}
