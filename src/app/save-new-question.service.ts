import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveNewQuestionService {

  constructor(private http: HttpClient) { }
  save(data,url){
    return this.http.post<any>(url+'/save-new-question',data);
  }
}
