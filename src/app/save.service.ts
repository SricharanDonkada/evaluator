import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(private http: HttpClient) { }

  save(data,url){                                  
    return this.http.post<any>(url + '/save',data);
  }                                                

}
