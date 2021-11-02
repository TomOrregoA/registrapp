/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  apiURL = 'http://192.168.1.131:3000';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiURL + '/users/').pipe(
      retry(3)
    );
  }

  getUsuario(userId): Observable<any> {
    return this.http.get(this.apiURL + '/users/'+userId).pipe(
      retry(3)
    );
  }

  createPost(post): Observable<any> {
    return this.http.post(this.apiURL + '/posts', post, this.httpOptions)
      .pipe(
        retry(3)
      );
  }

  updateUser(userId, user): Observable<any> {
    return this.http.put(this.apiURL + '/users/' + userId, user, this.httpOptions).
      pipe(retry(3));
  }

  deletePost(userId): Observable<any> {
    return this.http.delete(this.apiURL + '/users/' + userId, this.httpOptions);
  }

}
