import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { Category, CategoryElement } from '../../../interfaces/category.interface';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  private _categoryService = inject(CategoryService);


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
                            error: (error) => {
                                            console.log('getCategories.error', error);
                                          }
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

}
