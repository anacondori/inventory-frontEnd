import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ProductElement, Products } from '../../../interfaces/product.interface';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  private _productService = inject(ProductService);

  public chartBar:any;
  public chartDonas:any;

  ngOnInit(): void {
    this.getProducts();
  }


  //!Productos
  getProducts():void{
    this._productService.getProducts()
                         .subscribe({
                            next: (data:any)=> this.processProductsResponse(data),
                            error:(error) =>  console.log('getProducts.error', error)
                          });
  }

  processProductsResponse(resp: Products){
    const nameProd: string[] = [];
    const accountProd: number[] = [];

    if (resp.metadata[0].code !== "00") return;

    let listProduct = resp.product.product;
    listProduct.forEach( (prod: ProductElement) => {
        nameProd.push(prod.name);
        accountProd.push(prod.account);
    });

    //configurar grafico de barras
    this.chartBar = new Chart('canvas-bar', {
                    type: 'bar',
                    data: {
                        labels: nameProd,
                        datasets: [
                          {
                            label: 'Productos',
                            data : accountProd
                          }
                        ]
                    }
                });

    //configurar grafico de donas
    this.chartDonas = new Chart('canvas-doughnut', {
                    type: 'doughnut',
                    data: {
                        labels: nameProd,
                        datasets: [
                          {
                            label: 'Productos',
                            data : accountProd
                          }
                        ]
                    }
                });


  }


}
