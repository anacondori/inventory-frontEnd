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

}
