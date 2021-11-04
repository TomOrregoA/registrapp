/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
/* github api token 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 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  apiURL = 'http://localhost:3000';

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

  updateUser(userId, user): Observable<any> {
    return this.http.put(this.apiURL + '/users/' + userId, user, this.httpOptions).
      pipe(retry(3));
  }

  getAsignaturas(): Observable<any> {
    return this.http.get(this.apiURL + '/courses/').pipe(
      retry(3)
    );
  }

  createRecord(record): Observable<any> {
    return this.http.post(this.apiURL + '/records', record, this.httpOptions)
      .pipe(
        retry(3)
      );
  }

  deletePost(record): Observable<any> {
    return this.http.delete(this.apiURL + '/records/' + record, this.httpOptions);
  }

}
