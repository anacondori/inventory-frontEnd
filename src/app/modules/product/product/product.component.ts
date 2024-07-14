import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

import { Products, ProductElement } from '../../interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  private _productService = inject(ProductService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private _util = inject(UtilService);

  public isAdmin: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture',  'acciones'];
  dataSource = new MatTableDataSource<ProductElement>();
  product: ProductElement[] = [];


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  ngOnInit(): void {
    this.getProducts();
    this.isAdmin = this._util.isAdmin();
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
      prod.categid = prod.category.id;
      prod.pictureName = prod.picture;
      prod.picture = 'data:image/jpeg;base64,'+prod.picture;
     dataProduct.push(prod);
    });

    //set the datasource
    this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
    this.dataSource.paginator = this.paginator;
  }

  openProductDialog(data?:ProductElement): void {
    //console.log('data', data);
    const dialogRef = this._dialog.open( NewProductComponent, {
      width: '500px',
      data: {id: data?.id, name: data?.name, price:data?.price, account:data?.account, categid:data?.categid, picture:data?.pictureName},
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


  edit(product: ProductElement){
    this.openProductDialog(product);
  }

  delete(product: ProductElement){
   // console.log('delete:', product);
   const dialogRef = this._dialog.open( ConfirmComponent, {
    width: '500px',
    data: {id: product.id, module:"product", name: product.name, price:product.price, account:product.account},
  });

  dialogRef.afterClosed().subscribe(result => {
    // console.log('openCategoryDialog', result);
    if (result === 1) {
       this.openSnackBar("Producto eliminado","Exito");
       this.getProducts();
    }
    if (result === 2 ) this.openSnackBar("Error en la información","Error");

  });
  }

  onSearch(nombre: string){
    if (!nombre && nombre.length <= 0 ) return this.getProducts();
    //const productId: number = Number(id);
    //this._productService.searchProducts(productId)
    this._productService.searchProductByName(nombre)
                             .subscribe({
                                next: (data:any) => {
                                          // console.log('onSearch.searchProducts.name', id);
                                          this.processProductsResponse(data);
                                       },
                                error:(error) => {
                                          this.getProducts();
                                          throw Error("Error en searchProducts");
                                       }
                             });
  }



  openSnackBar(message: string, action:string): MatSnackBarRef<SimpleSnackBar>{
    return this._snackBar.open(message,action,{ duration: 2000});
  }


  exportExcel(){
    this._productService.exportProducts()
        .subscribe({
            next: ( (data:any) => {
                    const file = new Blob([data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                    const fileUrl = URL.createObjectURL(file);
                    let anchor = document.createElement("a");
                    anchor.download = "products.xlsx";
                    anchor.href = fileUrl;
                    anchor.click();

                    this.openSnackBar("Productos exportados al EXCEL","Exito");
                    }
                  ),
            error:(error) =>  this.openSnackBar("Error al exportar los Productos","Error")
        })
  }

}
