import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
  })
export class CategoryService {

  private url:string = `${base_url}/categories`;

  constructor(private _http: HttpClient) { }

  /**
   * get all categories
   * @returns
   */
  getCategories(){
    return this._http.get(this.url);
  }

  /**
   * save the categories
   * @param body
   */
  saveCategories(body:any){
    return this._http.post(this.url, body);
  }

  /**
   * update categories
   * @param body
   * @param id
   */
  updateCategories(body:any, id: number){
    const url_id = `${this.url}/${id}`;
    return this._http.put(url_id, body);
  }
}

