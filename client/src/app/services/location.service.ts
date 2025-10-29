import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  pegaCidade(metodo: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo);
  }

  pegaCidadeById(id: any): Observable<any> {
    return this.http.get(environment.apiUrl + 'cityId/' + id);
  }

  pegaCityById(id: any): Observable<any> {
    return this.http.get(environment.apiUrl + 'cityIdBr/' + id);
  }

  pegaCidadeRegiao(metodo: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo);
  }

  pegaRegiao(metodo: string, id: any): Observable<any> {
    return this.http.get(environment.apiUrl + metodo + id);
  }

  pegaEstadoByCity(metodo: string, city: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo + city);
  }
}
