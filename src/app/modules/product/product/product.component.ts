import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Products, ProductElement } from '../../interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  private _productService = inject(ProductService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture',  'acciones'];
  dataSource = new MatTableDataSource<ProductElement>();
  product: ProductElement[] = [];


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  ngOnInit(): void {
    this.getProducts();
  }


  getProducts():void{
    this._productService.getProducts()
                         .subscribe({
                            next: (data:any)=>{
                                            //console.log('getProducts.data', data);
                                            this.processProductsResponse(data);
                                          },
                            error:(error) =>  console.log('getProducts.error', error)
                          });
  }

  processProductsResponse(resp: Products){
    const dataProduct: ProductElement[] = [];

    if (resp.metadata[0].code !== "00") return;

     let listProduct = resp.product.product;
     //console.log('processCategoriesResponse', listProduct);
     listProduct.forEach( (prod: ProductElement) => {
      prod.categName = prod.category.name;
      prod.picture = 'data:image/jpeg;base64,'+prod.picture;
     dataProduct.push(prod);
    });

    //set the datasource
    this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
    this.dataSource.paginator = this.paginator;
  }

  openProductDialog(data?:ProductElement): void {}

  edit(product: ProductElement){}

  delete(product: ProductElement){}

  onSearch(id: string){}
}
