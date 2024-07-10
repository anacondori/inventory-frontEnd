import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../shared/services/category.service';
import { CategoryElement } from '../../interfaces/category.interface';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{

  public productForm!: FormGroup;

  private _fb = inject(FormBuilder);
  private _categoryService = inject(CategoryService);
  private _productService = inject(ProductService);
  private _dialogRef = inject(MatDialogRef<NewProductComponent>);
  public _data = inject(MAT_DIALOG_DATA);

  private dataExiste = false;
  public titulo:string = 'Agregar nuevo ';
  public categories: CategoryElement[] = [];
  public selectedFile: any;
  public nameImg: string = "";


  ngOnInit(): void {
    //console.log('ngOnInnit', this._data);
    this.getCategories();

    this.productForm = this._fb.group({
      name:[this._data.name, Validators.required],
      price:[this._data.price, Validators.required],
      account:[this._data.account, Validators.required],
      category:[this._data.categid, Validators.required],
      picture:[this._data.pictureName, Validators.required],
    });

    this.dataExiste = false;
    if (this._data && this._data.id > 0 ) {
       this.dataExiste = true;
       this.titulo = 'Modificar ';
    }
  }


  onSave(): void {
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile,
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('account', data.account);
    uploadImageData.append('categoryId', data.category);


    if (!this.dataExiste) {
        this._productService.saveProduct(uploadImageData)
                             .subscribe({
                                next: (data:any) => {
                                          //console.log('onSave.saveProduct.data', data);
                                          this._dialogRef.close(1);
                                       },
                                error:(error) =>  this._dialogRef.close(2)
                             });
    };

    if (this.dataExiste) {
        this._productService.updateProduct(uploadImageData, this._data.id)
                                 .subscribe({
                                    next: (data:any) => {
                                              //console.log('onSave.updateProduct.data', data);
                                              this._dialogRef.close(1);
                                           },
                                    error:(error) =>  this._dialogRef.close(2)
                                 });
    };

  }

  onCancel(): void {
    this._dialogRef.close(3);
  }


  getCategories():void{
    //console.log('prod.getcCategories');
    this._categoryService.getCategories()
                         .subscribe({
                            next: (data: any)=>{
                                    this.categories = data.categoryResponse.category;
                                          },
                            error:(error) =>  console.log('product.getCategories.error', error)
                          });
  }

  onFileChanged(event:any){
    this.selectedFile = event.target.files[0];
    this.nameImg = event.target.files[0].name;
  }
}
