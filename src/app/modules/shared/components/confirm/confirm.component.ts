import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent  {

  private _categoryService = inject(CategoryService);
  private _dialogRef = inject(MatDialogRef);
  public _data = inject(MAT_DIALOG_DATA);

onDelete():void{
  if (!this._data) {
    this._dialogRef.close(2);
    return;
  }

  this._categoryService.deleteCategories(this._data.id)
                             .subscribe({
                                next: (data:any) => {
                                          // console.log('onDelete.deleteCategories._data', data);
                                          this._dialogRef.close(1);
                                       },
                                error:(error) =>  this._dialogRef.close(2)
                             });
}

onCancel(): void {
  this._dialogRef.close(3);
}
}
