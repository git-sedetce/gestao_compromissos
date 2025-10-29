import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretariaCoordenadoriaService {

  constructor( private http: HttpClient) { }

  coordenadoria(metodo: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo)
  }

  secretaria(metodo: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo)
  }

  pegar_coordenadoria(metodo: string, coordenadoria: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo + coordenadoria)
  }

  pegar_coordenadoria_by_id(metodo: string, id: any): Observable<any> {
    return this.http.get(environment.apiUrl + metodo + id)
  }

  pegar_secretaria(metodo: string, id: any): Observable<any> {
    return this.http.get(environment.apiUrl + metodo + id)
  }

  filtro_sexec_meet_without_project(metodo: string, id: any): Observable<any> {
    return this.http.get(environment.apiUrl + metodo + id)
  }

  filtro_coord_meet_without_project(metodo: string, id: any): Observable<any> {
    return this.http.get(environment.apiUrl + metodo + id)
  }

  pegar_coord_sexec_by_user(metodo: string, id: any): Observable<any> {
    return this.http.get(environment.apiUrl + metodo + id)
  }

  pegar_coord_sexec_by_user_name(metodo: string, name: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo + name)
  }

}
