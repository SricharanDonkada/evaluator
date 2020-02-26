import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluateService {

  constructor(private http: HttpClient) { }

  public evaluate(data, url) {
    return this.http.post<any>(url + '/evaluate', data);
  }
}
