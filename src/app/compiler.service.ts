import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(private http: HttpClient) { }

  public compile(data, url) {
    return this.http.post<any>(url + '/run', data);
  }
}
