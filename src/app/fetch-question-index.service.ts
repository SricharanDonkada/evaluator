import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchQuestionIndexService {

  constructor(private http:HttpClient) { }
  fetchQuestionIndex(url){
    return this.http.post<any>(url+'/fetch-question-index',"");
  }
}
