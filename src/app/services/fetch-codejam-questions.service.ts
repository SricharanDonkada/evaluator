import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FetchCodejamQuestionsService {
  constructor(private http:HttpClient) { }
  public fetchData(){
    return this.http.post<any>(url + '/codejam/fetchquestions',{});
  }
}
