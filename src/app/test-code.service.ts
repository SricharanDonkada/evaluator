import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestCodeService {

  constructor(private http:HttpClient) { }
  testCode(data,url){
    return this.http.post<any>(url+'/test-code',data);
  }
}
