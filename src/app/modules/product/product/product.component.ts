import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

import { Products, ProductElement } from '../../interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';

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

  openProductDialog(data?:ProductElement): void {
    // console.log('data', data);
    const dialogRef = this._dialog.open( NewProductComponent, {
      width: '500px',
      data: {id: data?.id, name: data?.name, precio:data?.price, cantidad:data?.account, categoria:data?.categName, foto:data?.picture},
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('openProductDialog', result);
      if (result === 1) {
        if (!data) this.openSnackBar("Producto agregado","Exito");
        if (data) this.openSnackBar("Producto modificado","Exito");

        this.getProducts();
      }
      if (result === 2 ) {
        if (data) this.openSnackBar("Error en la información","Error");
      }

    });
  }


  edit(product: ProductElement){}

  delete(product: ProductElement){}

  onSearch(id: string){}


  openSnackBar(message: string, action:string): MatSnackBarRef<SimpleSnackBar>{
    return this._snackBar.open(message,action,{ duration: 2000});
  }


}
