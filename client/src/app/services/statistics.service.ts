import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getProjectCoordSt1(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getProjectCoordSt2(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getProjectCoordSt3(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getProjectCoordSt4(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getProjectSexecSt1(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getProjectSexecSt2(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getProjectSexecSt3(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getProjectSexecSt4(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getCommitCoordSt(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getCommitSexecSt(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getTaskCoordSt(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getTaskSexecSt(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }
}
