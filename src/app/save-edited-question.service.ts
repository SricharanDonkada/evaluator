import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveEditedQuestionService {

  constructor(private http:HttpClient) { }
  saveEditedQuestion(data,url){
    return this.http.post<any>(url+'/save-edited-question',data);
  }
}
