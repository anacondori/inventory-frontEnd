import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
  })
export class CategoryService {

  constructor(private _http: HttpClient) { }

  /**
   * get all categories
   * @returns
   */
  getCategories(){
    const url = `${base_url}/categories`;
    return this._http.get(url);
  }
}
