import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule, NgFor } from '@angular/common';
import { ProductService } from '../../service/product-service';
import { ProductModel } from '../../Interface/productModel';
import { FormsModule } from '@angular/forms';





@Component({
  selector: 'app-product-data',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule,MatSortModule,FormsModule],
  templateUrl: './product-data.html',
  styleUrls: ['./product-data.css'],
})
export class ProductData implements AfterViewInit {
  
  displayedColumns: string[] = ['index','name', 'brand', 'category', 'price','quantity','actions'];
 
  dataSource = new MatTableDataSource<ProductModel>([]);
SelectedProduct:ProductModel|undefined ;
allProducts: ProductModel[] = [];

uniqueCategories: string[] = [];


  openModal =  false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  ngOnInit():void{
     this.getProduct();
  }

  ngAfterViewInit(): void {
   
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
 
    
  }

  


  constructor(private productService: ProductService,private cdr: ChangeDetectorRef){

  }

  getProduct(){
   this.productService.getAllProducts().subscribe((data:ProductModel[])=>{
    this.dataSource.data = data;
    this.allProducts=data;
     this.uniqueCategories=[...new Set(data.map(p=>p.category))];
    console.log(this.uniqueCategories);
  });
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
    this.SelectedProduct = undefined;


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


// Filter Category Dropdown

selectedCategory: string = '';

filterByCategory(event: Event) {
  const selectedCategory = (event.target as HTMLSelectElement).value.trim().toLowerCase();
  this.selectedCategory = selectedCategory;
  this.applyCombinedFilter();
}


// text field filter
searchText: string = '';

applyFilter(event: Event) {
  this.searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.applyCombinedFilter();
}




applyCombinedFilter() {
  this.dataSource.data = this.allProducts.filter(product => {
    const matchesCategory = this.selectedCategory ? product.category.toLowerCase() === this.selectedCategory : true;
    const combinedString = (
      product.name +
      product.brand +
      product.category +
      product.price +
      product.quantity
    ).toString().toLowerCase();

    const matchesSearch = combinedString.includes(this.searchText);

    return matchesCategory && matchesSearch;
  });

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}




}
