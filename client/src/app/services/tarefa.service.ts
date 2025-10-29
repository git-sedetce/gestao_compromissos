import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  constructor(private http: HttpClient) {}

  cadastrarTarefa(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'newTarefa', data);
  }

  // cadastrarParticipanteMeet(data: any) : Observable<any> {
  //   return this.http.post(environment.apiUrl + 'cadastropartic', data)
  // }

  getTarefa(metodo: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo);
  }

  tarefaById(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'tarefaById/' + id);
  }

  ordemTarefa(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'ordemExecucao/' + id);
  }

  tarefaByProjeto(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'tarefaByProjeto/' + id);
  }

  atualizaTarefa(data: any, id: number) {
    return this.http
      .put<any>(environment.apiUrl + 'updateTarefa/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  atualizaSubTarefa(data: any, id: number) {
    return this.http
      .put<any>(environment.apiUrl + 'updateTask/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateTarefaStatus(id: number, status_id: number): Observable<any> {
    return this.http.patch(environment.apiUrl + 'updateTarefaStatus/' + id, {
      status_id,
    });
  }

  deletarTarefa(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + 'deleteTarefa/' + id);
  }
}
