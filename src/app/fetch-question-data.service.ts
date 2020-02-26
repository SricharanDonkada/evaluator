import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FetchQuestionDataService {

  constructor(private http: HttpClient) { }

  fetchQuestionData(data,url){
    return this.http.post<any>(url+'/fetch-question-data',data);
  }
}
