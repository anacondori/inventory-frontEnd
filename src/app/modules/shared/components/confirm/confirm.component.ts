import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent  {

  private _categoryService = inject(CategoryService);
  private _productService = inject(ProductService);
  private _dialogRef = inject(MatDialogRef);
  public _data = inject(MAT_DIALOG_DATA);

onDelete():void{
  //console.log("_data", this._data);
  if (!this._data) {
    this._dialogRef.close(2);
    return;
  }

  if (this._data.module === "category") {
      this._categoryService.deleteCategories(this._data.id)
                                 .subscribe({
                                    next: (data:any) => {
                                              // console.log('onDelete.deleteCategories._data', data);
                                              this._dialogRef.close(1);
                                           },
                                    error:(error) =>  this._dialogRef.close(2)
                                 });
 }

 if (this._data.module === "product") {
    this._productService.deleteProduct(this._data.id)
                             .subscribe({
                                next: (data:any) => {
                                          // console.log('onDelete.deleteProduct._data', data);
                                          this._dialogRef.close(1);
                                       },
                                error:(error) =>  this._dialogRef.close(2)
                             });
}

}

onCancel(): void {
  this._dialogRef.close(3);
}
}
