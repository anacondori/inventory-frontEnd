import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { Category, CategoryElement } from '../../../interfaces/category.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  private _categoryService = inject(CategoryService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  ngOnInit(): void {
    this.getCategories();
  }


  getCategories():void{
    this._categoryService.getCategories()
                         .subscribe({
                            next: (data:any)=>{
                                            console.log('getCategories.data', data);
                                            this.processCategoriesResponse(data);
                                          },
                            error:(error) =>  console.log('getCategories.error', error)
                          });
  }

  processCategoriesResponse(resp: Category){
    const dataCategory: CategoryElement[] = [];

    if (resp.metadata[0].code !== "00") return;

    let listCategory = resp.categoryResponse.category;
    console.log('processCategoriesResponse', listCategory);
    listCategory.forEach( (cat: CategoryElement) => {
      dataCategory.push(cat);
    });

    this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    this.dataSource.paginator = this.paginator;
  }

  openCategoryDialog(): void {
    const dialogRef = this._dialog.open( NewCategoryComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('openCategoryDialog', result);
      if (result === 1) {
        this.openSnackBar("Categoría agregada","Existosa");
        this.getCategories();
      }
      if (result === 2 ) {
         this.openSnackBar("Categoría no agregada","Error");
      }

    });
  }

  openSnackBar(message: string, action:string): MatSnackBarRef<SimpleSnackBar>{
    return this._snackBar.open(message,action,{ duration: 2000});
  }

}
