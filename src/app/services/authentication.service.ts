/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  apiURL = 'https://my-json-server.typicode.com/TomOrregoA/mockApi/';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get(this.apiURL + '/student/').pipe(
      retry(3)
    );
  }

  getStudent(userId): Observable<any> {
    return this.http.get(this.apiURL + '/student/' + userId).pipe(
      retry(3)
    );
  }

}
