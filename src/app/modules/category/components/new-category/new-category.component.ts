import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit{

  public categoryForm!: FormGroup;

  private _fb = inject(FormBuilder);
  private _categoryService = inject(CategoryService);
  private _dialogRef = inject(MatDialogRef<NewCategoryComponent>);
  public _data = inject(MAT_DIALOG_DATA);

  private dataExiste = false;
  public titulo:string = 'Agregar nueva ';



  ngOnInit(): void {
    // console.log('ngOnInnit', this._data)
    this.categoryForm = this._fb.group({
      name:[this._data.name, Validators.required],
      description:[this._data.description, Validators.required],
    });

    this.dataExiste = false;
    if (this._data && this._data.id > 0 ) {
       this.dataExiste = true;
       this.titulo = 'Modificar ';
    }
  }


  onSave(): void {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value,
    }

    if (!this.dataExiste) {
        this._categoryService.saveCategories(data)
                             .subscribe({
                                next: (data:any) => {
                                          // console.log('onSave.saveCategories.data', data);
                                          this._dialogRef.close(1);
                                       },
                                error:(error) =>  this._dialogRef.close(2)
                             });
    };

    if (this.dataExiste) {
        this._categoryService.updateCategories(data, this._data.id)
                                 .subscribe({
                                    next: (data:any) => {
                                              // console.log('onSave.updateCategories.data', data);
                                              this._dialogRef.close(1);
                                           },
                                    error:(error) =>  this._dialogRef.close(2)
                                 });
    };

  }

  onCancel(): void {
    this._dialogRef.close(3);
  }


}
