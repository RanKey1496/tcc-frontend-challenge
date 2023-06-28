import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<string> {
    const a = this.http.post(`${environment.apiUrl}/login`,
      { email, password },
      { responseType: 'text' }
    );
    console.log(a)
    return a;
  }
}
