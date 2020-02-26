import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchQuestionDataForEditService {

  constructor(private http:HttpClient) { }
  fetchData(data,url){
    return this.http.post<any>(url+'/fetch-question-data-for-edit',data);
  }
}
