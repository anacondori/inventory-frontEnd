import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url:string = `${base_url}/products`;

  constructor(private _http: HttpClient) { }

  /**
   * get all products
   * @returns
   */
  getProducts(){
    return this._http.get(this.url);
  }

  /**
   * save the product
   * @param body
   */
  saveProduct(body:any){
    return this._http.post(this.url, body);
  }

  /**
   * update product
   * @param body
   * @param id
   */
  updateProduct(body:any, id: number){
    const url_id = `${this.url}/${id}`;
    return this._http.put(url_id, body);
  }

  /**
   * detele product
   * @param id
   */
  deleteProduct(id: number){
    const url_id = `${this.url}/${id}`;
    return this._http.delete(url_id);
  }

  /**
   * search product
   * @param name
   */
  searchProductByName(name: string){
    const url_name = `${this.url}/filter/${name}`;
    return this._http.get(url_name);
  }

  /**
   * search products
   * @param id
   */
  searchProducts(id: number){
    const url_id = `${this.url}/${id}`;
    return this._http.get(url_id);
  }

  /**
   * export Excel products
   */
  exportProducts(){
    const url_id = `${this.url}/export/excel`;
    return this._http.get(url_id, {
        responseType: 'blob'
    });
  }


}
