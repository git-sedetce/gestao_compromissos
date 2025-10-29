import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndustriaService {
  constructor(private http: HttpClient) {}

  cadastrarAtracao(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'novaAtracao', data);
  }
  cadastrarEmpresa(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'novaEmpresa', data);
  }

  getEmpresaAtracao(metodo: string) : Observable<any>{
    return this.http.get(environment.apiUrl + metodo)
  }

  getEmpresa(metodo: string, id: number): Observable<any> {
    return this.http.get(environment.apiUrl + metodo + id)
  }

  getUsersInd(metodo: string) : Observable<any>{
    return this.http.get(environment.apiUrl + metodo)
  }

  cadastrarFDI(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'novoFDI', data);
  }

  cadastrarSIMA(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'novoSima', data);
  }

  cadastrarInauguracao(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'cadastroInauguracao', data);
  }

  getNextInauguracao(metodo: string) : Observable<any>{
    return this.http.get(environment.apiUrl + metodo)
  }

  atualizarEmpresa(data: any, id: number){
    return this.http.put<any>(environment.apiUrl + 'atualizaEmpresa/' +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  atualizarAtracao(data: any, id: number){
    return this.http.put<any>(environment.apiUrl + 'atualizaAtracao/' +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmpresa(id: number){
    return this.http.delete<any>(environment.apiUrl + 'empresa/' +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  atualizaDados(metodo: string, data: any, id: number){
    return this.http.put<any>(environment.apiUrl + metodo +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteDados(metodo: string, id: number){
    return this.http.delete<any>(environment.apiUrl + metodo +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  statisticsIndustry(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

}
