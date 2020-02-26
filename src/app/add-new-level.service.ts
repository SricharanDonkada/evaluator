import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddNewLevelService {

  constructor(private http:HttpClient) { }
  add(data,url){
    return this.http.post(url+'/add-new-level',data);
  }
}
