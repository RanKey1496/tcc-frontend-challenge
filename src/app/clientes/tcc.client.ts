import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TCCClient {
  constructor(private http: HttpClient) {}

  getClients(): Observable<any> {
    return this.http.get(environment.apiUrl + '/client/');
  }

  saveClient(identificationType: string, identification: string, name: string,gender: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/client/', { identificationType, identification, name, gender });
  }

  updateClient(identificationType: string, identification: string, name: string,gender: string): Observable<any> {
    return this.http.put(environment.apiUrl + '/client/', { identificationType, identification, name, gender });
  }

  deleteClient(identificationType: string, identification: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `/client/${identification}?identificationType=${identificationType}`);
  }
}
