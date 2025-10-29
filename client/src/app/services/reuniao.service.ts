
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReuniaoService {

  constructor(private http: HttpClient) { }

  cadastrarReuniao(data: any) : Observable<any> {
    return this.http.post(environment.apiUrl + 'newMeet', data)
  }

  getReuniao(metodo: string) : Observable<any>{
    return this.http.get(environment.apiUrl + metodo)
  }

  getOneMeetTask(id: number) : Observable<any>{
    return this.http.get(environment.apiUrl + 'compromissoById/' + id)
  }

  getPeriodicidade(metodo: string) : Observable<any>{
    return this.http.get(environment.apiUrl + metodo)
  }

  reuniaoById(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'meetById/' + id)
  }
  reunioesByprojeto(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'meetByMeet/' + id)
  }

  reunioesByAta(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'meetByReg/' + id)
  }

  cadastrar_ata(data: any, id: number): Observable<any>{
    return this.http.post(environment.apiUrl + 'cadastraAta/' +id, data)
  }

  pegarAta(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'ataById/' + id)
  }

  finalizaCompromissos(id: number, data: any): Observable<any> {
    return this.http.put(environment.apiUrl + 'finalizaCompromisso/' + id, data)
  }

  deletarReuniao(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + 'deleteReuniao/' + id)
  }

}
