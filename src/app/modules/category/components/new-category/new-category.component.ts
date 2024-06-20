import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name:['', Validators.required],
      description:['', Validators.required],
    });
  }


  onSave(): void {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value,
    }
    this._categoryService.saveCategories(data)
                         .subscribe({
                            next: (data:any) => {
                                      console.log('onSave.data', data);
                                      this._dialogRef.close(1);
                                   },
                            error:(error) =>  this._dialogRef.close(2)
                         });
  }

  onCancel(): void {
    this._dialogRef.close(3);
  }



}
